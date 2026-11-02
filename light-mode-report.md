Implemented the theme system.

Files changed:

- [custom.scss](C:\Users\Adhit Simhadri\Desktop\Projects\portfolio\s-adhit.github.io\assets\scss\custom.scss)
- [custom.ts](C:\Users\Adhit Simhadri\Desktop\Projects\portfolio\s-adhit.github.io\assets\ts\custom.ts)
- [main.ts](C:\Users\Adhit Simhadri\Desktop\Projects\portfolio\s-adhit.github.io\assets\ts\main.ts)
- [hugo.toml](C:\Users\Adhit Simhadri\Desktop\Projects\portfolio\s-adhit.github.io\hugo.toml)
- [head.html](C:\Users\Adhit Simhadri\Desktop\Projects\portfolio\s-adhit.github.io\layouts\_partials\head\head.html)
- [theme-init.html](C:\Users\Adhit Simhadri\Desktop\Projects\portfolio\s-adhit.github.io\layouts\_partials\head\theme-init.html)
- [left.html](C:\Users\Adhit Simhadri\Desktop\Projects\portfolio\s-adhit.github.io\layouts\_partials\sidebar\left.html)

The active Stack semantic variables now support both schemes. Light mode uses the requested palette: `#F8F7FA`, `#F0EEF4`, `#FFFFFF`, `#24212C`, `#706B79`, `#7150AB`, `#56378D`, `#EEE8F7`, `#E5E1EA`, and `#F0ECF5`. Existing dark token values were retained exactly.

The sidebar now has an accessible Light / Dark / System segmented switcher beside the social links. It works on desktop and inside the expanded mobile menu. Selection uses `aria-pressed`, visible focus outlines, and keyboard-native buttons.

Preference is saved under `AdhitThemePreference`; Stack’s existing `StackColorScheme` value is mirrored for compatibility. System maps to Stack’s `auto`, follows OS theme changes, and storage failure safely falls back to System for the current visit.

Theme initialization runs synchronously in the document head before styles/content paint, sets `data-scheme`, `color-scheme`, and `theme-color`, preventing theme flashes. Color-only transitions are enabled after initialization and respect reduced-motion preferences.

I also kept the current layout, sidebar sizing, Inter typography, desktop outline/mobile TOC behavior, and existing dark styling intact. Light styling reaches tables, disclosures, code, KaTeX, citations, tags, resource links, galleries, and Stack-native components.

Verification:

- Development Hugo rendering successfully caught a Sass unit issue; it was fixed by emitting `min(100%, 240px)` as literal CSS rather than Sass arithmetic.
- Direct initialization tests passed for Light, Dark, System-dark, System-light, default System, and blocked localStorage fallback.
- `git diff --check` is clean for the files changed here.
- Browser interaction/responsive testing was not possible: the browser host was unavailable.
- The final `hugo --gc --minify` command could not be run because Hugo is not on PATH and its detected WinGet executable is inaccessible to this sandbox.