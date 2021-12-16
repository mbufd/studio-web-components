/**
 * Rollup of the CDN distribution (prod)
 * Input files are specified in lib-options.json
 */
import resolve from '@rollup/plugin-node-resolve';
import { terser } from 'rollup-plugin-terser';
import minifyHTML from 'rollup-plugin-minify-html-literals';
import brotli from "rollup-plugin-brotli";

import { getCommonConfig } from './rollup-common';
const config = getCommonConfig('prod');

config.plugins = [
    resolve(),         // Resolve bare module specifiers to relative paths
    ...config.plugins,
    minifyHTML(),      // Minify HTML template literals
    terser({           // Minify Javascript
        ecma: 2019,    //  Target
        module: true,  //  ES modules
        warnings: true //
    }),
    brotli(),
];

export default config;