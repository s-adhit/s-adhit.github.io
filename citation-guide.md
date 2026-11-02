# Citation guide

This site has page-local, numbered references. Define them in the YAML front matter of the Blog or Notes page that uses them; numbering follows the order in `references`.

```yaml
references:
  - id: krea2
    citation: "Lee, S., et al. (2026). *Krea 2 Technical Report*. Krea. [Technical Report](https://www.krea.ai/blog/krea-2-technical-report)"
  - id: krea2-depth-controlnet-lora
    citation: "Patil, T. *Krea-2 Depth ControlNet-LoRA*. [GitHub Repository](https://github.com/Tanmaypatil123/Krea-2-controlnet)"
  - id: controlnet
    citation: "Zhang, L., Rao, A., & Agrawala, M. (2023). *Adding Conditional Control to Text-to-Image Diffusion Models*. ICCV. [Paper](https://arxiv.org/abs/2302.05543)"
```

`id` and `citation` are required for the documented format. IDs must be unique within the page. `citation` accepts inline Markdown. The templates also accept `text` as a legacy alias for `citation`.

Use either shortcode form immediately after the supported Markdown text:

```markdown
Krea-2 is the base model.{{< cite ref="krea2" >}}
The control implementation is available here.{{< cite "krea2-depth-controlnet-lora" >}}
ControlNet supplies the conditioning approach.{{< cite ref="controlnet" >}}
```

Render the bibliography once, normally at the end of the page:

```markdown
{{< references >}}
```

Each citation renders as its ordered number, links to `#ref-<id>`, and the bibliography item provides that matching anchor. Hovering a citation shows a short preview. Keyboard focus shows the same preview; `Escape`, scrolling, resizing, or leaving the citation dismisses it. On touch devices, the first tap previews and the next tap follows the reference link.

Without JavaScript, citations remain numbered, keyboard-focusable links and the bibliography remains fully visible and usable. Previews are the only progressive enhancement.

Limitations: references are scoped to one page, numbers are order-based rather than globally assigned, and the shortcodes intentionally fail the Hugo build when an ID is missing or an entry has no citation text. Current content must use the shortcode syntax above; bracketed prose such as `[cite]` is ordinary text, not a citation.
