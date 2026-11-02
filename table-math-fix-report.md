Implemented the targeted Blog-only changes.

- `layouts/blog/single.html`
  - Wraps Markdown tables in native collapsed `<details>/<summary>` disclosures.
  - Uses preceding bold `Table …` captions as summaries and removes the duplicate caption.
  - Uses “View table” when no caption is detectable.
  - Supports `<!-- table:open -->` immediately before a table as an expanded-by-default override.
  - Keeps semantic `<table>`, `<thead>`, and `<th>` markup intact.

- `assets/scss/custom.scss`
  - Adds Blog-single-scoped table sizing, local horizontal scrolling, row separators, padding, purple/dark-theme disclosure styling, and keyboard focus treatment.
  - Keeps non-final columns unwrapped for labels/numbers; lets the final descriptive column wrap naturally.

- `content/blog/Training a Pose Control LoRA for Krea-2.md`
  - Wrapped only the failing Huber display equation in a raw HTML block, preserving the exact TeX notation.

Root cause of the equation issue: Goldmark was interpreting the paired underscores inside `\hat{p}_{...}, p_{...}` as Markdown emphasis before the existing math renderers received the TeX. The raw block prevents that Markdown transformation. The existing site already loads both KaTeX auto-render and MathJax; I did not alter or add renderers.

Verification:
- Confirmed 9 bold table captions and the target equation’s protected raw block in source.
- Ran `git diff --check` successfully for the edited files.
- Hugo is not installed/available in this workspace, so I could not run a Hugo build or browser-render verification.