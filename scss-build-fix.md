Fixed the actual Sass failure in [custom.scss](C:\Users\Adhit Simhadri\Desktop\Projects\portfolio\s-adhit.github.io\assets\scss\custom.scss:450).

Changed only the mobile gallery rule:

```scss
minmax(unquote("min(220px, 100%)"), 1fr)
```

This preserves native CSS `min()` for the browser, preventing Sass from comparing incompatible `px` and `%` units. The SCSS compiles successfully with the available Ruby Sass compiler, and no other SCSS `min()`, `max()`, or `clamp()` expressions exist in the imported Stack chain.

`hugo` / Hugo Extended is not installed or available on PATH here, so `hugo build` still needs verification in an environment with Hugo Extended.