### Example

<div class="l-fret11ty-flex">
<div class="Box">

{% for item in mods %}
<div class="Box-row">
<div class="pb-3">
<span class="Label Label--large f5 text-mono">{% if loop.index != 1%}.{{ item }}{% else %}default{% endif %}</span>
</div>
{{ html(item, loop.index) | trim }}
</div>
{% endfor %}
<div class="Box-row">
<details class="mb-0">
<summary>Code:</summary>

```html
{{ html(item, loop.index) | trim }}
```
</details>
</div>
</div>
</div>

