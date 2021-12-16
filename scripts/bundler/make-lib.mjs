import { exec } from 'child_process';
import fs from 'fs';

/**
 * Options file must be in the current working directory.
 * root: string - specifies root of js files, relative to current working directory
 * inputs: string[] - specifies lisst of jst files within that root
 */
console.log('make-lib.mjs', process.cwd(), '\n');

const base = process.cwd();
const path = `${base}/scripts/bundler`;

// Options
const optionsFileName = `${path}/lib-options.json`;
/**
 * The rollup config file musst be in the current working directory
 * and named rollup.config.js
 */
const rollupConfigFilename = `${path}/rollup.config.js`;
const rollupDebugConfigFilename = `${path}/rollup.debug.config.js`;
let watch = '';
const children = [];

function readBundlerOptions() {
    const jsonOptions = fs.readFileSync(optionsFileName, 'utf8');
    if (jsonOptions) {
        const options = JSON.parse(jsonOptions);
        if (options && options.root && options.inputs) {
            if (options.watch) {
                watch = '-w'
            }
            return options;
        }
    }
    console.error(`Bad ${optionsFileName} file`, options);
    return null;
}

/**
 * Bundles the js files
 */
function bundleAll() {
    const options = readBundlerOptions();
    if (options) {
        if(options.production) {
            bundle(options, rollupConfigFilename); // Production
        }
        if(options.debug) {
            bundle(options, rollupDebugConfigFilename); // Debug
        }
    }
}

function bundle(options, config) {
    const root = options.root;
    const inputFiles = options.inputs.map((value) => {
        return `${root}/${value}`;
    }).join(' ');
    const command = `rollup ${inputFiles} ${watch} -c ${config}`;
    run(command);
}

function run(command) {
    console.log(command);
    const child = exec(command, (err, stdout, stderr) => {
        if (err) {
            console.error(err);
            return;
        }
        console.log(stdout);
    });
    children.push[child];
    child.stdout.on('data', log);
    child.stderr.on('data', log);
}

function log(message) {
    console.log(message);
}

bundleAll();




