Implemented the Notion-style Blog outline.

- Desktop: slim fixed right-gutter indicators; hover/focus expands the titled H2/H3 panel.
- Active heading uses the existing purple accent and updates via `IntersectionObserver`.
- Mobile/tablet: accessible “On this page” toggle with `aria-expanded`; panel stays in flow so it doesn’t cover content.
- Escape closes the panel; focus states, reduced-motion behavior, native anchors, and no-JS link fallback are preserved.
- The old permanent rail/disclosure TOCs were removed. Article width, alignment, and other sections remain untouched.

Affected files:

- [toc.html](C:/Users/Adhit%20Simhadri/Desktop/Projects/portfolio/s-adhit.github.io/layouts/partials/blog/toc.html)
- [custom.scss](C:/Users/Adhit%20Simhadri/Desktop/Projects/portfolio/s-adhit.github.io/assets/scss/custom.scss)
- [custom.ts](C:/Users/Adhit%20Simhadri/Desktop/Projects/portfolio/s-adhit.github.io/assets/ts/custom.ts)

Verification: Sass compilation and scoped `git diff --check` passed. Hugo production build could not run because `hugo` is not installed or on PATH in this environment.