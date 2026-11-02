Implemented the blog-only YAML-driven enhancements.

Changed files:

- [blog single layout](/C:/Users/Adhit%20Simhadri/Desktop/Projects/portfolio/s-adhit.github.io/layouts/blog/single.html)
- [resource-links partial](/C:/Users/Adhit%20Simhadri/Desktop/Projects/portfolio/s-adhit.github.io/layouts/partials/blog/resource-links.html)
- [TOC partial](/C:/Users/Adhit%20Simhadri/Desktop/Projects/portfolio/s-adhit.github.io/layouts/partials/blog/toc.html)
- [Hugging Face local SVG](/C:/Users/Adhit%20Simhadri/Desktop/Projects/portfolio/s-adhit.github.io/assets/icons/brand-huggingface.svg)
- [scoped blog styles](/C:/Users/Adhit%20Simhadri/Desktop/Projects/portfolio/s-adhit.github.io/assets/scss/custom.scss)

Features added:

- HTTPS-validated `github_url` and `huggingface_url` buttons, with local icons, accessible labels, focus states, new-tab safety attributes, and mobile wrapping.
- Metadata format: `Date · N min read`; uses `reading_minutes` when supplied, otherwise Hugo’s `.ReadingTime`.
- Optional `toc: true` native collapsible TOC, omitted when Hugo generates no entries.
- Blog-only mobile overflow handling for tables, code, KaTeX, figures, images, and captions.
- No content/front matter, navigation, tags, theme layouts, or other site sections changed.

Validation: `git diff --check` passed for the edited tracked files and the Hugging Face SVG parses successfully. Hugo is not installed/on PATH in this environment, so I could not run the requested production build. Manual follow-up: run `hugo --environment production --minify` locally after installing Hugo Extended.