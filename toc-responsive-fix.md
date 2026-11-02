Implemented the responsive Blog TOC fix.

- [toc.html](C:\Users\Adhit Simhadri\Desktop\Projects\portfolio\s-adhit.github.io\layouts\partials\blog\toc.html): renders a native `<details>` “On this page” TOC for non-desktop/no-JS use, reusing Hugo `TableOfContents` links.
- [custom.scss](C:\Users\Adhit Simhadri\Desktop\Projects\portfolio\s-adhit.github.io\assets\scss\custom.scss): floating outline now appears only from `1440px` upward; expanded width is limited to actual right-gutter space (up to 280px), wraps long H2/H3 labels, and avoids overlap with the article. Only one TOC is visible at a time.
- [custom.ts](C:\Users\Adhit Simhadri\Desktop\Projects\portfolio\s-adhit.github.io\assets\ts\custom.ts): measures the article’s right edge and header position. The desktop rail activates only when at least 220px of real gutter space remains, keeps hover/focus expansion, Escape close, and purple active-section tracking.

Verification:
- Sass compilation passed.
- TypeScript type-check passed.
- Scoped `git diff --check` passed.
- Hugo could not be run because the `hugo` executable is not installed in this environment.

The mobile/tablet TOC is native, touch/keyboard accessible, works without JavaScript, and respects the existing reduced-motion rule.