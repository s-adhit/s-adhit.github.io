## 1. Design philosophy

A quiet, text-first personal site: editorial rather than app-like. Use one stable shell (identity + navigation), generous whitespace, and a single readable content column. Purple should signal interaction and emphasis—not become a decorative surface. Remove card-like containers from primary reading and lists; let typography, alignment, and rhythm create hierarchy.

Preserve all current text, Markdown, image URLs, and section structure.

## 2. Proposed page layouts

| Page | Layout |
|---|---|
| Home | A narrow introduction column, beginning with “Hi, I’m Adhit,” followed by the existing About content. Keep the research interests as a simple list. No enclosing card. |
| Research / Blog | Section title, optional existing `_index.md` introduction, then a chronological text list when content exists. Empty sections should render the existing “Coming Soon” message in muted body text, not accent-colored display text. |
| Notes | Title and existing introduction, followed by a compact chronological list: date in a fixed, subdued column; linked title beside it; optional summary only when supplied in front matter. No bullets, cards, tags, or separators per item. |
| Article / note / research post | Semantic `<article>` with title, date, restrained metadata, and a 66–70ch reading measure. Content flows directly on the page. Keep the table of contents off by default; never show tags, related content, or a right sidebar. |
| Photos | A simple title/introduction followed by year groups. Each group is a responsive masonry-like grid using naturally varied image aspect ratios, with captions below images. On small screens it becomes one column; on medium screens two; on large screens three. Clicking still opens the original existing image URL. |
| Navigation | Desktop: a narrow sticky left rail with name, four primary links, and social links. Mobile: compact top bar with an accessible menu button; social links move into normal document flow below navigation. Clearly mark the current page. |

## 3. Typography and spacing system

Use a small token system instead of scattered pixel values:

- `--space-1: 0.5rem`, `--space-2: 1rem`, `--space-3: 1.5rem`, `--space-4: 2.5rem`, `--space-5: 4rem`.
- Reading width: `68ch`; broader gallery width: about `1200px`.
- Body: system sans-serif is fine for the site shell; use a highly legible serif or refined sans-serif for article text only. Avoid introducing a web-font dependency unless self-hosted.
- Article text: `clamp(1.05rem, 1rem + 0.2vw, 1.2rem)`, line-height `1.75–1.85`.
- Headings: compact, weight 600–650, with clear scale rather than purple heading colors. Reserve purple for heading anchors, focus states, and links.
- Dates, captions, and metadata: 0.82–0.9em, muted but still contrast-compliant.
- Use margin flow (`.prose > * + *`) for article rhythm instead of assigning margins repeatedly to paragraphs, lists, and headings.

## 4. Color and accessibility

Adopt dark charcoal surfaces with one background rather than competing `--bg` and `--bg-soft` panels:

- Background: approximately `#151419`
- Elevated/code surface: approximately `#1d1b22`
- Primary text: approximately `#f1eef6`
- Secondary text: approximately `#b9b2c2`
- Restrained purple: approximately `#b9a4ff`
- Strong interaction purple: approximately `#d1c2ff`

Ensure text contrast meets WCAG AA (4.5:1 for normal text). Links should retain a visible underline by default, perhaps softened with underline offset; color alone is not enough. Add a consistent `:focus-visible` outline with a 2–3px purple ring. The sidebar’s active selector must match its actual `.current` class. Give every social icon an `aria-label`; external links should use `rel="noopener noreferrer"` alongside `target="_blank"`.

## 5. Photo gallery improvements

Keep every current `/images/...` URL intact and use it as the full-resolution link target. For gallery thumbnails:

- Generate optimized, responsive derivatives while retaining originals and existing URLs unchanged.
- Emit `srcset`, `sizes`, explicit `width`/`height`, `loading="lazy"`, and `decoding="async"` to eliminate most layout shift and initial transfer.
- Use `aspect-ratio` from image dimensions and `object-fit: cover` only for consistent thumbnail presentation; avoid forced crop if image composition is important.
- Make captions optional in visual weight, but retain them as accessible text.
- Use the theme’s existing PhotoSwipe capability or a minimal accessible lightbox only if it can preserve keyboard navigation, Escape-to-close, focus management, and original image links. Otherwise normal image links are preferable.
- Remove hover scaling and image borders; a subtle opacity change or underline on the caption is sufficient feedback.

## 6. CSS simplification strategy

Replace `assets/scss/custom.scss` with a short layered stylesheet:

1. Design tokens: palette, measures, spacing, typography.
2. Base elements: body, links, focus, code, figures.
3. Shell: container, sidebar, mobile navigation.
4. Reusable editorial patterns: `.prose`, `.section-header`, `.entry-list`, `.gallery`.
5. Responsive rules grouped by breakpoint.

Delete ineffective or duplicate rules, including the flex-incompatible `.main-container` grid declaration, redundant right-sidebar hiding, duplicate `.notes-list`, broad `.sidebar *` overrides, hard-coded repeated `margin-left: 20px`, cards/borders/shadows on articles, and animation transitions. Prefer Stack variables and narrowly targeted overrides rather than `!important`.

## 7. Exact files to change

Existing files:

- `hugo.toml` — simplify theme parameters; disable globally enabled math and enable it only through page front matter or a conditional convention.
- `assets/scss/custom.scss` — replace with the concise token-based stylesheet.
- `layouts/index.html` — editorial home wrapper.
- `layouts/_default/list.html` and `layouts/_default/section.html` — shared section header, intro rendering, list, and empty-state behavior.
- `layouts/notes/list.html` — date-and-title notes list.
- `layouts/notes/single.html`, `layouts/blog/single.html`, `layouts/research/single.html` — use one semantic article presentation.
- `layouts/photos/list.html` — accessible, responsive gallery markup.
- `layouts/partials/sidebar/left.html` — accessible current navigation, social labels, safe external-link attributes, mobile-friendly social placement.
- `layouts/partials/head/custom.html` — remove duplicate global KaTeX/MathJax loading; load a single renderer conditionally.

Recommended new local partials to avoid repeated templates:

- `layouts/partials/site/article.html`
- `layouts/partials/site/section-list.html`
- `layouts/partials/site/section-header.html`
- `layouts/partials/site/math.html`

Do not modify Markdown content, static originals, or their existing public URLs.

## 8. Ordered implementation phases and risks

1. **Inventory and visual baseline**: build the current site and capture desktop/mobile reference pages.  
   Risk: theme-version behavior may differ from local assumptions.

2. **Foundation**: simplify `hugo.toml`, sidebar markup, color tokens, focus/link states, and responsive shell.  
   Risk: Stack specificity may require a few carefully scoped selectors.

3. **Content templates**: introduce shared semantic article and section/list partials; migrate page templates to them.  
   Risk: preserve Hugo list ordering, permalink behavior, and `_index.md` rendering exactly.

4. **Typography pass**: tune line length, heading rhythm, metadata, lists, video/figure treatment, and code blocks across real content.  
   Risk: inline HTML in the vector-field note relies on `unsafe = true`; do not alter its rendering unintentionally.

5. **Gallery optimization**: add responsive thumbnail generation and intrinsic dimensions while preserving source-image URLs and original links.  
   Risk: static files are not Hugo resources; derivatives need a deliberate pipeline or duplicated generated assets without relocating originals.

6. **Math and regression QA**: select one renderer, load it only where math occurs, test equations, keyboard navigation, reduced-motion behavior, narrow phones, and image performance.  
   Risk: removing MathJax before confirming KaTeX syntax compatibility could break a future note.

No files were modified.