# Hugo Website Audit

## Architecture

The site uses the Stack theme with local Hugo layout overrides and one global SCSS override. `hugo.toml` defines four primary sections—Research, Notes, Blog, and Photos—and a permanent dark scheme. Core presentation lives in `assets/scss/custom.scss`; custom templates replace Stack’s home, list/section, sidebar, gallery, and content-page layouts.

## Strengths

- The information architecture is pleasingly small: four clear destinations and a concise home page ([hugo.toml:56](C:/Users/Adhit%20Simhadri/Desktop/Projects/portfolio/s-adhit.github.io/hugo.toml:56)).
- The dark palette, restrained purple accent, narrow reading column, 16–17px base article type, and generous leading support long-form reading ([custom.scss:5](C:/Users/Adhit%20Simhadri/Desktop/Projects/portfolio/s-adhit.github.io/assets/scss/custom.scss:5), [variables.scss:83](C:/Users/Adhit%20Simhadri/Desktop/Projects/portfolio/s-adhit.github.io/themes/stack/assets/scss/variables.scss:83)).
- The photo gallery is structurally simple, date-grouped, and uses meaningful image alt text from titles ([photos/list.html:5](C:/Users/Adhit%20Simhadri/Desktop/Projects/portfolio/s-adhit.github.io/layouts/photos/list.html:5)).
- The notes index adds useful chronological scanning via visible dates ([notes/list.html:14](C:/Users/Adhit%20Simhadri/Desktop/Projects/portfolio/s-adhit.github.io/layouts/notes/list.html:14)).
- The vector-field video is muted, inline-capable, and has fallback text ([Vector-Field.md:7](C:/Users/Adhit%20Simhadri/Desktop/Projects/portfolio/s-adhit.github.io/content/notes/Vector-Field.md:7)).

## Problems

1. **High — gallery performance and responsiveness.** Photos are served as large originals from `static/`, including several 12–20 MB JPEGs; the gallery emits no `loading="lazy"`, `width`/`height`, responsive sources, or aspect-ratio control ([photos/list.html:15](C:/Users/Adhit%20Simhadri/Desktop/Projects/portfolio/s-adhit.github.io/layouts/photos/list.html:15)). This can mean well over 100 MB on the gallery page and causes layout shift.

2. **High — math is loaded globally and redundantly.** Every page loads KaTeX CSS/JS and MathJax; MathJax is parser-blocking ([head/custom.html:3](C:/Users/Adhit%20Simhadri/Desktop/Projects/portfolio/s-adhit.github.io/layouts/partials/head/custom.html:3)). Stack’s native article math can also add KaTeX when applicable. Choose one renderer and load it only for pages that need it.

3. **High — custom layout loses semantic/theme capabilities.** Blog, notes, and research singles are bare `div`s rather than Stack’s article layout, so they omit article metadata, article semantics, optional table of contents, tags, related content, and the theme’s richer responsive treatment ([notes/single.html:3](C:/Users/Adhit%20Simhadri/Desktop/Projects/portfolio/s-adhit.github.io/layouts/notes/single.html:3); same pattern in blog/research).

4. **Medium — active navigation override does not match markup.** The sidebar assigns `class="current"` ([left.html:56](C:/Users/Adhit%20Simhadri/Desktop/Projects/portfolio/s-adhit.github.io/layouts/partials/sidebar/left.html:56)), while custom CSS styles `.active` ([custom.scss:71](C:/Users/Adhit%20Simhadri/Desktop/Projects/portfolio/s-adhit.github.io/assets/scss/custom.scss:71)). The intended active-state customization therefore does not apply.

5. **Medium — desktop-oriented positioning lacks mobile safeguards.** Fixed `margin-left: 20px` appears throughout home, section, notes, and gallery layouts ([custom.scss:200](C:/Users/Adhit%20Simhadri/Desktop/Projects/portfolio/s-adhit.github.io/assets/scss/custom.scss:200)). The social row is absolutely positioned at the bottom of the sidebar ([custom.scss:337](C:/Users/Adhit%20Simhadri/Desktop/Projects/portfolio/s-adhit.github.io/assets/scss/custom.scss:337)), with no breakpoint reset. This risks awkward spacing or overlap in the mobile column layout.

6. **Medium — visual minimalism is undermined by unnecessary overrides.** `.main-container` is a flex container in Stack, so `grid-template-columns` has no effect ([custom.scss:32](C:/Users/Adhit%20Simhadri/Desktop/Projects/portfolio/s-adhit.github.io/assets/scss/custom.scss:32); [grid.scss:59](C:/Users/Adhit%20Simhadri/Desktop/Projects/portfolio/s-adhit.github.io/themes/stack/assets/scss/grid.scss:59)). The right sidebar is already disabled in config, making the `!important` hide redundant. Duplicate `.notes-list` declarations add drift ([custom.scss:264](C:/Users/Adhit%20Simhadri/Desktop/Projects/portfolio/s-adhit.github.io/assets/scss/custom.scss:264), [custom.scss:287](C:/Users/Adhit%20Simhadri/Desktop/Projects/portfolio/s-adhit.github.io/assets/scss/custom.scss:287)).

7. **Medium — accessibility details.** Removing link underlines except on hover weakens link discoverability ([custom.scss:126](C:/Users/Adhit%20Simhadri/Desktop/Projects/portfolio/s-adhit.github.io/assets/scss/custom.scss:126)). There are no custom visible keyboard-focus states. Social icon links have `title` but no accessible names, and new-tab links lack an explicit `rel` value ([left.html:97](C:/Users/Adhit%20Simhadri/Desktop/Projects/portfolio/s-adhit.github.io/layouts/partials/sidebar/left.html:97)).

8. **Low — section experience and content quality.** The generic section/list layouts ignore `_index.md` content and render only raw links or “Coming Soon” ([section.html:7](C:/Users/Adhit%20Simhadri/Desktop/Projects/portfolio/s-adhit.github.io/layouts/_default/section.html:7)). Blog and Research are currently empty. The source contains mojibake in CSS comments and fallback strings, and “Intution” is misspelled ([custom.scss:2](C:/Users/Adhit%20Simhadri/Desktop/Projects/portfolio/s-adhit.github.io/assets/scss/custom.scss:2), [Vector-Field.md:26](C:/Users/Adhit%20Simhadri/Desktop/Projects/portfolio/s-adhit.github.io/content/notes/Vector-Field.md:26)).

## Prioritized recommendations

1. Convert gallery images to Hugo page resources; generate WebP/AVIF responsive variants, lazy-load below the fold, and emit intrinsic dimensions.
2. Retain Stack’s semantic article template (or reproduce its `<article>` structure and metadata); use section-specific list templates with dates, summaries, and empty-state copy.
3. Use one math renderer, conditional on page front matter; defer it and avoid globally loading it.
4. Simplify SCSS: remove ineffective/redundant rules and `!important`, use Stack spacing variables, correct `.active` to `.current`, and add breakpoint rules for the social row.
5. Restore persistent link cues and add `:focus-visible` styles; give icon links `aria-label`s and external links `rel="noopener noreferrer"`.
6. Replace inline raw HTML with Hugo shortcodes where practical, review `unsafe = true` ([hugo.toml:76](C:/Users/Adhit%20Simhadri/Desktop/Projects/portfolio/s-adhit.github.io/hugo.toml:76)), and clean encoding/typos.

No website files were modified.