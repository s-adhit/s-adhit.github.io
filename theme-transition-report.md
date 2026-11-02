Implemented the refined theme system without altering Markdown content, front matter, assets, URLs, or Stack upstream files.

Modified:

- [custom.scss](C:\Users\Adhit Simhadri\Desktop\Projects\portfolio\s-adhit.github.io\assets\scss\custom.scss)
- [custom.ts](C:\Users\Adhit Simhadri\Desktop\Projects\portfolio\s-adhit.github.io\assets\ts\custom.ts)
- [theme-init.html](C:\Users\Adhit Simhadri\Desktop\Projects\portfolio\s-adhit.github.io\layouts\_partials\head\theme-init.html)
- [left.html](C:\Users\Adhit Simhadri\Desktop\Projects\portfolio\s-adhit.github.io\layouts\_partials\sidebar\left.html)
- [theme-image.html](C:\Users\Adhit Simhadri\Desktop\Projects\portfolio\s-adhit.github.io\layouts\shortcodes\theme-image.html)

Key behavior:

- Light sidebar now uses `#F8F7FA`, matching the page background; mobile menu surfaces remain consistent.
- Replaced the Light/Dark/System segmented control with one moon/sun button beside LinkedIn, X, and GitHub.
- The button has keyboard-native activation, visible focus styling, dynamic accessible labels, and persistent explicit `light`/`dark` storage. OS preference is used only when no explicit choice exists.
- Early head initialization prevents an initial wrong-theme flash.
- Supported browsers use a 650ms View Transitions circular reveal from the actual toggle center, sized to cover the farthest viewport corner. Rapid clicks are blocked; reduced-motion and unsupported browsers switch immediately.
- Removed general color transitions that would interfere with the wipe.
- Added `theme-image` shortcode. Example:

```md
{{< theme-image
  light="/images/example-light.png"
  dark="/images/example-dark.png"
  alt="Architecture diagram"
  caption="Figure — Model architecture."
>}}
```

It supports optional `href`, `width`, `height`, and `loading`; both variants are pre-rendered and CSS selects the active one, while a light-only image remains an accessible single-image fallback.

Verification:

- Focused `git diff --check` passed.
- TypeScript static type-check passed.
- Confirmed no obsolete selector/control references remain.

Limitations:

- `hugo --gc --minify` could not run because Hugo is not installed or on PATH in this environment.
- Browser interaction/visual checks were unavailable because the browser automation host was inaccessible. Desktop/mobile alignment, the live circular wipe, and runtime image swapping should be checked after running the Hugo build locally.