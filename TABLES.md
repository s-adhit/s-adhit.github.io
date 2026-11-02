# Article tables

Markdown tables remain visible by default. Use normal Markdown alignment markers to right-align a numeric column, for example `| Count |` followed by `| ---: |`.

## Collapsible tables

Wrap an existing table unchanged when it should be opt-in:

```md
{{< collapsible-table title="Dataset details" description="Optional context for this table." open="false" >}}
| Split | Images | Notes |
| --- | ---: | --- |
| Training | 16582 | Original row text stays unchanged. |
{{< /collapsible-table >}}
```

Parameters:

- `title` — compact summary label; defaults to `Table`.
- `description` — optional short text shown below the summary.
- `open` — optional `true` or `false`; defaults to `false`.

The shortcode uses native `details` and `summary`, so it is keyboard-operable without JavaScript. Its inner content is rendered as Markdown by Hugo, including standard tables. Copy existing table rows and values into the shortcode as-is; only add the opening and closing shortcode lines around them.
