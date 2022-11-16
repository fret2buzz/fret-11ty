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

## Example

Use macro to create examples

with modifiers
```
{% macro html(mod) %}
<button class="b-button {{ mod }}">
    CTA Value
</button>
{% endmacro %}
```

## Compare folders

To keep track which files are not yet included to style guide run `npm run dircompare` to create comparison page.
