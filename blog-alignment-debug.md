No speculative CSS adjustment was applied. The repository’s current uncommitted Blog layout already contains the structural fix.

Root cause: Blog previously used `.coming-soon`, while Notes used `.home-content`; this created a different layout path. The resolved Blog template now matches Notes:

- [layouts/blog/list.html](C:/Users/Adhit%20Simhadri/Desktop/Projects/portfolio/s-adhit.github.io/layouts/blog/list.html) → `.home-content`
- [layouts/notes/list.html](C:/Users/Adhit%20Simhadri/Desktop/Projects/portfolio/s-adhit.github.io/layouts/notes/list.html) → same normalized template
- [layouts/partials/tag-filter-list.html](C:/Users/Adhit%20Simhadri/Desktop/Projects/portfolio/s-adhit.github.io/layouts/partials/tag-filter-list.html) → both use `ul.notes-list.index-entry-list`

Both pages inherit Stack’s same wrapper from `themes/stack/layouts/baseof.html`:

`main.full-width > .home-content > h1 / .page-content / .tag-filter / ul.notes-list`

CSS findings:

- `.home-content`: `max-width: 700px; margin-left: 20px; margin-top: 40px`
- `.notes-list`: same `max-width`, `margin-left`, and list padding rules
- `.home-content .tag-filter`: same 20px left margin on both pages
- `.main article { max-width: 720px; margin: 0 auto }` is the only centered selector investigated, and it affects neither index: generated Blog and Notes HTML contain no `<article>`.

Evidence:

- Generated `/blog/` and `/notes/` load the identical fingerprinted stylesheet.
- Their normalized list templates are identical.
- Their generated layout hierarchies use the same relevant classes.
- Filtering, reverse-date ordering, and date formatting remain in the shared partial.
- No Notes, post, sidebar, logo/resource-button, content, URL, or broad stylesheet changes were made in this pass.

`hugo` is not installed/on PATH, so a fresh Hugo build could not be run. Browser inspection is also unavailable in this environment, so visual pixel alignment remains unverified despite the matching generated DOM and cascade.