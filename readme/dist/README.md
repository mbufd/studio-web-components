# Studiö Web Components - CDN Distribution
The CDN distribution under the `dist` folder is suitable for direct use of the components HTML + CSS + plain JavasCript, using `<scritp>` and `import` of ES modules, without requiring any build process or framework.

- Note: this distribution is useful for trying out the components as well as for simple or declarative-only applications
written in JavaScript. 
- Note: if instead you use TypeScript, Angular, Vue.js, React or otherwise want or need to bundle the components with your application, please see the note about the NPM package below.

### IMPORTANT: Requirements
The Studiö Web Components are avalable only for use in recent versions of evergreen modern browsers supporting ES2019.
This means recent versions of Chrome, Safari, Firefox, chromium based Edge, and Samsung Internet browser.

### Usage Documentation
Please refer to the [official documentation](https://studio.frontdynamics.com/) for setup and usage of the Studiö Web Components.

There is an NPM package for bundling the Studiö Web Components as part of your application, 
please refer to the [official documentation](https://studio.frontdynamics.com/) under Integration for details.

## Compression
The distribution comes in two flavors: 
- Minified ES modules, distributed as `.js` files.
- Minified and compresseed ES modules, distributed as `.js.br`files. The `.br` extension indicates that the `.js` files is compressed using `brotli`.

In order to use the compressed files, you must enable serving `brotli` compressed files on your server. To serve the non-compressed distribution, do not enable brotli in your server (or remove the `.js.br` files from your copy of the distribution). 

Brotli is supported by the evergreen modern browsers.

In any case, you only need to refer to the `.js` files from your HTML and JS/TS code. This is because the browser will turn your `.js.br` file into a `.js` file for your code to use.