---
mods:
    - m-valid
    - m-error
---

Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quo adipisci blanditiis quaerat vitae pariatur deleniti modi nobis magni iusto dicta eius cumque eligendi, dolore doloribus vel optio repellat labore. Earum.

{% macro html(mod, idx) %}
<label for="input-{{ idx }}">Some label</label>
<input
    class="b-input {{ mod }}"
    id="input-{{ idx }}"
    type="text"
/>
<br /><br />
<label for="input-disabled-{{ idx }}">Some label</label>
<input
    disabled
    class="b-input {{ mod }}"
    id="input-disabled-{{ idx }}"
    type="text"
/>
{% endmacro %}

{% include 'example.md' %}

Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quo adipisci blanditiis quaerat vitae pariatur deleniti modi nobis magni iusto dicta eius cumque eligendi, dolore doloribus vel optio repellat labore. Earum.
