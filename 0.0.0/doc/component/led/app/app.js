import { getSampleCode } from './sample-code.js';
import { StudioLedElement } from '../../../studio.js';
import { SiteCodeHighlight } from '../../../site.js';
import { Example } from './example/example.js';

class LEDDemo {
    static start() {
        this.demoElement = document.querySelector('#demo');
        if (this.demoElement) {
            for (let i = 0; i < 10; i++) {
                const ledElement = new StudioLedElement();
                ledElement.style = 'margin-left: 5px;';
                ledElement.classList.add('demo-led');
                ledElement.classList.add('size-m');
                ledElement.minIntensity = 100;
                ledElement.maxIntensity = 180;
                ledElement.size = 'm';
                ledElement.normalizedIntensity = i / 10;
                this.demoElement.appendChild(ledElement);
            }
            LEDDemo.animateDemo(this.demoElement.childNodes.length - 1);
        }
    }
    static animateDemo(index) {
        if (this.demoElement && this.demoElement.children.length > index) {
            if (this.demoElement.children[index].hasAttribute('on')) {
                this.demoElement.children[index].removeAttribute('on');
            }
            index = (index + 1) % this.demoElement.children.length;
            this.demoElement.children[index].setAttribute('on', true);
        }
        setTimeout(() => {
            LEDDemo.animateDemo(index);
        }, 100);
    }
}

class ClickableDemo {
    static run() {
        window.ledClickHandler = () => {
            const clickableLed = document.querySelector('#clickable');
            clickableLed.on = !clickableLed.on;
        };
    }
}

export class App {
    static async load() {
        getSampleCode().then((sampleCode) => {
            SiteCodeHighlight.setCodeSamples(sampleCode);
        });
        LEDDemo.start();
        Example.run();
        ClickableDemo.run();
    }
}