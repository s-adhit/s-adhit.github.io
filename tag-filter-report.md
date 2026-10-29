Implemented in-page tag filtering for Notes and Blog only.

Modified:

- [hugo.toml](C:/Users/Adhit Simhadri/Desktop/Projects/portfolio/s-adhit.github.io/hugo.toml)
- [Notes list template](C:/Users/Adhit%20Simhadri/Desktop/Projects/portfolio/s-adhit.github.io/layouts/notes/list.html)
- [Blog list template](C:/Users/Adhit%20Simhadri/Desktop/Projects/portfolio/s-adhit.github.io/layouts/blog/list.html)
- [Shared filter partial](C:/Users/Adhit%20Simhadri/Desktop/Projects/portfolio/s-adhit.github.io/layouts/partials/tag-filter-list.html)
- Generated Notes output and removed generated `public/tags/` taxonomy files.

Details:

- Uses only approved tags found in each section’s Markdown `tags` front matter.
- Shows `All` plus only tags actually present in that section.
- Keeps Notes’ original chronological `<ul>/<li>` styling; Blog retains its existing empty-state design.
- Filters instantly client-side, one selected tag at a time; `All` includes untagged entries.
- Uses native accessible buttons, `aria-pressed`, focus styling, keyboard support, and a live status message.
- Works without JavaScript: every entry remains visible.
- Tags taxonomy output is disabled while preserving categories.
- No Markdown, Home, Research, Photos, or article layouts were changed.

Currently no content has front-matter tags, so Notes shows only `All` and Blog remains “Coming Soon”; approved tag buttons will appear automatically as tagged entries are added.

Verification:

- `git diff --check` passed.
- The active Hugo watcher successfully regenerated the Notes page with the filter markup.
- A separate Hugo CLI build could not be run because `hugo` is not on PATH and its running executable is inaccessible to this sandbox.