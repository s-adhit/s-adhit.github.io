Implemented the Blog-only responsive TOC navigation.

Modified:

- [toc.html](C:/Users/Adhit%20Simhadri/Desktop/Projects/portfolio/s-adhit.github.io/layouts/partials/blog/toc.html)
- [custom.scss](C:/Users/Adhit%20Simhadri/Desktop/Projects/portfolio/s-adhit.github.io/assets/scss/custom.scss)
- [custom.ts](C:/Users/Adhit%20Simhadri/Desktop/Projects/portfolio/s-adhit.github.io/assets/ts/custom.ts)

Behavior:

- At ≥1260px, a slim sticky right-side rail appears without changing the article’s 700px reading width.
- At smaller widths, the rail is hidden and a compact “On this page” disclosure is shown above the article.
- Hugo’s generated TOC links/heading IDs are reused; no Markdown, appendix links, or URLs change.
- H2s and nested H3s render as primary and indented links.
- The active section gets the existing purple accent plus a subtle vertical indicator.
- Navigation uses smooth scrolling unless reduced motion is requested. Without JavaScript, normal anchor navigation still works.
- Active-state tracking uses throttled scroll measurements plus `ResizeObserver`, accommodating image/table/equation layout changes and disclosure expansion.
- Keyboard focus states and semantic navigation labels are included; long labels wrap safely.

Verification:

- Sass compilation passed.
- TypeScript type-check passed.
- Scoped `git diff --check` passed.
- Hugo is not installed in this workspace, so an actual Hugo build/render check could not be run.