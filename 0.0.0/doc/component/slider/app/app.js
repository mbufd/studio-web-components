import { getSampleCode } from './sample-code.js';
import { SiteCodeHighlight } from '../../../site.js';
import { Example } from './example/example.js';

function toFixed(value, fixed) {
    return parseFloat(value.toFixed(fixed));
}

class LedLabelDemo {
    _slider;
    _led;
    constructor() {
        this._slider = document.querySelector(`#led-label-slider`);
        this._led = document.querySelector(`#led-label`);
        this._led.on = !this._slider.value == 0;
        this._slider.addEventListener('studio-slider-value', (event) => {
            this._led.normalizedIntensity = event.studio.value;
            this._led.on = !event.studio.value == 0;
        });
    }
}

class LedContentDemo {
    _slider;
    _leds = [];
    constructor() {
        this._slider = document.querySelector(`#led-slider`);
        for (let i = 0; i < 10; i++) {
            const led = document.querySelector(`#led${i}`);
            // LEDs get more intense towards the right end
            led.normalizedIntensity = i / 10;
            this._leds.push(led);
        }
        this._slider.addEventListener('studio-slider-value', (event) => {
            const value = event.studio.value * 10;
            for (let i = 0; i < 10; i++) {
                const led = this._leds[i];
                // Only on when left of cursor
                led.on = i <= value;
            }
        });
    }
}

class ValueEventDemo {
    constructor() {
        const slider = document.querySelector(`#value-event-slider`);
        const label = document.querySelector(`#value-event-label`);
        // Set initial value of label
        label.innerHTML = slider.value;
        // Watch for value changes
        slider.addEventListener('studio-slider-value', (event) => {
            label.innerHTML = event.studio.value;
        });
    }
}

class BoundsEventDemo {
    constructor() {
        let offset = 0;
        const slider = document.querySelector(`#bounds-event-slider`);
        const start = document.querySelector(`#start-bound-event-label`);
        const end = document.querySelector(`#end-bound-event-label`);
        // Set initial label values
        start.innerHTML = slider.startValue;
        end.innerHTML = slider.endValue;
        // Watch for value changes
        slider.addEventListener('studio-slider-bounds', (event) => {
            start.innerHTML = event.studio.startValue;
            end.innerHTML = event.studio.endValue;
        });
        // Generate bounds changes in a loop
        setInterval(() => {
            offset = (offset + 1) % 20;
            slider.startValue = offset;
            slider.endValue = 100 - offset;
        }, 500);
    }
}

class ValueLabelBinder {
    constructor(kind) {
        this._slider = document.querySelector(`#${kind}-slider`);
        this._label = document.querySelector(`#${kind}-label`);
        this._label.innerHTML = this._slider.value;
        this._slider.addEventListener('studio-slider-value', (event) => {
            this._label.innerHTML = event.studio.value;
        });
    }
    get slider() {
        return this._slider;
    }
}

class BoundsDemo {
    constructor(kind, lowBound, highBound) {
        this._valueLowBound = document.querySelector('#value-low-bound-label');
        this._valueHighBound = document.querySelector('#value-high-bound-label');
        this._lowBoundValue = new ValueLabelBinder(lowBound);
        this._highBoundValue = new ValueLabelBinder(highBound);
        this._valueSlider = new ValueLabelBinder(kind);
        // Set initial bounds
        this._valueSlider.slider.startValue = this._lowBoundValue.slider.value;
        this._valueSlider.slider.endValue = this._highBoundValue.slider.value;
        // Update bounds labels for the value
        this._lowBoundValue.slider.addEventListener('studio-slider-value', (event) => {
            const lowBound = event.studio.value;
            this._valueSlider.slider.startValue = lowBound;
            this._valueLowBound.innerHTML = lowBound;
        });
        this._highBoundValue.slider.addEventListener('studio-slider-value', (event) => {
            const highBound = event.studio.value;
            this._valueSlider.slider.endValue = highBound;
            this._valueHighBound.innerHTML = highBound;

        });
        // Labels above the value slider
        this._valueLowBound.innerHTML = this._lowBoundValue.slider.value;
        this._valueHighBound.innerHTML = this._highBoundValue.slider.value;
    }
}

export class App {
    static async load() {
        getSampleCode().then((sampleCode) => {
            SiteCodeHighlight.setCodeSamples(sampleCode);
        });

        new ValueLabelBinder('v');
        new ValueLabelBinder('h');
        new ValueLabelBinder('bounds');
        new ValueLabelBinder('bounds-v');
        new ValueLabelBinder('inverted-bounds-v');
        new BoundsDemo('value-for-bounds', 'low-bound', 'high-bound');
        new ValueLabelBinder('min-size-cursor');
        new ValueLabelBinder('special-size-cursor');
        new ValueLabelBinder('max-size-cursor');
        new ValueEventDemo();
        new BoundsEventDemo();
        new LedContentDemo();
        new LedLabelDemo();
        new ValueLabelBinder('step');
        new ValueLabelBinder('step-int');

        Example.run();
    }
}
