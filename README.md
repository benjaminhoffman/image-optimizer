Yet another image compression & resizing node module.

### Using sharp library, this module will:
- strip your image of its metadata
- compress it for web rendering
- resize it to 4 other smaller sizes so you can have faster mobile websites

### Get Started

Manually create this file: `dist/manifest.json` with an empty object `{}`

This manifest file will indicate to this module to skip over files that have already been processed.  It uses the `sha1` hash of the file to know how to proceed.

This module accepts two parameters:
- file path
- options object

```javascript
const imageOptimizer = require('image-optimizer')

imageOptimizer(
  './example.png', // assuming this file is 2232px x 1286px
  { webp: true })  // default false; will also generate webp version of the image
```

^^ this will output the following compressed png files:
- `/dist/example_2232w_23699b50.png`
- `/dist/example_1116w_23699b50.png`
- `/dist/example_744w_23699b50.png`
- `/dist/example_558w_23699b50.png`
- `/dist/example_446w_23699b50.png`

...and these compressed webp files:
- `/dist/example_2232w_23699b50.webp`
- `/dist/example_1116w_23699b50.webp`
- `/dist/example_744w_23699b50.webp`
- `/dist/example_558w_23699b50.webp`
- `/dist/example_446w_23699b50.webp`

### To Do
- make faster... right now we `writeFileSync` and `readFileSync` but I think this can be refactored to be async and use async/await
- resize count is hard coded to 5, we should make this more dynamic
- error handling
- logging
- linter
- connect to a CDN