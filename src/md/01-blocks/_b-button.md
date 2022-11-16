---
mods:
    -
    - m-danger
    - m-accent
---

Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quo adipisci blanditiis quaerat vitae pariatur deleniti modi nobis magni iusto dicta eius cumque eligendi, dolore doloribus vel optio repellat labore. Earum.

{% macro html(mod) %}
<button class="b-button {{ mod }}">
    CTA Value
</button>
{% endmacro %}

## Example

<div class="l-fret11ty-flex">
<div class="Box">
{% for item in mods %}

<div class="Box-row">

<div class="text-mono text-bold pb-3">
.{{ item }}
</div>

{{ html(item) | trim }}

</div>

{% endfor %}
<div class="Box-row">
<details class="mb-0">
<summary>Code:</summary>

```html
{{ html(item) | trim }}
```
</details>
</div>
</div>
</div>

Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quo adipisci blanditiis quaerat vitae pariatur deleniti modi nobis magni iusto dicta eius cumque eligendi, dolore doloribus vel optio repellat labore. Earum.
