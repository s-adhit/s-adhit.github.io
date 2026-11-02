Fixed the Blog single-page alignment in [assets/scss/custom.scss](/C:/Users/Adhit%20Simhadri/Desktop/Projects/portfolio/s-adhit.github.io/assets/scss/custom.scss:334).

Root cause: the Blog template uses `<article class="blog-article">`, which matched the more-specific global selector:

```scss
.main article { margin: 0 auto; }
```

That overrode the intended `.blog-article { margin: 40px 0 0 20px; }`. Notes uses `.home-content`, so it never inherited the centering rule.

Changed selectors:

- `.blog-article` → `.main > .blog-article`
- Mobile equivalent updated at line 591.

The Blog title, metadata, resource buttons, TOC, and body now share Notes’ 20px left edge. Blog retains its 700px technical-content width, overflow handling, and mobile full-width behavior. No Notes or index layouts were changed.

Verification:

- Sass syntax compilation of `custom.scss`: passed.
- `git diff --check` for the edited stylesheet: passed.
- Hugo build: unavailable (`hugo` is not installed).
- Browser rendering: unavailable because browser access host was not running, so visual verification could not be performed here.