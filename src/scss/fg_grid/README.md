# The Simplest Sass / Flexbox grid ever!

This is a set of simple Sass mixins meant to provide a basic grid for your websites.
<https://ajy.co/the-simplest-sass-flexbox-grid-ever>

See a demo and play with it: <http://codepen.io/aaronjamesyoung/pen/yezKpj>

## Grid mixin usage

This repo provides a mixin called `_fg()`. You can use this mixin on a grid
*container*. It will distribute the child elements of that container into a grid
layout as specified in the mixin.

The mixin accepts three arguments, which I'll explain below:

1. Number of columns OR layout
2. Width of gutter between grid columns
3. Amount of padding in grid columns

Let's break it down, starting with the simplest usage.

### Sample HTML

```html
<div class="grid_container">
  <div class="column_1">Column 1</div>
  <div>Column 2</div>
  <div>Column 3</div>
  <div>Column 4</div>
  <div>Column 5</div>
  <div>Column 6</div>
  <div>Column 7</div>
</div>
```

### Default settings

```scss
$_fg_gutter: 24px !default; // gutter between columns. Set as desired.
$_fg_padding: 12px !default; // padding for column boxes. Set as desired, can override for individual columns.
```

*(Previously these settings were unitless, to be interpreted as pixels. Now you can set these to any units you prefer. If you don't specify a unit, it will still be interpreted as pixels by the mixin)*

You can override these settings as desired for your project (they can also be custom-set any time you call the `_fg()` mixin, but we'll get to that in a second).

### Specify number of columns

```scss
.grid_container { @include _fg(3); }
```

Here we passed a single number (3) to the grid mixin. This gives us a three-column
layout. Each `<div>` will use 1/3 of the width of the grid container. The rows
will wrap - given the above markup, there will be two full rows and Column 7
will be on a third row by itself.

### Helper mixin: `_fg_width()`

The above usage is helpful, but we might want to make an exception - perhaps we
want a layout with a main content area (2/3 width) and a sidebar (1/3 width).
We can override width on a specific column like this:

```scss
.column_1 { @include _fg_width(2/3); }
```

However, we can write a layout more efficiently using the `_fg()` mixin as below:

### Specify per-row layout of columns

Basically, this combines the two above usages.

```scss
.grid_container { @include _fg(1 3 2); }
```

The first argument to the mixin can also be a *list* - a set of space-separated
numbers. This will set up three columns of varying widths. The above mixin is
equivalent to calling:

```scss
.grid_container { @include _fg(6); } // 1+3+2=6
.grid_container > div:nth-child(3n+2) { @include _fg_width(3/6); } // second column in each row
.grid_container > div:nth-child(3n+3) { @include _fg_width(2/6); } // third column in each row
```

Thus, each row will have three columns at 1/6 width + 3/6 width + 2/6 width. This
should make it easy to set up flexible layouts.

Also note that these two statements are equivalent:

```scss
.grid_container { @include _fg(3); }
```

```scss
.grid_container { @include _fg(1 1 1); } // does the same thing!
```

### Set a custom gutter width

```scss
.grid_container { @include _fg(3, 45px); }
```

```scss
.grid_container { @include _fg(1 3 2, 45px); }
```

Each example above sets a gutter of 45px between each column.

### Set custom padding inside columns

```scss
.grid_container { @include _fg(2 2 1 1, 45px, 30px); }
```

This sets a custom padding of 30px inside each of the columns specified.

### A couple more examples all together

```scss
@include _fg(2 2 1 1);
  // four columns in each row;
  // 1/3 + 1/3 + 1/6 + 1/6 in each row
  // Uses default settings for grid width and padding inside column elements
```

```scss
@include _fg(5, 20px, 10px);
  // Five equal columns in each row
  // 20px gutters between each column (overriding the default)
  // each column has 10px padding (overriding the default)
```

```scss
@include _fg(2 1, 60px, 0);
  // 2/3 + 1/3 columns in each row
  // 60px gutter between columns
  // columns will have no padding
```

## Breakpoint mixin usage

Breakpoints can be defined as:

```scss
$_fg_small: 768px;  // If units are not specified, treated as pixels
$_fg_medium: 1024px;
$_fg_large: 1280px;

@include _fg_breakpoint(small); // or medium or large
```

This is a pretty standard `min-width` breakpoint mixin, so you can write your code mobile-first
and move up:

```scss
body { background: red; @include _fg(1); // on the smallest screens
  @include _fg_breakpoint(small) { @include _fg(2); } // tablet size
  @include _fg_breakpoint(medium) { @include _fg(4); } // desktop size
}
```

Of course you may set the pixel numbers to whatever you prefer.

You may also pass the breakpoint as an arbitrary width:

```scss
@include _fg_breakpoint(600); // evaluates to "@media (min-width: 600)"
```
