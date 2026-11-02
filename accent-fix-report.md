Fixed in [assets/scss/custom.scss](C:\Users\Adhit Simhadri\Desktop\Projects\portfolio\s-adhit.github.io\assets\scss\custom.scss:106).

Root cause: the current uncommitted CSS refactor replaced the original shared `.home-content` `strong` and link selectors with Blog/Notes-only selectors. Homepage Markdown is rendered directly in `.home-content`, so its accents stopped matching.

Restored homepage-only accents using existing variables:

- Purple headings, including “About Me”
- Bold Markdown (`strong`/`b`), including inside lists
- Inline HTML `.accent` elements
- Homepage links and hover/focus color
- Existing `--accent: #a78bfa` and `--accent-soft` reused

Stack’s relevant Markdown selectors target `.article-content`, which the custom home layout does not use; no Stack specificity conflict applies. Blog and Notes selectors remain unchanged, and no content, layouts, typography, math, table, resource-button, or outline rules were modified.

Verification: targeted `git diff --check -- assets/scss/custom.scss` passed. Hugo is not installed/on `PATH` in this environment, so `hugo --gc --minify` could not run.