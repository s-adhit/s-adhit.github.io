Fixed both issues.

- Blog alignment cause: `/blog/` resolved to `layouts/blog/list.html`, which used `.coming-soon`, while the shared filter partial emitted `.blog-list`. Notes used `.home-content` and `.notes-list`, so Blog was structurally different and inherited different width/margin behavior.
- Blog now uses the same resolved hierarchy as Notes: `.home-content` for the heading/filters and `.notes-list.index-entry-list` for posts. Filtering, newest-first ordering, and dates are unchanged.
- Notes was not modified.

Logo changes:

- Updated [resource-links.html](C:\Users\Adhit Simhadri\Desktop\Projects\portfolio\s-adhit.github.io\layouts\partials\blog\resource-links.html) to load the supplied local `assets/icons/GitHub.svg` and `assets/icons/hf-logo.svg` through Hugo Resources with fingerprinting.
- Updated [custom.scss](C:\Users\Adhit Simhadri\Desktop\Projects\portfolio\s-adhit.github.io\assets\scss\custom.scss) so logos display at 20px with `object-fit: contain`, preserving their proportions.
- Labels, URLs, accessibility labels, colors, and button styling remain intact.

Verification:

- Generated `/blog/` and `/notes/` HTML both contain `main.full-width > .home-content` and `ul.notes-list.index-entry-list`.
- Generated Blog article HTML references both fingerprinted local SVGs:
  - `/icons/GitHub.…svg`
  - `/icons/hf-logo.…svg`
- Generated SVG files exist in `public/icons/`.
- Hugo CLI is not installed/available in this shell, so I could not run a fresh `hugo` command. The existing generated output reflects the template changes.