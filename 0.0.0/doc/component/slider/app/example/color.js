/**
 * A simple color class with RGB, HSL and HSV spaces and conversions
 */

// Hue with conversion from RGB
class Hue {
    // h is between 0 and 1
    h = 0;
    // r, g and b are directly between 0 and 255
    fromRgb(r, g, b) {
        const max = Math.max(r, g, b);
        const min = Math.min(r, g, b);
        const delta = max - min;
        // Set hue
        if (max === min) {
            this.h = 0;
            return;
        }
        switch (max) {
            case r: this.h = (g - b) + delta * (g < b ? 6 : 0);
                break;
            case g: this.h = (b - r) + delta * 2;
                break;
            case b: this.h = (r - g) + delta * 4;
                break;
        }
        this.h /= 6 * delta;
    }
}

// Hue Saturation Value color with conversion from/to RGB
class HSVColor extends Hue {
    s = 0;
    v = 0;
    // r, g and b are between 0 and 255
    fromRgb(r, g, b) {
        // Compute hue
        super.fromRgb(r, g, b);
        // Compute span
        const max = Math.max(r, g, b);
        const min = Math.min(r, g, b);
        const delta = max - min;
        // Set saturation and value
        this.s = (max === 0 ? 0 : delta / max);
        this.v = max / 255;
    }
    toRgb() {
        let r;
        let g;
        let b;
        let i = Math.floor(this.h * 6);
        let f = this.h * 6 - i;
        let p = this.v * (1 - this.s);
        let q = this.v * (1 - f * this.s);
        let t = this.v * (1 - (1 - f) * this.s);
        switch (i % 6) {
            case 0: r = this.v; g = t; b = p;
                break;
            case 1: r = q; g = this.v; b = p;
                break;
            case 2: r = p; g = this.v; b = t;
                break;
            case 3: r = p; g = q; b = this.v;
                break;
            case 4: r = t; g = p; b = this.v;
                break;
            case 5: r = this.v; g = p; b = q;
                break;
        }
        return { r: r * 255, g: g * 255,  b: b * 255 }
    }
}

// Hue Saturation Lightness color with conversion from/to RGB
class HSLColor extends Hue {
    // h, s and l normalized between 0 and 1
    s = 0
    l = 0;
    // r, g and b are between 0 and 255
    fromRgb(r, g, b) {
        // Compute hue
        super.fromRgb(r, g, b);
        // Normalize r,g,b between 0 and 1
        r /= 255;
        g /= 255;
        b /= 255;
        // Find greatest and smallest channel values
        let cmin = Math.min(r, g, b);
        let cmax = Math.max(r, g, b);
        let delta = cmax - cmin;
        // Calculate lightness and saturation
        this.l = (cmax + cmin) / 2;
        this.s = delta == 0 ? 0 : delta / (1 - Math.abs(2 * this.l - 1));
    }
    toRgb() {
        const h = this.h * 360;
        const c = (1 - Math.abs(2 * this.l - 1)) * this.s;
        const x = c * (1 - Math.abs((h / 60) % 2 - 1));
        const m = this.l - c / 2;
        let r = 0;
        let g = 0;
        let b = 0;
        if (0 <= h && h < 60) {
            r = c; g = x; b = 0;
        } else if (60 <= h && h < 120) {
            r = x; g = c; b = 0;
        } else if (120 <= h && h < 180) {
            r = 0; g = c; b = x;
        } else if (180 <= h && h < 240) {
            r = 0; g = x; b = c;
        } else if (240 <= h && h < 300) {
            r = x; g = 0; b = c;
        } else if (300 <= h && h < 360) {
            r = c; g = 0; b = x;
        }
        return { r: Math.round((r + m) * 255), g: Math.round((g + m) * 255), b: Math.round((b + m) * 255)
        }
    }
}

/**
 * Color class with RGB, HSV and HSL models
 */
export class Color {
    _r = 0; // Red 0 to 255
    _g = 0; // Green 0 to 255
    _b = 0; // Blue 0 to 255
    _hsv = new HSVColor(); // HSV
    _hsl = new HSLColor(); // HSL

    constructor(r=0, g=0, b=0) {
        this.setFromRgb(r, g, b);
    }

    /**
    * HEX
    */
    toHex() {
        const rgb = (this._r << 16) | (this._g << 8) | (this._b << 0);
        const hex = '#' + (0x1000000 + rgb).toString(16).slice(1);
        return hex.toUpperCase();
    }
    /**
     * RGB
     */
    get r() { return this._r; }
    get g() { return this._g; }
    get b() { return this._b; }
    setFromRgb(r, g, b) {
        this._toRgb(r, g, b);
        this._rgbToHsv();
        this._rgbToHsl();
    }
    _toRgb(r, g, b) {
        this._r = r;
        this._g = g;
        this._b = b;
    }
    /**
     * HSV
     */
    get hsv() { return this._hsv; }
    setFromHsv(h, s, v) {
        this._hsv.h = h;
        this._hsv.s = s;
        this._hsv.v = v;
        const rgb = this._hsv.toRgb();
        this._toRgb(rgb.r, rgb.g, rgb.b);
        this._rgbToHsl();
    }
    _rgbToHsv() {
        this.hsv.fromRgb(this._r, this._g, this._b);
    }
    /**
     * HSL
     */
    get hsl() { return this._hsl; }
    setFromHsl(h, s, l) {
        this._hsl.h = h;
        this._hsl.s = s;
        this._hsl.l = l;
        const rgb = this._hsl.toRgb();
        this._toRgb(rgb.r, rgb.g, rgb.b);
        this._rgbToHsv();
    }
    _rgbToHsl() {
        this.hsl.fromRgb(this._r, this._g, this._b);
    }
}
