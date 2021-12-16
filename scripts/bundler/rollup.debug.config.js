/**
 * Rollup of the CDN distribution (debug)
 * Input files are specified in lib-options.json
 */
import resolve from '@rollup/plugin-node-resolve';
import { getCommonConfig } from './rollup-common';
const config = getCommonConfig('debug');

config.plugins = [
    resolve({ // Resolve bare module specifiers to relative paths
        exportConditions: ['development'] // See: https://lit.dev/docs/tools/development/
      }),         
    ...config.plugins
];

export default config;