import { sampleCode } from './sample-code.js';
import { SiteCodeHighlight } from '../../site.js';

export class App {
    static async load() {
        SiteCodeHighlight.setCodeSamples(sampleCode);
    }
}




