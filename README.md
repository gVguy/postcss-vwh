# PostCSS vwh

[PostCSS] plugin adds support for vwh unit.

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
