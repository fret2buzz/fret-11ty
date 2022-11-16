---
mods:
    -
    - m-valid
    - m-error
---

Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quo adipisci blanditiis quaerat vitae pariatur deleniti modi nobis magni iusto dicta eius cumque eligendi, dolore doloribus vel optio repellat labore. Earum.

{% macro html(mod, idx) %}
<label for="input{% if idx %}-{{ idx }}{% endif %}">Some label</label>
<input
    class="b-input {{ mod }}"
    id="input{% if idx %}-{{ idx }}{% endif %}"
    type="text"
/>
<br /><br />
<label for="input{% if idx %}-{{ idx }}{% endif %}">Some label</label>
<input
    disabled
    class="b-input {{ mod }}"
    id="input-disabled{% if idx %}-{{ idx }}{% endif %}"
    type="text"
/>
{% endmacro %}

{% include 'example.md' %}

Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quo adipisci blanditiis quaerat vitae pariatur deleniti modi nobis magni iusto dicta eius cumque eligendi, dolore doloribus vel optio repellat labore. Earum.
