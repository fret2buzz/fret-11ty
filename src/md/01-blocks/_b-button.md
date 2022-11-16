---
mods:
    - m-danger
    - m-accent
---

Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quo adipisci blanditiis quaerat vitae pariatur deleniti modi nobis magni iusto dicta eius cumque eligendi, dolore doloribus vel optio repellat labore. Earum.

{% macro html(mod, idx) %}
<button class="b-button {{ mod }}" id="button-{{ idx }}">
    CTA Value
</button>
{% endmacro %}

{% include 'example.md' %}

Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quo adipisci blanditiis quaerat vitae pariatur deleniti modi nobis magni iusto dicta eius cumque eligendi, dolore doloribus vel optio repellat labore. Earum.
