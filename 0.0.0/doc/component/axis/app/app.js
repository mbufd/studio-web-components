import { getSampleCode } from './sample-code.js';
import { SiteCodeHighlight } from '../../../site.js';
import { Example } from './example/example.js';

export class App {
    static async load() {
        getSampleCode().then((sampleCode) => {
            SiteCodeHighlight.setCodeSamples(sampleCode);
            Example.run();
        });
    }
}
