import { getSampleCode } from './sample-code.js';
import { SiteCodeHighlight } from '../../../site.js';
import { PadEventListener } from './pad-event-listener.js';
import { Example } from './example/example.js';

export class App {
    static _eventListener1 = null;
    static async load() {
        getSampleCode().then((sampleCode) => {
            SiteCodeHighlight.setCodeSamples(sampleCode);
            App._eventListener1 = new PadEventListener('#pad-event');
        });
        Example.run();
    }
}
