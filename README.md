## Demo

[Demo](https://fret2buzz.github.io/fret-11ty/)

## Overview

Create your own styleguide and documentation using [Eleventy](https://www.11ty.dev/) static site generator.

## Files structure

Source to compile html files. It can be both `*.md` or `*.njk`

```
./src/files
├── 00-folder-0
│        └── _file-0.md
├── 01-folder-1
│        ├── _file-1.njk
│        └── _file-2.njk
├── 02-folder-2
│        ├── __file-3.njk
│         ...
├── NN-folder-N
│        └── _file-N.njk
│
...
```

Source of styles should have the same folder structure and file names

```
./src/styles
├── 00-folder-0
│        └── _file-0.scss
├── 01-folder-1
│        ├── _file-1.scss
│        └── _file-2.scss
├── 02-folder-2
│        ├── __file-3.scss
│         ...
├── NN-folder-N
│        └── _file-N.scss
│
...
```
## Examples

Describe HTML example using `{% example %}` short code

with modifiers
```
{% example ["m-danger", "m-accent"] %}
<button class="b-button %%modifier%%">
    CTA Value
</button>
{% endexample %}
```

without modifiers
```
{% example %}
<button class="b-button %%modifier%%">
    CTA Value
</button>
{% endexample %}
```

`{% markdown %}` shortcode
```
{% markdown %}
# Heading 1

Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quo adipisci blanditiis quaerat vitae pariatur deleniti modi nobis magni iusto dicta eius cumque eligendi, dolore doloribus vel optio repellat labore. Earum.
{% endmarkdown %}
```

## Compare folders

To keep track which files are not yet included to style guide run `npm run dircompare` to create comparison page.
