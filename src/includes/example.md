### Example

<div class="l-fret11ty-flex">
<div class="Box">
{% for item in mods %}

<div class="Box-row">

<div class="text-mono text-bold pb-3">
.{{ item }}
</div>

{{ html(item, loop.index) | trim }}

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
