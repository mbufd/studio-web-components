import { ComboColorPicker } from './color-picker.js';

export class Example {
    static _colorPicker = null;
    static run() {
        if (Example._colorPicker === null) {
            Example._colorPicker = new ComboColorPicker();
            Example.watchUIKitExampleShow();
        }
    }

    /**
     * We are using UIKit for UI controls in the documentation.
     * Initialize only once the Example tab has shown.
     */
    static watchUIKitExampleShow() {
        const sliderExampleId = 'slider-example';
        UIkit.util.on(`#${sliderExampleId}`, 'shown', (event) => {
            if (event.target.id == sliderExampleId) {
                // The Example tab was selected, reset color to default
                Example._colorPicker.reset();
            }
        });
        UIkit.util.on(`#${sliderExampleId}`, 'hidden', (event) => {
            if (event.target.id == sliderExampleId) {
                // When hidden
            }
        });
    }
}