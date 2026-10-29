Implemented the mobile-only responsiveness update.

Modified:

- [custom.scss](C:\Users\Adhit Simhadri\Desktop\Projects\portfolio\s-adhit.github.io\assets\scss\custom.scss)
- [left.html](C:\Users\Adhit Simhadri\Desktop\Projects\portfolio\s-adhit.github.io\layouts\partials\sidebar\left.html)
- [custom.ts](C:\Users\Adhit Simhadri\Desktop\Projects\portfolio\s-adhit.github.io\assets\ts\custom.ts)

Verified improvements:

- Compact existing Stack mobile header retains the site name and adds a 44px touch-friendly menu control.
- Toggle now has `aria-controls` and correctly synchronized `aria-expanded`; Escape closes and returns focus to the toggle.
- Mobile links and social controls have usable touch targets; social icons only appear with the expanded mobile menu.
- Prevents narrow-screen overflow; adapts gallery, media, long text, code, tables, and KaTeX.
- Adds visible keyboard focus.
- Desktop styling/layout remains unchanged: visual CSS changes apply only below `768px`.

Validation:

- TypeScript syntax check passed.
- Sass compilation check passed; no mixed-unit Sass issue introduced.
- Hugo CLI is not installed, so a production Hugo build could not run.
- Browser automation could not access the available browser, so manual testing remains needed at 320, 375, 430, 768, and 1280px.