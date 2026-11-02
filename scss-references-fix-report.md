Fixed the focused issues.

- Root cause: `max-height: min(50vh, 360px)` in the Notion outline CSS was being evaluated by Sass, which cannot compare `vh` and `px`. It now emits native CSS math via `unquote(...)`. I also protected the related outline-width `min()` expression.
- Modified [custom.scss](C:\Users\Adhit Simhadri\Desktop\Projects\portfolio\s-adhit.github.io\assets\scss\custom.scss) and [references.html](C:\Users\Adhit Simhadri\Desktop\Projects\portfolio\s-adhit.github.io\layouts\shortcodes\references.html).
- Duplicate heading: the shortcode always emitted its own `<h2>References</h2>` below the author’s `### 8.3 References`. It now detects an author-written References heading and emits only the bibliography list.
- Bibliography: retained numbered anchors; added Inter typography, light text, purple markers/links, improved vertical rhythm, hanging-list alignment, and safe wrapping for long titles/URLs.
- Outline: generated HTML has one `#83-references` outline target, no shortcode heading, and preserves citation anchors/links (22 each).
- Verification: Ruby Sass syntax checking passes; generated CSS contains the intended native `min()` values. Hugo CLI is unavailable here, so a Hugo production build could not be run. No browser testing was performed.