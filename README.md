<img src="/meta/phosphor-mark-tight-yellow.png" width="128" align="right" />

# phosphor-icons

Phosphor is a flexible icon family for interfaces, diagrams, presentations — whatever, really. Explore all our icons at [phosphoricons.com](https://phosphoricons.com).

[![NPM](https://img.shields.io/npm/v/phosphor-icons.svg?style=flat-square)](https://www.npmjs.com/package/phosphor-icons) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg?style=flat-square)](https://standardjs.com) [![Travis](https://img.shields.io/travis/com/rektdeckard/phosphor-icons.svg?style=flat-square)](https://travis-ci.com/github/rektdeckard/phosphor-icons)

[![GitHub stars](https://img.shields.io/github/stars/phosphor-icons/phosphor-icons?style=flat-square&label=Star)](https://github.com/phosphor-icons/phosphor-icons)
[![GitHub forks](https://img.shields.io/github/forks/phosphor-icons/phosphor-icons?style=flat-square&label=Fork)](https://github.com/phosphor-icons/phosphor-icons/fork)
[![GitHub watchers](https://img.shields.io/github/watchers/phosphor-icons/phosphor-icons?style=flat-square&label=Watch)](https://github.com/phosphor-icons/phosphor-icons)
[![Follow on GitHub](https://img.shields.io/github/followers/rektdeckard?style=flat-square&label=Follow)](https://github.com/rektdeckard)

## Usage

### Getting Started

We use a similar approach as many other icon sets out there, providing icons as a webfont that uses Unicode's Private Use Area character codes to map normally non-rendering characters to icons. But you don't need to know that. All you need to do is add the script to the document `<head>`, and drop in icons with an `<i/>` tag and the appropriate class:

```html
<!DOCTYPE html>
<html>
  <head>
    <script src="https://unpkg.com/phosphor-icons"></script>
  </head>
  <body>
    <i class="ph-smiley"></i>
    <i class="ph-heart-fill" style="color: hotpink"></i>
    <i class="ph-cube-thin"></i>
  </body>
</html>
```

> **Note:** For stability, you may choose to source a specific version of Phosphor by adding the version to the script URL, for example: `https://unpkg.com/phosphor-icons@1.3.2`. The CDN supports version ranges.

### Styling

Since the icons are just text under the hood, they can be colored and styled with CSS like any other font, including `font-size`, `color`, etc. We include several helper classes to provide easy sizing if you need it:

```css
.ph-xxs {
  font-size: 0.5em;
}
.ph-xs {
  font-size: 0.75em;
}
.ph-sm {
  font-size: 0.875em;
}
.ph-lg {
  font-size: 1.3333em;
  line-height: 0.75em;
  vertical-align: -0.0667em;
}
.ph-xl {
  font-size: 1.5em;
  line-height: 0.6666em;
  vertical-align: -0.075em;
}
.ph-1x {
  font-size: 1em;
}
.ph-2x {
  font-size: 2em;
}
.ph-3x {
  font-size: 3em;
}
.ph-4x {
  font-size: 4em;
}
.ph-5x {
  font-size: 5em;
}
.ph-6x {
  font-size: 6em;
}
.ph-7x {
  font-size: 7em;
}
.ph-8x {
  font-size: 8em;
}
.ph-9x {
  font-size: 9em;
}
.ph-10x {
  font-size: 10em;
}
.ph-fw {
  text-align: center;
  width: 1.25em;
}
```

> **Note:** Overriding the `font-family`, `font-style`, `font-weight`, `font-variant`, or `text-transform` may break the icons and render unprintable characters. Don't do it.

> **Note:** The `duotone` weight is not yet available for this implementation, as fonts do not support baked-in alpha/opacity. In future we plan to move to an SVG-based approach with full support for all icon weights.

### Ligatures

The icon font now supports ligatures, meaning that in any text using `font-family: "Phosphor"`, writing the name of an icon (without the `ph-` prefix) will convert to the corresponding icon. The largest possible string will be matched, meaning you can use any available weight, and print multiple icons without separating with spaces or other characters if you choose.

```html
<!DOCTYPE html>
<html>
  <head>
    <script src="https://unpkg.com/phosphor-icons"></script>
  </head>
  <body>
    <!-- Renders as sword and shield icons -->
    <p style="font-family: Phosphor">sword-fill shield</p>
  </body>
</html>
```

## Our Related Projects

- [phosphor-home](https://github.com/phosphor-icons/phosphor-home) ▲ Phosphor homepage and general info
- [phosphor-react](https://github.com/phosphor-icons/phosphor-react) ▲ Phosphor icon component library for React
- [phosphor-vue](https://github.com/phosphor-icons/phosphor-vue) ▲ Phosphor icon component library for Vue
- [phosphor-flutter](https://github.com/phosphor-icons/phosphor-flutter) ▲ Phosphor IconData library for Flutter
- [phosphor-webcomponents](https://github.com/phosphor-icons/phosphor-webcomponents) ▲ Phosphor icons as Web Components
- [phosphor-figma](https://github.com/phosphor-icons/phosphor-figma) ▲ Phosphor icons Figma plugin
- [phosphor-sketch](https://github.com/phosphor-icons/phosphor-sketch) ▲ Phosphor icons Sketch plugin

## Community Projects

- [phosphor-react-native](https://github.com/duongdev/phosphor-react-native) ▲ Phosphor icon component library for React Native
- [phosphor-svelte](https://github.com/haruaki07/phosphor-svelte) ▲ Phosphor icons for Svelte apps
- [phosphor-r](https://github.com/dreamRs/phosphoricons) ▲ Phosphor icon wrapper for R documents and applications
- [blade-phosphor-icons](https://github.com/codeat3/blade-phosphor-icons) ▲ Phosphor icons in your Laravel Blade views

If you've made a port of Phosphor and you want to see it here, just open a PR [here](https://github.com/phosphor-icons/phosphor-home)!

## License

MIT © [Phosphor Icons](https://github.com/phosphor-icons)
