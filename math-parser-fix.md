Fixed Goldmark math passthrough and consolidated rendering on KaTeX.

- Added Hugo 0.158 Goldmark passthrough delimiters for `$$…$$`, `$…$`, `\[…\]`, and `\(...\)` in [hugo.toml](C:/Users/Adhit%20Simhadri/Desktop/Projects/portfolio/s-adhit.github.io/hugo.toml:80).
- Removed the custom global KaTeX/MathJax scripts; MathJax is no longer loaded.
- Preserved Stack’s KaTeX auto-render flow via a local hook override targeting normal, blog, and notes article containers: [math.html](C:/Users/Adhit%20Simhadri/Desktop/Projects/portfolio/s-adhit.github.io/layouts/partials/article/components/math.html:1).
- Ensured custom blog/notes templates invoke that single hook.

Root cause: Goldmark was parsing `_..._` inside TeX as Markdown emphasis before KaTeX received it, producing `<em>` and corrupting `\hat{p}_{\text{norm}}`. Passthrough now preserves the TeX unchanged until KaTeX processes it.

Verification:
- Confirmed both single- and double-dollar delimiters are configured.
- Confirmed the affected source equation remains unchanged.
- Confirmed one KaTeX external-helper call and zero MathJax references in `layouts/`.
- `git diff --check` passes for the edited tracked files.
- Hugo build could not run because `hugo` is not installed/on PATH in this environment. The existing `public/` output is therefore stale and still reflects the previous scripts.