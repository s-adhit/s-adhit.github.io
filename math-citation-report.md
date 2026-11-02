Implemented the targeted math reliability and citation documentation work.

- Root cause: the tracked `layouts/partials/head/custom.html` removed the old KaTeX scripts, while the intended replacement math hook/custom Blog–Notes templates are untracked. A deployment built from committed files can therefore load no math renderer.
- Updated [math.html](C:\Users\Adhit Simhadri\Desktop\Projects\portfolio\s-adhit.github.io\layouts\partials\article\components\math.html) to use only KaTeX and initialize after all deferred KaTeX assets load. It supports `$…$`, `$$…$$`, `\(...\)`, and `\[...\]`, with preserved Goldmark passthrough.
- Added minimal display-math mobile overflow support for Notes and Blog in [custom.scss](C:\Users\Adhit Simhadri\Desktop\Projects\portfolio\s-adhit.github.io\assets\scss\custom.scss).
- Created [citation-guide.md](C:\Users\Adhit%20Simhadri\Desktop\Projects\portfolio\s-adhit.github.io\citation-guide.md) with the exact schema, shortcode syntax, bibliography rendering, Krea-2/ControlNet/LoRA example, interaction behavior, and limitations.

Verification performed:

- Confirmed Goldmark passthrough preserves the Krea-2 and Vector Field TeX in generated HTML, including `\hat`, `\text`, `\operatorname`, `\left`, `\right`, `\qquad`, subscripts, and display blocks.
- Confirmed the citation shortcode’s `href="#ref-…" ` contract matches bibliography item IDs; it provides numbered links, JS previews, keyboard focus, touch behavior, and a no-JS link fallback.
- The Krea-2 article currently contains literal `[cite]` placeholders rather than citation shortcodes, so no real page citation IDs are presently exercised.
- KaTeX hook JavaScript syntax and the changed stylesheet diff check pass.
- Hugo is not installed/on PATH, so a production build could not run. Browser automation was also unavailable, so I did not claim browser-rendering success.

Important: commit the currently untracked math hook, Blog/Notes layouts, citation shortcodes, and this guide together with the tracked configuration changes; otherwise the deployed site can still omit the replacement math pipeline.