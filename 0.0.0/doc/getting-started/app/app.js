import { sampleCode } from './sample-code.js';
import { SiteCodeHighlight } from '../../site.js';

export class App {
    static async load() {
        SiteCodeHighlight.setCodeSamples(sampleCode);
        App.addElements();
    }

    static addElements() {
        const containerElement = document.querySelector('#container');
        const labelElement = document.createElement('studio-label');
        labelElement.innerHTML = 'LABEL';
        containerElement.appendChild(labelElement);
    }
}
