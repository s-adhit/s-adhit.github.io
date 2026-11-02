Implemented the math pipeline and typography updates.

Root cause: KaTeX was loading, and Goldmark preserved the `$…$`/`$$…$$` source, but Stack’s original renderer only processed `.main-article`. Your custom Blog and Notes templates use `.blog-article-content` and `.notes-article-content`, so neither was ever rendered.

Changed:

- [math.html](C:\Users\Adhit Simhadri\Desktop\Projects\portfolio\s-adhit.github.io\layouts\partials\article\components\math.html)
  - One KaTeX auto-render pipeline.
  - Targets Stack, Blog, and Notes article containers.
  - Supports `$…$`, `$$…$$`, `\(...\)`, and `\[...\]`.
  - Runs after deferred KaTeX scripts are ready.
  - Keeps code blocks untouched and prevents duplicate rendering.

- [hugo.toml](C:\Users\Adhit Simhadri\Desktop\Projects\portfolio\s-adhit.github.io\hugo.toml)
  - Goldmark passthrough is enabled for inline and display delimiters, preserving LaTeX through Markdown processing.

- [custom.scss](C:\Users\Adhit Simhadri\Desktop\Projects\portfolio\s-adhit.github.io\assets\scss\custom.scss)
  - Inter-first sans-serif stack across the site.
  - Article content at 17px / 1.7 line-height.
  - KaTeX keeps its native math font and wide displays scroll locally rather than overflowing.
  - Blog/Notes lists now use 26px indentation, 12px item separation, nested-list spacing, and purple markers.

- [custom-font.html](C:\Users\Adhit Simhadri\Desktop\Projects\portfolio\s-adhit.github.io\layouts\partials\head\custom-font.html)
  - Replaces Stack’s Lato request with one Inter request for 400/500/600/700 using `display=swap`.
  - A self-hosted Inter asset was not available locally, and this environment blocks font downloads.

Verification performed:

- Confirmed all specified equations remain unchanged in the Krea-2 Markdown source.
- Inspected existing generated Blog and Note HTML: delimiters and LaTeX commands survive Goldmark, KaTeX and auto-render assets load, and the old selector mismatch is visible.
- Sass compilation succeeded.
- `git diff --check` passed for the modified tracked files.

Not performed:

- Hugo production build: `hugo` is not installed in this environment.
- Browser verification: not claimed or performed.

Run locally after installing Hugo Extended:

```powershell
hugo --gc --minify
hugo server --disableFastRender
```

Then verify the Krea-2 post and Vector Field note in a browser; the generated HTML should retain raw delimiters before JavaScript executes, then contain KaTeX-rendered markup after page load.