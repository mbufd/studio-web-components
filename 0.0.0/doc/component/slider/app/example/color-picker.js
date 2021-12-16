/**
 * color-picker.js
 * 
 * This example shows a combo color picker with 3 sliders for RGB 
 * and 3 sliders for HSL. 
 * 
 * For the purpose demonstrating to a wide audience
 * the example is written in plain JavaScript rather
 * than relying on any UI framwework or library.
 */
import { Color } from './color.js';

/**
 * Bundles a <studio-slider> with a <studio-label> that displays its value.
 * The HTML must have <studio-slider> elements with ids = ${channel}-slider 
 * and <studio-label> elements with ids = ${channel}-label, 
 * for instance red-slider and red-label.
 */
class SliderControl {
    constructor(channel, valueChangedCallback) {
        // <studio-slider> for this channel
        this.sliderElement = document.querySelector(`#${channel}-slider`);
        // <studio-label> for this channel
        this.labelElement = document.querySelector(`#${channel}-label`);
        // Listen to value changes on the <studio-slider>
        this.sliderElement.addEventListener('studio-slider-value', (sliderValueEvent) => {
            // Display the <studio-slider> value in the associated <studio-label>
            this.labelElement.innerHTML = sliderValueEvent.studio.value;
            // Notify consumer of change
            if (valueChangedCallback) {
                valueChangedCallback();
            }
        });
    }
    // Slider value accessors
    get value() { return this.sliderElement.value; }
    set value(value) { this.sliderElement.value = value; }
};

/**
 * A color picker with multiple channels, each controlled using a SliderControl.
 */
class MultiChannelsColorPicker {
    valueChangedCallback = null;
    _sliderControls = []; // slider controls for this model
    constructor(channels) {
        // One slider control per channel
        channels.forEach((channel) => {
            this._sliderControls.push(new SliderControl(channel, () => {
                // Notify consumer of value change on this color picker
                if (this.valueChangedCallback) {
                    this.valueChangedCallback();
                }
            }));
        });
    }
    /**
     * Set the slider values based on the provided array of values
     */
    setSliderValues(valueArray) {
        for (let i = 0; i < this._sliderControls.length; i++) {
            this._sliderControls[i].sliderElement.value = valueArray[i];
        }
    }
}

/**
 * A HSL color picker made of 3 <studio-slider> elements.
 */
class HSLColorPicker extends MultiChannelsColorPicker {
    constructor(valueChangedCallback) {
        super(['hue', 'saturation', 'lightness']);
        this.valueChangedCallback = () => {
            this.symbolizeSaturationLightness();
            valueChangedCallback();
        };
        // Initial symbolization
        this.symbolizeSaturationLightness();
    }
    // Accessors
    get hue() { return this._sliderControls[0].sliderElement.value; }
    get saturation() { return this._sliderControls[1].sliderElement.value; }
    get lightness() { return this._sliderControls[2].sliderElement.value; }
    /**
     * Called when asked to set a new color for this HSL picker. Does update the 
     * value for each of the 3 <studio-slider> elements.
     */
    setColor(color) {
        // color.hsl holds normalized values from 0 to 1, so scale them up here
        this.setSliderValues([color.hsl.h * 360, color.hsl.s * 100, color.hsl.l * 100]);
        this.symbolizeSaturationLightness();
    }
    /**
     * With HSL the Saturation is symbolized as the hue with saturation at 50% lightness
     * and the lightness is symbolized as the hue with lightness at 100% saturation.
     * Using --studio-inner-surface-color for symbolizing the color inside the
     * <studio-slider> elements for saturation and lightness.
     * The symobolization for the hue slider is handled in the CSS file.
     */
    symbolizeSaturationLightness() {
        this._sliderControls[1].sliderElement.setAttribute('style',
            `--studio-cursor-range-color: hsl(${this.hue}, ${this.saturation}%, 50%);`);
        this._sliderControls[2].sliderElement.setAttribute('style',
            `--studio-cursor-range-color: hsl(${this.hue}, 100%, ${this.lightness}%);`);
    }
}

/**
 * A RGB color picker made of 3 <studio-slider> elements.
 */
class RGBColorPicker extends MultiChannelsColorPicker {
    constructor(valueChangedCallback) {
        super(['red', 'green', 'blue']);
        this.valueChangedCallback = valueChangedCallback;
    }
    // Accessors
    get red() { return this._sliderControls[0].sliderElement.value; }
    get green() { return this._sliderControls[1].sliderElement.value; }
    get blue() { return this._sliderControls[2].sliderElement.value; }
    /**
     * Called when asked to set a new color for this RGB picker. Does update the 
     * value for each of the 3 <studio-slider> elements.
     */
    setColor(color) {
        this.setSliderValues([color.r, color.g, color.b]);
    }
}

/**
 * A combo color picker with sychronized RGB and HSL pickers
 */
export class ComboColorPicker {
    _defaultColor = new Color(50,90,130);
    // The currently picked color
    _color = new Color(this._defaultColor.r, this._defaultColor.g, this._defaultColor.b);
    // the _updating flag is to avoid propagation when synching color from a model to another
    _updating = false;

    /**
     * Create the UI controls for the combo picker
     */
    constructor() {
        // The color patch made of a <studio-label>
        this._colorPatchElement = document.querySelector(`#color-patch`);
        // The RGB slider control made of a <studio-slider> plus as <studio-label>
        this._rgbColorPicker = new RGBColorPicker(() => { this.onRGB(); });
        // The HSL slider control made of a <studio-slider> plus as <studio-label>
        this._hslColorPicker = new HSLColorPicker(() => { this.onHSL(); });
        // Set an initial color
        this.reset();
    }

    // Set an initial color
    reset() {
        this._rgbColorPicker.setColor(this._defaultColor);
    }

    /**
     * When R G or B changes, update the color accordingly and 
     * update the HSL color picker to reflect the change
     */
    onRGB() {
        if (!this._updating && this._rgbColorPicker) {
            this._updating = true;
            this._color.setFromRgb(this._rgbColorPicker.red, this._rgbColorPicker.green, this._rgbColorPicker.blue);
            this._hslColorPicker?.setColor(this._color);
            this.updateColorPatch();
            this._updating = false;
        }
    }
    /**
      * When H S or L changes, update the color accordingly and 
      * update the RGB color picker to reflect the change
      */
    onHSL() {
        if (!this._updating && this._hslColorPicker) {
            this._updating = true;
            this._color.setFromHsl(this._hslColorPicker.hue / 360, this._hslColorPicker.saturation / 100, this._hslColorPicker.lightness / 100);
            this._rgbColorPicker?.setColor(this._color);
            this.updateColorPatch();
            this._updating = false;
        }
    }
    /**
     * The color patch is a <studio-label>.
     * This updates the color patch with the current RGB value.
     */
    updateColorPatch() {
        // Adapt text color to lightness of the color patch
        const contentColor = this._color.hsl.l < .5 ? 'white' : 'black';
        // Set the color and content color of the <studio-label>
        this._colorPatchElement.setAttribute('style',
            `--studio-surface-color: rgb(${this._color.r}, ${this._color.g}, ${this._color.b}); 
             --studio-content-color: ${contentColor}`);
        // Se the text content of the <studio-label> 
        this._colorPatchElement.innerHTML = this._color.toHex();
    }
}