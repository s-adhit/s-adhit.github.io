# Academic citations

Add article-specific references to a Blog or Notes post's YAML front matter. The order below is the displayed and linked citation numbering.

```yaml
references:
  - id: krea2
    citation: "A. Author. *Krea-2 Technical Report*. 2026. [https://example.com](https://example.com)"
  - id: coco
    citation: "T.-Y. Lin et al. *Microsoft COCO: Common Objects in Context*. ECCV, 2014."
```

Use a citation anywhere ordinary Markdown is accepted, including inside a paragraph:

```markdown
The model uses flow matching.{{< cite ref="krea2" >}}
```

The positional form is equivalent:

```markdown
{{< cite "krea2" >}}
```

Place the bibliography where it belongs in the article, normally after its final section:

```markdown
{{< references >}}
```

Each `id` must be unique within that post. Define a reference once and cite it any number of times; its number always follows its position in `references`. `citation` supports inline Markdown, including links and emphasis. With JavaScript disabled, each `[n]` remains a normal link to the matching reference.
