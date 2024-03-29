> **ATTENTION:** As part of a major update, we will be replacing the existing `phosphor-icons` package with `@phosphor-icons/web`. We recommend using the new version, as it has improved performance and significantly smaller bundle size, in addition to having the option to only load the weights you need. Some class names and APIs have changed, so please read the documentation before upgrading. The legacy package will continue to recieve maintenance, but will not be updated with new icons upstream. [Take me to the legacy version ➜](https://github.com/phosphor-icons/web/tree/legacy)

<img src="/meta/phosphor-mark-tight-yellow.png" width="128" align="right" />

# @phosphor-icons/web

Phosphor is a flexible icon family for interfaces, diagrams, presentations — whatever, really. Explore all our icons at [phosphoricons.com](https://phosphoricons.com).

[![NPM](https://img.shields.io/npm/v/@phosphor-icons/web.svg?style=flat-square)](https://www.npmjs.com/package/@phosphor-icons/web) [![Travis](https://img.shields.io/travis/com/phosphor-icons/web.svg?style=flat-square)](https://travis-ci.com/github/phosphor-icons/web)

[![GitHub stars](https://img.shields.io/github/stars/phosphor-icons/web?style=flat-square&label=Star)](https://github.com/phosphor-icons/web)
[![GitHub forks](https://img.shields.io/github/forks/phosphor-icons/web?style=flat-square&label=Fork)](https://github.com/phosphor-icons/web/fork)
[![GitHub watchers](https://img.shields.io/github/watchers/phosphor-icons/web?style=flat-square&label=Watch)](https://github.com/phosphor-icons/web)
[![Follow on GitHub](https://img.shields.io/github/followers/rektdeckard?style=flat-square&label=Follow)](https://github.com/rektdeckard)

## Usage

### Getting Started

We use a similar approach as many other icon sets out there, providing icons as several webfonts that uses Unicode's Private Use Area character codes to map normally non-rendering characters to icons. Simply add one or more weights by including its stylesheet to the document `<head>`, and drop in icons with an `<i>` tag and the appropriate classes for the weight and the icon:

```html
<!DOCTYPE html>
<html>
  <head>
    <link
      rel="stylesheet"
      type="text/css"
      href="https://unpkg.com/@phosphor-icons/web@2.1.1/src/bold/style.css"
    />
  </head>
  <body>
    <i class="ph-bold ph-smiley"></i>
    <i class="ph-bold ph-heart" style="color: hotpink"></i>
    <i class="ph-bold ph-cube"></i>
  </body>
</html>
```

> **Note:** You can import as many or as few weights as needed. Only imported weights will match and render as icons.

### Weights

Phosphor Icons come in 6 weights: `regular`, `thin`, `light`, `bold`, `fill`, and `duotone`. In order to use a weight, you must include a link to its stylesheet, and use the appropriate weight class on the icon (the `regular` weight uses `.ph` instead of `.ph-regular`):

```html
<link
  rel="stylesheet"
  type="text/css"
  href="https://unpkg.com/@phosphor-icons/web@2.1.1/src/duotone/style.css"
/>
...
<i class="ph-duotone ph-baseball"></i>
```

The URL format is `https://unpkg.com/@phosphor-icons/web@<VERSION>/src/<WEIGHT>/style.css`. Other common CDNs may also be used.

#### Using All Weights

If you intend to use all 6 weights, they can be made available by including the library as a script tag, using the base URL:

```html
<script src="https://unpkg.com/@phosphor-icons/web@2.1.1"></script>
...
<i class="ph-light ph-address-book"></i>
<i class="ph ph-sunglasses"></i>
```

> **NOTE:** Though assets will be cached for subsequent loads, this will bring in around 3MB of fonts and CSS, and may have impact on page load speed.

### Modules

If your environment supports loading CSS files as modules, icon weights can be imported for effect from the package.

```sh
$ yarn add @phosphor-icons/web
```

```js
import "@phosphor-icons/web/light";
import "@phosphor-icons/web/bold";
```

### Styling

Since the icons are just text under the hood, they can be colored and styled with CSS like any other font, including `font-size`, `color`, etc.

```html
<style>
  .ph-bold {
    font-size: 48px;
  }

  .green {
    color: limegreen;
  }
</style>
...
<!-- 96px -->
<i class="ph-bold ph-airplane"></i>
<!-- 96px and green -->
<i class="ph-bold ph-skull green"></i>
```

> **Note:** Overriding the `font-family`, `font-style`, `font-weight`, `font-variant`, or `text-transform` may break the icons and render unprintable characters. Don't do it. Additionally, all weights use the `:before` pseudoelement to inject the font glyph, so overriding this property in icon classes can break them. The `duotone` weight also uses the `:after` pseudoelement, so it is best not to modify either when styling icons.

<!-- ### Ligatures

All weights aside from `duotone` support ligatures, meaning that in any text using supported weight classes, writing the name of an icon (without the `ph-` prefix) will convert to the corresponding icon. The largest possible string will be matched, meaning you can use any available weight, and print multiple icons without separating with spaces or other characters if you choose.

```html
<!DOCTYPE html>
<html>
  <head>
    <link
      rel="stylesheet"
      type="text/css"
      href="https://unpkg.com/@phosphor-icons/web@2.1.1/src/bold/style.css"
    />
  </head>
  <body>
    <p class="ph-bold">sword shield</p>
  </body>
</html>
``` -->

## Our Related Projects

- [@phosphor-icons/homepage](https://github.com/phosphor-icons/homepage) ▲ Phosphor homepage and general info
- [@phosphor-icons/react](https://github.com/phosphor-icons/react) ▲ Phosphor icon component library for React
- [@phosphor-icons/vue](https://github.com/phosphor-icons/vue) ▲ Phosphor icon component library for Vue
- [@phosphor-icons/flutter](https://github.com/phosphor-icons/flutter) ▲ Phosphor IconData library for Flutter
- [@phosphor-icons/elm](https://github.com/phosphor-icons/phosphor-elm) ▲ Phosphor icon library for Elm
- [@phosphor-icons/webcomponents](https://github.com/phosphor-icons/webcomponents) ▲ Phosphor icons as Web Components
- [@phosphor-icons/figma](https://github.com/phosphor-icons/figma) ▲ Phosphor icons Figma plugin
- [@phosphor-icons/sketch](https://github.com/phosphor-icons/sketch) ▲ Phosphor icons Sketch plugin

## Community Projects

- [phosphor-react-native](https://github.com/duongdev/phosphor-react-native) ▲ Phosphor icon component library for React Native
- [phosphor-svelte](https://github.com/haruaki07/phosphor-svelte) ▲ Phosphor icons for Svelte apps
- [phosphor-r](https://github.com/dreamRs/phosphoricons) ▲ Phosphor icon wrapper for R documents and applications
- [blade-phosphor-icons](https://github.com/codeat3/blade-phosphor-icons) ▲ Phosphor icons in your Laravel Blade views
- [wordpress-phosphor-icons-block](https://github.com/robruiz/phosphor-icons-block) ▲ Phosphor icon block for use in WordPress v5.8+
- [ruby-phosphor-icons](https://github.com/maful/ruby-phosphor-icons) ▲ Phosphor icons for Ruby and Rails applications

If you've made a port of Phosphor and you want to see it here, just open a PR [here](https://github.com/phosphor-icons/homepage)!

## License

MIT © [Phosphor Icons](https://github.com/phosphor-icons)
