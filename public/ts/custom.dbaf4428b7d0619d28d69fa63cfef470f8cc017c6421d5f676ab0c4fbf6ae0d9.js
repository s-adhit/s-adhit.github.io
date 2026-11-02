(() => {
  // <stdin>
  document.addEventListener("DOMContentLoaded", () => {
    const toggle = document.getElementById("toggle-menu");
    const menu = document.getElementById("main-menu");
    if (!toggle || !menu) return;
    const syncMenuState = () => {
      const isOpen = document.body.classList.contains("show-menu");
      toggle.setAttribute("aria-expanded", String(isOpen));
    };
    toggle.addEventListener("click", () => {
      queueMicrotask(syncMenuState);
    });
    document.addEventListener("keydown", (event) => {
      if (event.key !== "Escape" || !document.body.classList.contains("show-menu")) return;
      toggle.click();
      toggle.focus();
    });
    window.addEventListener("resize", syncMenuState);
    syncMenuState();
  });
  document.addEventListener("DOMContentLoaded", () => {
    const article = document.querySelector(".blog-article");
    const links = Array.from(document.querySelectorAll('.blog-article-toc a[href^="#"]'));
    if (!article || !links.length) return;
    const headingById = /* @__PURE__ */ new Map();
    article.querySelectorAll(".blog-article-content :is(h2, h3)[id]").forEach((heading) => {
      headingById.set(heading.id, heading);
    });
    const entries = links.map((link) => {
      const id = decodeURIComponent(link.hash.slice(1));
      const heading = headingById.get(id);
      return heading ? { link, heading } : null;
    }).filter((entry) => entry !== null);
    if (!entries.length) return;
    const setActive = (id) => {
      links.forEach((link) => {
        if (decodeURIComponent(link.hash.slice(1)) === id) {
          link.setAttribute("aria-current", "location");
        } else {
          link.removeAttribute("aria-current");
        }
      });
    };
    let scheduled = false;
    const updateActive = () => {
      scheduled = false;
      const marker = Math.max(80, window.innerHeight * 0.32);
      let active = entries[0];
      for (const entry of entries) {
        if (!entry.heading.getClientRects().length) continue;
        if (entry.heading.getBoundingClientRect().top <= marker) active = entry;
        else break;
      }
      setActive(active.heading.id);
    };
    const requestUpdate = () => {
      if (scheduled) return;
      scheduled = true;
      requestAnimationFrame(updateActive);
    };
    links.forEach((link) => {
      link.addEventListener("click", () => {
        const heading = headingById.get(decodeURIComponent(link.hash.slice(1)));
        const disclosure = heading?.closest("details");
        if (disclosure && !disclosure.open) disclosure.open = true;
        if (heading) setActive(heading.id);
      });
    });
    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", requestUpdate);
    window.addEventListener("load", requestUpdate);
    new ResizeObserver(requestUpdate).observe(article);
    requestUpdate();
  });
  document.addEventListener("DOMContentLoaded", () => {
    const citations = Array.from(document.querySelectorAll(".citation__link"));
    if (!citations.length) return;
    const preview = document.createElement("div");
    preview.className = "citation-preview";
    preview.id = "citation-preview";
    preview.setAttribute("role", "tooltip");
    preview.hidden = true;
    document.body.append(preview);
    let activeCitation = null;
    let touchPreviewOpen = false;
    let touchCitation = null;
    const hidePreview = () => {
      preview.hidden = true;
      activeCitation?.removeAttribute("aria-describedby");
      activeCitation = null;
      touchPreviewOpen = false;
    };
    const showPreview = (citation) => {
      const text = citation.dataset.citationPreview;
      if (!text) return;
      activeCitation?.removeAttribute("aria-describedby");
      activeCitation = citation;
      citation.setAttribute("aria-describedby", preview.id);
      preview.textContent = text;
      preview.hidden = false;
      const rect = citation.getBoundingClientRect();
      const width = preview.getBoundingClientRect().width;
      const left = Math.min(Math.max(16, rect.left), window.innerWidth - width - 16);
      const below = rect.bottom + 10;
      const top = below + preview.offsetHeight <= window.innerHeight - 16 ? below : Math.max(16, rect.top - preview.offsetHeight - 10);
      preview.style.left = `${left}px`;
      preview.style.top = `${top}px`;
    };
    citations.forEach((citation) => {
      citation.addEventListener("mouseenter", () => showPreview(citation));
      citation.addEventListener("mouseleave", hidePreview);
      citation.addEventListener("focus", () => showPreview(citation));
      citation.addEventListener("blur", hidePreview);
      citation.addEventListener("pointerdown", (event) => {
        if (event.pointerType === "touch" && touchCitation !== citation) touchPreviewOpen = false;
        touchCitation = event.pointerType === "touch" ? citation : null;
      });
      citation.addEventListener("click", (event) => {
        if (touchCitation !== citation || touchPreviewOpen) return;
        event.preventDefault();
        touchPreviewOpen = true;
        showPreview(citation);
      });
    });
    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") hidePreview();
    });
    document.addEventListener("scroll", hidePreview, true);
    window.addEventListener("resize", hidePreview);
  });
})();
