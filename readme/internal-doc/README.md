# internal-doc
This folder contains the internal documentation for the Studiö Web Components.

## Browser Support
The code base produces JavaScript code in ES2019, from TypeScript. In addition, the code base relies on native support of Web Components in the browser, and does not include polyfills for other browsers.

The Web Components are delivered as ES modules. 

Only up-to-date, modern evergreen browsers are supported, meaning:
- Recent Chrome (OSX, Linux, Win, Android, iOS)
- Recent Safari (OSX, iOS)
- Recent FireFox (Win, Linux)
- Recent chromium based new Edge (Win, OSX)
- Recent Samsung Internet browser (Android)

Testing on all these platforms is not yet rigourous, so please report issues happening under the above environments.

## Folders
Source
- `css/`: CSS source code for the components.
- `src/`: TypeScript source code for the components.
- `0.0.0/`: distribution folder for a given version:
  - `doc/`: HTML + CSS + JS source for the documentation
  - `ext/`: External libraries used by the documentation
  - `index.html`: Redirection to doc landing page

Build outputs
- `lib/`: Output from TypeScript compilation.
- `0.0.0/`: distribution folder for a given version:
  - `dist/`: Output for CDN distribution
  - `dev-dist/`: Output of the debug version 

## Build
The TypeScript source code is under `src/`.

Use `npm run build` to build in watch mode and output to `lib/`.

## Serving the Documentation Locally
Start additional terminals and run `npm run build:dist` and `npm run serve`. 
- `npm run build:dist` runs in watch mode and outputs the content of the CDN distribution to `0.0.0/dist/`, using *Rollup*. This includes `.js` and `.js.br` (brotli compressed) files.
- `npm run server` starts browsersync as a server available on your local network. 

The usage documentation is then available from that endpoint and uses the local CDN distribution from `0.0.0/dist/`. 

The CDN distribution is directly usable by consumers without requiring to install the source distribution and without requiring any build tool and process. This is how the usage documentation works, as it is written in HTML + CSS + plain JavaScript in order to ensure that it is UI framework and library agnostic.

*Details*
  - See the `scripts/bundler/` folder for the Rollup configuration files.
  - The production Rollup configuration is in `rollup.config.js` and there is a `lib-options.json` file containing the options for the files to include in the library.
  - There is a corresponding `rollup.debug.config.js` and output `0.0.0/dist-dev/` folder, for distribution of the library without minification and compression.

## Publication of the CDN and NPM Distributions
Publication of the CDN distribution and the NPM distribution are managed privately by the maintainers of Studiö.

## Language, Libraries and Tools
Transpiler:
- [TypeScript](https://www.typescriptlang.org/). `npm install -g typescript`.

Libraries:
- [Lit](https://lit.dev/) provides support for building Web Components.

Tools:
- TypeScript (assuming you install globally)
- Rollup, installed from package.json. Used to build the CDN distribution.
- browser-sync, installed from package.json. Used to test the doc.
- http-server, installed from package.json (or you can use your prefered local server). Alternative to test the doc.

## Other Dependencies
Apart from Lit, there is no other dependency as this time.