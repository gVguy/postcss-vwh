# PostCSS vwh ![github workflow status](https://github.com/gVguy/postcss-vwh/actions/workflows/node.js.yml/badge.svg) [![travis ci build status](https://travis-ci.com/gVguy/postcss-vwh.svg?branch=master)](https://travis-ci.com/gVguy/postcss-vwh)

[PostCSS] plugin that adds support for *vwh* unit.

[PostCSS]: https://github.com/postcss/postcss

```css
/* Input example */

div {
    width: 50vwh
}
```

```css
/* Output example */

@media (orientation:landscape) {
    div {
        width: 50vh
    }
}
@media (orientation:portrait) {
    div {
        width: 50vw
    }
}
```

## Why

*vwh* can help naturally create responsive elements that retain their proportions and evenly scale with the viewport regardless of its orientation.

![example of a responsive square box created with even height and width parameters of 60vwh](https://media.giphy.com/media/DGgKNNZtFaHu2kLnke/giphy.gif)


## Usage

**Step 1:** Install plugin:

```sh
npm install --save-dev postcss postcss-vwh
```

**Step 2:** Check you project for existed PostCSS config: `postcss.config.js`
in the project root, `"postcss"` section in `package.json`
or `postcss` in bundle config.

If you do not use PostCSS, add it according to [official docs]
and set this plugin in settings.

**Step 3:** Add the plugin to plugins list:

```diff
module.exports = {
  plugins: [
+   require('postcss-vwh'),
    require('autoprefixer')
  ]
}
```

[official docs]: https://github.com/postcss/postcss#usage
