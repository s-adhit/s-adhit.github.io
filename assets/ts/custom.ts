/** Keep Stack's existing menu animation and add accessible menu state. */
document.addEventListener('DOMContentLoaded', () => {
    const toggle = document.getElementById('toggle-menu') as HTMLButtonElement | null;
    const menu = document.getElementById('main-menu');

    if (!toggle || !menu) return;

    const syncMenuState = () => {
        const isOpen = document.body.classList.contains('show-menu');
        toggle.setAttribute('aria-expanded', String(isOpen));
    };

    toggle.addEventListener('click', () => {
        // Stack's click listener runs first and changes the body class.
        queueMicrotask(syncMenuState);
    });

    document.addEventListener('keydown', event => {
        if (event.key !== 'Escape' || !document.body.classList.contains('show-menu')) return;

        toggle.click();
        toggle.focus();
    });

    window.addEventListener('resize', syncMenuState);
    syncMenuState();
});

/** The head initializer sets the first theme before paint; this owns explicit changes. */
document.addEventListener('DOMContentLoaded', () => {
    type Scheme = 'light' | 'dark';
    type ViewTransitionDocument = Document & {
        startViewTransition?: (callback: () => void) => { finished: Promise<void> };
    };

    const key = 'AdhitThemePreference';
    const root = document.documentElement;
    const toggle = document.querySelector<HTMLButtonElement>('[data-theme-toggle]');
    if (!toggle) return;

    let transitioning = false;

    const updateMetadata = (scheme: Scheme) => {
        root.style.colorScheme = scheme;
        const themeColor = document.querySelector<HTMLMetaElement>('meta[name="theme-color"]');
        themeColor?.setAttribute('content', scheme === 'dark' ? '#191919' : '#F8F7FA');
    };

    const updateControl = (scheme: Scheme) => {
        const label = scheme === 'light' ? 'Switch to dark mode' : 'Switch to light mode';
        toggle.setAttribute('aria-label', label);
        toggle.title = label;
        toggle.setAttribute('aria-pressed', String(scheme === 'dark'));
    };

    const apply = (scheme: Scheme, persist = false) => {
        root.dataset.scheme = scheme;
        root.dataset.themePreference = scheme;
        updateMetadata(scheme);
        updateControl(scheme);
        window.dispatchEvent(new CustomEvent('onColorSchemeChange', { detail: scheme }));

        if (!persist) return;
        try {
            window.localStorage.setItem(key, scheme);
            // Retain Stack compatibility for integrations that read its legacy key.
            window.localStorage.setItem('StackColorScheme', scheme);
        } catch (error) {
            // Storage can be denied; the in-memory selection still takes effect.
        }
    };

    const currentScheme = (): Scheme => root.dataset.scheme === 'light' ? 'light' : 'dark';
    apply(currentScheme());

    const reduceMotion = () => window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;

    toggle.addEventListener('click', () => {
        if (transitioning) return;

        const next: Scheme = currentScheme() === 'light' ? 'dark' : 'light';
        const startViewTransition = (document as ViewTransitionDocument).startViewTransition;
        const canTransition = typeof startViewTransition === 'function' && !reduceMotion();
        if (!canTransition) {
            apply(next, true);
            return;
        }

        const rect = toggle.getBoundingClientRect();
        const x = rect.left + rect.width / 2;
        const y = rect.top + rect.height / 2;
        const radius = Math.hypot(Math.max(x, window.innerWidth - x), Math.max(y, window.innerHeight - y));
        root.style.setProperty('--theme-reveal-x', `${x}px`);
        root.style.setProperty('--theme-reveal-y', `${y}px`);
        root.style.setProperty('--theme-reveal-radius', `${radius}px`);
        root.classList.add('theme-transitioning');
        transitioning = true;
        toggle.disabled = true;

        const finish = () => {
            root.classList.remove('theme-transitioning');
            root.style.removeProperty('--theme-reveal-x');
            root.style.removeProperty('--theme-reveal-y');
            root.style.removeProperty('--theme-reveal-radius');
            transitioning = false;
            toggle.disabled = false;
        };

        try {
            const transition = startViewTransition?.call(document, () => apply(next, true));
            if (!transition) {
                apply(next, true);
                finish();
                return;
            }
            void transition.finished.catch(() => undefined).finally(finish);
        } catch (error) {
            apply(next, true);
            finish();
        }
    });
});

/** Keep the desktop Blog outline in sync without changing native anchor behavior. */
document.addEventListener('DOMContentLoaded', () => {
    const article = document.querySelector<HTMLElement>('.blog-article');
    const header = article?.querySelector<HTMLElement>('.blog-article-header');
    const outline = document.querySelector<HTMLElement>('[data-blog-outline-desktop]');
    const panel = outline?.querySelector<HTMLElement>('.blog-outline__panel');
    const links = Array.from(outline?.querySelectorAll<HTMLAnchorElement>('a[href^="#"]') ?? []);
    if (!article || !header || !outline || !panel || !links.length) return;

    outline.classList.add('blog-outline--ready');
    const desktop = window.matchMedia('(min-width: 1440px)');
    const minimumPanelWidth = 220;
    const gutter = 24;
    let canFloat = false;

    const updatePlacement = () => {
        const articleRight = article.getBoundingClientRect().right;
        const availableWidth = window.innerWidth - articleRight - gutter;
        canFloat = desktop.matches && availableWidth >= minimumPanelWidth;
        outline.classList.toggle('blog-outline--no-gutter', !canFloat);

        if (!canFloat) return;

        const headerTop = header.getBoundingClientRect().top;
        const top = Math.max(24, Math.min(headerTop, window.innerHeight - 160));
        outline.style.setProperty('--blog-outline-left', `${Math.round(articleRight + gutter)}px`);
        outline.style.setProperty('--blog-outline-top', `${Math.round(top)}px`);
        outline.style.setProperty('--blog-outline-width', `${Math.round(Math.min(280, availableWidth))}px`);
    };

    const setOpen = (open: boolean) => {
        outline.classList.toggle('blog-outline--expanded', canFloat && open);
    };
    updatePlacement();
    setOpen(false);
    outline.addEventListener('pointerenter', () => { if (canFloat) setOpen(true); });
    outline.addEventListener('pointerleave', () => {
        if (canFloat && !outline.matches(':focus-within')) setOpen(false);
    });
    outline.addEventListener('focusin', () => { if (canFloat) setOpen(true); });
    outline.addEventListener('focusout', () => queueMicrotask(() => {
        if (canFloat && !outline.matches(':focus-within') && !outline.matches(':hover')) setOpen(false);
    }));
    desktop.addEventListener('change', () => {
        updatePlacement();
        setOpen(false);
    });

    const headingById = new Map<string, HTMLElement>();
    article.querySelectorAll<HTMLElement>('.blog-article-content :is(h2, h3)[id]').forEach(heading => {
        headingById.set(heading.id, heading);
    });

    const entries = links
        .map(link => {
            const id = decodeURIComponent(link.hash.slice(1));
            const heading = headingById.get(id);
            return heading ? { link, heading } : null;
        })
        .filter((entry): entry is { link: HTMLAnchorElement; heading: HTMLElement } => entry !== null);
    if (!entries.length) return;
    const headings = Array.from(headingById.values());

    const setActive = (id: string) => {
        links.forEach(link => {
            if (decodeURIComponent(link.hash.slice(1)) === id) {
                link.setAttribute('aria-current', 'location');
            } else {
                link.removeAttribute('aria-current');
            }
        });
    };

    const updateActive = () => {
        const marker = Math.max(80, window.innerHeight * 0.32);
        let active = headings[0];

        for (const heading of headings) {
            if (!heading.getClientRects().length) continue;
            if (heading.getBoundingClientRect().top <= marker) active = heading;
            else break;
        }
        setActive(active.id);
    };

    const observer = 'IntersectionObserver' in window
        ? new IntersectionObserver(() => requestAnimationFrame(updateActive), {
            rootMargin: '-20% 0px -65% 0px', threshold: [0, 1],
        })
        : null;
    headings.forEach(heading => observer?.observe(heading));

    links.forEach(link => {
        link.addEventListener('click', () => {
            const heading = headingById.get(decodeURIComponent(link.hash.slice(1)));
            const disclosure = heading?.closest('details');
            if (disclosure && !disclosure.open) disclosure.open = true;
            if (!heading) return;

            setActive(heading.id);
            if (canFloat) setOpen(false);
        });
    });

    document.addEventListener('keydown', event => {
        if (event.key !== 'Escape' || !outline.classList.contains('blog-outline--expanded')) return;
        setOpen(false);
        (document.activeElement as HTMLElement | null)?.blur();
    });
    window.addEventListener('scroll', () => requestAnimationFrame(updateActive), { passive: true });
    window.addEventListener('resize', () => requestAnimationFrame(() => {
        updatePlacement();
        updateActive();
    }));
    if ('ResizeObserver' in window) new ResizeObserver(() => {
        updatePlacement();
        requestAnimationFrame(updateActive);
    }).observe(article);
    updateActive();
});

/** Lightweight citation previews. Citation anchors remain ordinary links without JavaScript. */
document.addEventListener('DOMContentLoaded', () => {
    const citations = Array.from(document.querySelectorAll<HTMLAnchorElement>('.citation__link'));
    if (!citations.length) return;

    const preview = document.createElement('div');
    preview.className = 'citation-preview';
    preview.id = 'citation-preview';
    preview.setAttribute('role', 'tooltip');
    preview.hidden = true;
    document.body.append(preview);

    let activeCitation: HTMLAnchorElement | null = null;
    let touchPreviewOpen = false;
    let touchCitation: HTMLAnchorElement | null = null;

    const hidePreview = () => {
        preview.hidden = true;
        activeCitation?.removeAttribute('aria-describedby');
        activeCitation = null;
        touchPreviewOpen = false;
    };

    const showPreview = (citation: HTMLAnchorElement) => {
        const text = citation.dataset.citationPreview;
        if (!text) return;

        activeCitation?.removeAttribute('aria-describedby');
        activeCitation = citation;
        citation.setAttribute('aria-describedby', preview.id);
        preview.textContent = text;
        preview.hidden = false;

        const rect = citation.getBoundingClientRect();
        const width = preview.getBoundingClientRect().width;
        const left = Math.min(Math.max(16, rect.left), window.innerWidth - width - 16);
        const below = rect.bottom + 10;
        const top = below + preview.offsetHeight <= window.innerHeight - 16
            ? below
            : Math.max(16, rect.top - preview.offsetHeight - 10);
        preview.style.left = `${left}px`;
        preview.style.top = `${top}px`;
    };

    citations.forEach(citation => {
        citation.addEventListener('mouseenter', () => showPreview(citation));
        citation.addEventListener('mouseleave', hidePreview);
        citation.addEventListener('focus', () => showPreview(citation));
        citation.addEventListener('blur', hidePreview);
        citation.addEventListener('pointerdown', event => {
            if (event.pointerType === 'touch' && touchCitation !== citation) touchPreviewOpen = false;
            touchCitation = event.pointerType === 'touch' ? citation : null;
        });
        citation.addEventListener('click', event => {
            if (touchCitation !== citation || touchPreviewOpen) return;
            event.preventDefault();
            touchPreviewOpen = true;
            showPreview(citation);
        });
    });

    document.addEventListener('keydown', event => {
        if (event.key === 'Escape') hidePreview();
    });
    document.addEventListener('scroll', hidePreview, true);
    window.addEventListener('resize', hidePreview);
});
