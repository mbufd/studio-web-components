import { html } from 'lit';
import { styleMap } from 'lit/directives/style-map.js';
import { customElement, property } from 'lit/decorators.js';
import { StudioLitElement } from '../common/studio-lit-element';
import { styles } from './axis.css';
import { BasicAxis } from './basic-axis';
import { CSSValue } from '../common/util/css-value';

/**
 * An axis with possibly two sides
 */
@customElement('studio-axis')
export class StudioAxisElement extends StudioLitElement {
    /* Styles for the component */
    static styles = styles;

    // Vertical 'v' or horizontal 'h' axis
    @property({ reflect: true })
    orientation = 'v'; // h or v

    // Minor tick marks
    @property({ attribute: 'ticks', type: String, reflect: true })
    ticks = 'lr'; // any combination of 'l', 'r' and 'c'

    // Major sections
    @property({ attribute: 'major-sections', type: Number, reflect: true })
    majorSections = 10; // <= 0 means no rendering of the axis
    // Minor sections
    @property({ attribute: 'minor-sections', type: Number, reflect: true })
    minorSections= 5; // <= 0 means no minor tick marks

    // Major tick mark weight
    @property({ attribute: 'major-weight', type: Number, reflect: true })
    majorWeight = 1; // px
    // Minor tick mark weight
    @property({ attribute: 'minor-weight', type: Number, reflect: true })
    minorWeight = 1; // px

    // Major mark length
    _majorLength = '33%';
    _majorLengthValue = CSSValue.fromCSSString(this._majorLength);
    @property({ attribute: 'major-length', type: String, reflect: true })
    get majorLength() { return this._majorLength; }
    set majorLength(value) {
        const parsedValue = CSSValue.fromCSSString(value);
        if (parsedValue) {
            this._majorLengthValue = parsedValue;
            this.setPropertyValue('_majorLength', 'major-length', value);
        }
    }
    // Minor mark length
    _minorLength = '20%';
    _minorLengthValue = CSSValue.fromCSSString(this._minorLength);
    @property({ attribute: 'minor-length', type: String, reflect: true })
    get minorLength() { return this._minorLength; }
    set minorLength(value) {
        const parsedValue = CSSValue.fromCSSString(value);
        if (parsedValue) {
            this._minorLengthValue = parsedValue;
            this.setPropertyValue('_minorLength', 'minor-length', value);
        }
    }

    // Minor tick marks
    @property({ attribute: 'rounded-ticks', type: Boolean, reflect: true })
    roundedTicks = false;

    // Fit
    _fit = false;
    @property({ attribute: 'fit', type: Boolean, reflect: true })
    get fit() { return this._fit; }
    set fit(value) {
        this.style.width = '100%';
        this.style.height = '100%';
        this.setPropertyValue('_fit', 'fit', value);
    }

    /**
     * Get ready
     */
    constructor() {
        super();
        // Render when the axis size changes (including the first time around)
        // See: https://codelabs.developers.google.com/codelabs/lit-brick-viewer#3
        new ResizeObserver((_) => { 
            this.requestUpdate(); 
        }).observe(this);
    }

    /**
     * render
     */ 
    render() {
        // Guard for cases where size of axis is not yet known
        if (this.clientHeight > 0 && this.clientWidth > 0) {
            // Special axis styling if asked to fit
            const surfaceStyles = this.fit ? { width: '100%', height: '100%' } : {};
            // Render the tick marks as SVG
            const svgTemplate = this.renderAxisTemplate();
            // Render the axis with its tick marks
            return html`
              <div id="surface" part="surface" style=${styleMap(surfaceStyles)}>${svgTemplate}</div>
            `;
        }
        return html``; // No valid size yet, can't render anything meaningful yet
    }

    /** 
     * Updates the axis template based on current state
     */
    private renderAxisTemplate() {
        // Guard for cases where size of axis is not yet not
        if (this.clientWidth > 0 && this.clientHeight > 0) {
            // Configure tick visibility
            let leftSideTicks = false;
            let rightSideTicks = false;
            let centerTicks = false;
            for (let i = 0; i < this.ticks.length; i++) {
                switch (this.ticks.charAt(i)) {
                    case 'l': leftSideTicks = true; break;
                    case 'r': rightSideTicks = true; break;
                    case 'c': centerTicks = true; break;
                }
            }
            // Use current state
            const axis = new BasicAxis();
            axis.options = {
                width: this.clientWidth,
                height: this.clientHeight,
                vertical: this.orientation === 'v',
                majorSections: this.majorSections,
                minorSections: this.minorSections,
                majorMark: {
                    length: this._majorLengthValue,
                    weight: this.majorWeight,
                    rounded: this.roundedTicks
                },
                minorMark: {
                    length: this._minorLengthValue,
                    weight: this.minorWeight,
                    rounded: this.roundedTicks
                },
                rightSideTicks: rightSideTicks,
                leftSideTicks: leftSideTicks,
                centerTicks: centerTicks
            };
            // Render
            return axis.render();
        }
        return html``;
    }
}

// Make it easy to use from Typescript
declare global { interface HTMLElementTagNameMap { 'studio-axis': StudioAxisElement } }