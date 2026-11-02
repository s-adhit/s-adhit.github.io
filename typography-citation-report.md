Implemented the requested enhancements without modifying post content.

Changed:

- [custom.scss](C:/Users/Adhit%20Simhadri/Desktop/Projects/portfolio/s-adhit.github.io/assets/scss/custom.scss)
  - Collapsible table headers are now 48px minimum height, 16px medium titles, 13.5px Expand/Collapse labels, comfortable padding, and state-aware purple chevrons.
  - Native `<details>/<summary>` behavior and keyboard support are retained.
  - Purple strong text, inline code, and underlined links are scoped to Blog and Notes prose only.
  - Inline code keeps the existing dark background and padding; fenced blocks are untouched.
  - Added accessible citation and reference styling.

- [collapsible-table.html](C:/Users/Adhit%20Simhadri/Desktop/Projects/portfolio/s-adhit.github.io/layouts/shortcodes/collapsible-table.html) and [blog single template](C:/Users/Adhit%20Simhadri/Desktop/Projects/portfolio/s-adhit.github.io/layouts/blog/single.html)
  - Expand/Collapse labels and chevrons now reflect disclosure state.

- [cite.html](C:/Users/Adhit%20Simhadri/Desktop/Projects/portfolio/s-adhit.github.io/layouts/shortcodes/cite.html) and [references.html](C:/Users/Adhit%20Simhadri/Desktop/Projects/portfolio/s-adhit.github.io/layouts/shortcodes/references.html)
  - Added reusable numbered citation and bibliography shortcodes.
  - Citations link to stable `#ref-id` anchors without JavaScript.
  - Hover/focus previews use a compact, viewport-constrained popover.
  - On touch, first tap previews and second tap follows the bibliography link.

- [custom.ts](C:/Users/Adhit%20Simhadri/Desktop/Projects/portfolio/s-adhit.github.io/assets/ts/custom.ts)
  - Adds the dependency-free accessible preview behavior.

- [CITATIONS.md](C:/Users/Adhit%20Simhadri/Desktop/Projects/portfolio/s-adhit.github.io/CITATIONS.md)
  - Copy-paste authoring documentation.

Authoring example:

```yaml
references:
  - id: krea2
    citation: "A. Author. *Krea-2 Technical Report*. 2026. [https://example.com](https://example.com)"
  - id: coco
    citation: "T.-Y. Lin et al. *Microsoft COCO: Common Objects in Context*. ECCV, 2014."
```

```markdown
Text with a source.{{< cite ref="krea2" >}}

{{< references >}}
```

Citation numbers follow YAML order, so a reference can be cited repeatedly with a consistent number.

Validation: `git diff --check` found no issues in the edited source files. Hugo is not installed or available on PATH in this environment, so the production build could not be run.

Remaining manual checks: verify keyboard focus/escape behavior, hover positioning near viewport edges, and first/second-touch citation behavior in a browser.