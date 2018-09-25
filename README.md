# PostCSS Replace [![Build Status][ci-img]][ci]

[PostCSS] plugin to replace content with mappers

[PostCSS]: https://github.com/postcss/postcss
[ci-img]:  https://travis-ci.org/pzforever10@gmail.com/postcss-replacer.svg
[ci]:      https://travis-ci.org/pzforever10@gmail.com/postcss-replacer

```css
// input content 
.foo {
  src: url(abc);
  src: url(123414)
}
```

```javascript
// in your postcss config file, for example .postcssrc.js
module.exports = {
  plugins: {
    "postcss-replacer": {
      mappers: [
        {
          source: 'abc',
          target: 'def'
        },
        {
          source: /\d+/,
          target: 'xyz'
        }
      ]
    }
  }
}
```

```css
.foo {
  src: url(def);
  src: url(xyz);
}
```

## Usage

```js
postcss([ require('postcss-replace') ])
```

See [PostCSS] docs for examples for your environment.
