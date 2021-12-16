import summary from 'rollup-plugin-summary';
import copy from 'rollup-plugin-copy';

/**
 * Returns a config that is common to the debug and prod stages
 */
export function getCommonConfig(stage) {
    // Public vs development distributions
    const root = '0.0.0/'; // Version number placeholder for the output
    const distribution = stage == 'prod' ? `${root}dist` : `${root}dev-dist`;
    // Non prod distributions have a subfolder for the stage
    const destination = stage == 'prod' ? distribution : `${distribution}/${stage}`;

    // Config options that are common to all stages
    // Set rollup options here: https://rollupjs.org/guide/en/#big-list-of-options
    return {
        plugins: [
            summary(),
            copy({
                targets: [
                    { src: 'src/css/**/*.css', dest: `${distribution}/css` }, // CSS
                    { src: 'readme/dist/README.md', dest: distribution }      // Help for user of the distribution
                ]
            }) 
        ],
        output: {
            format: 'es', // ES Module output, See: https://rollupjs.org/guide/en/#outputformat
            dir: destination,
            generatedCode: 'es2015',
        },
        preserveEntrySignatures: 'strict', // See: https://lit.dev/docs/tools/production/
        preserveModules: true // Do not aggregate modules together: https://rollupjs.org/guide/en/#outputpreservemodules
    };
}