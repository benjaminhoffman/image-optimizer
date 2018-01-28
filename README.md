Yet another image compression & resizing node module.

### Using sharp library, this module will:
- remove image metadata
- compress image for web rendering
- resize image & create new file name that includes sha1 hash

### Get Started

The `/dist/manifest.json` file will indicate to this module to skip over files that have already been processed.  It uses the `sha1` hash of the file to know how to proceed.

This module accepts one parameter: an options object

```javascript
const imageOptimizer = require('image-optimizer')

imageOptimizer({
  // also create webp versions
  // default: false
  webp: true,

  // convert file names to all lower case
  // default: false
  toLowerCase: true,

  // remove `@2x` from file name
  // (sometimes appended by Sketch and exported by your design team)
  // default: false
  remove2x: true,

  // removes spaces from file names and replaces them
  // with whatever vale you put here
  // default: false
  replaceSpaces: '-'
})
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
- [ ] get `.withoutEnlargement` to work correctly. (currently it creates an image with dimens of the largest version (ie, the original) but with a new file name representing a larger version
- [ ] only resize smaller, not larger
- [x] ability to pass in a directory, not just a file name
- [ ] option to edit the PNG and JPG compression settings
- [ ] make faster... right now we `writeFileSync` and `readFileSync` but I think this can be refactored to be async and use async/await
- [ ] write spec
- [ ] resize count is hard coded to 5, we should make this more dynamic
- [ ] error handling
- [ ] logging
- [ ] linter
- [ ] connect to a CDN

### Notes
- `.webp` files have a HUGE saving.  Use the `<picture>` element to implement
- need to review Sharp's default settings for compression