Blog now uses the exact Notes index wrapper and content structure in [layouts/blog/list.html](C:\Users\Adhit Simhadri\Desktop\Projects\portfolio\s-adhit.github.io\layouts\blog\list.html).

Root cause: `/notes/` resolves to `layouts/notes/list.html`, using `.home-content`; `/blog/` resolves to `layouts/blog/list.html`, which used the separate `.coming-soon` structure. That divergence omitted Notes’ normal content wrapper and made Blog susceptible to different list positioning. Stack’s default list template is not used for either route.

The Blog template now matches Notes’ DOM structure:
- `.home-content` content container
- Title and `.page-content`
- Existing shared tag-filter/list partial, preserving filters, dates, and reverse-chronological ordering

No CSS, Notes templates, Markdown, content, or other sections were changed. No centering or `margin: auto` rule was added.

Verification: template markup matches Notes structurally and `git diff --check` passes. Hugo is not installed or available in this workspace, so I could not run a Hugo build.