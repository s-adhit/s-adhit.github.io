Fixed the Krea-2 blog image pipeline.

- Corrected the existing hero reference to `/images/blog/krea2/hero.png`.
- Added a site-level Hugo image render hook at [render-image.html](C:\Users\Adhit Simhadri\Desktop\Projects\portfolio\s-adhit.github.io\layouts\_markup\render-image.html) so static images retain usable URLs instead of rendering without `src`.
- Preserved captions, alt text, image files, resolution, and locations.
- Existing responsive CSS already enforces `max-width: 100%` and `height: auto`; no styling changes were needed.
- The root-relative paths work with the configured GitHub Pages `baseURL`.

Confirmed existing:

- `hero.png`
- `architecture.png`

Still missing (references intentionally unchanged):

- `dataset-montage.png`
- `pose-condition.png`
- `caption-example.png`
- `generations.png`
- `prompt-comparison.png`

Hugo is not installed or available on PATH in this environment, so I could not run a Hugo build.