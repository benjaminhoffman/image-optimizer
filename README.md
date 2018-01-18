Yet another image compression & resizing node module.

### Using sharp library, this module will:
- strip your image of its metadata
- compress it for web rendering
- resize it to 4 other smaller sizes so you can have faster mobile websites

### Get Started

Manually create this file: `dist/manifest.json` with an empty object `{}`

Accepts two parameters:
- file path
- options object

```javascript
const imageOptimizer = require('image-optimizer')

imageOptimizer(
  './example.png', // assuming this file is 2232px x 1286px
  { webp: true })  // default false; will also generate webp version of the image
```

^^ this will output the following compressed png files:
- example_2232w_23699b50.png
- example_1116w_23699b50.png
- example_744w_23699b50.png
- example_558w_23699b50.png
- example_446w_23699b50.png

...and these compressed webp files:
- example_2232w_23699b50.webp
- example_1116w_23699b50.webp
- example_744w_23699b50.webp
- example_558w_23699b50.webp
- example_446w_23699b50.webp

### To Do
- error handling
- logging
- linter
- resize count is hard coded to 5, we should make this more dynamic