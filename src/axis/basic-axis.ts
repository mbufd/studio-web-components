import { svg, html, TemplateResult } from 'lit';
import { AxisOptions } from './axis-interfaces';

/**
 * A basic axis rendered as SVG.
 */
export class BasicAxis {
    private static _roundTo = 2;
    public _options: AxisOptions | null = null;

    // Options
    get options() { return this._options; }
    set options(value) { this._options = value; } // null value will disable rendering

    /**
     * Renders the axis
     * @returns The SVG template for the axis, or an empty html template if no option is set
     */
    render(): TemplateResult {
        return this._options ? this.renderMarks() : html``;
    }

    /**
    * Implementation renders major marks for the axis and minor marks for each major section.
    */

    // Render all major sections
    private renderMarks(): TemplateResult {
        let width = 1;
        let height = 1;
        // Accumulated svg path deltas
        let majorDeltas = '';
        let minorDeltas = '';

        const markWeight = this._options.majorMark.weight;

        if (this._options.majorSections > 0 && this._options.width > 0 && this._options.height > 0) {
            width = this._options.width;
            height = this._options.height;

            // Parameters
            const numMarks = this._options.majorSections + 1;
            const thickness = this._options.vertical ? this._options.width : this._options.height;
            const markLength = this._options.majorMark.length.unit == '%' ? thickness * (this._options.majorMark.length.value / 100) : this._options.majorMark.length.value;

            // Generate tick marks
            if (this._options.vertical) {
                // Vertically
                const lengthRange = this._options.height - (markWeight);
                const markSpacing = lengthRange / (numMarks - 1);
                let offset = markWeight / 2;
                for (let step = 0; step < numMarks; step++) {
                    majorDeltas += this.placeMarksVertically(offset, thickness, markLength);
                    if (step < numMarks - 1) {
                        minorDeltas += this.renderMinorTicks(offset, offset + markSpacing);
                    }
                    offset += markSpacing;
                }
            }
            else {
                // Horizontally
                const lengthRange = this._options.width - (markWeight);
                const markSpacing = lengthRange / (numMarks - 1);
                let offset = markWeight / 2;
                for (let step = 0; step < numMarks; step++) {
                    majorDeltas += this.placeMarksHorizontally(offset, thickness, markLength);
                    if (step < numMarks - 1) {
                        minorDeltas += this.renderMinorTicks(offset, offset + markSpacing);
                    }
                    offset += markSpacing;
                }

            }
        }
        // SVG path for major marks
        let linecap = this._options.majorMark.rounded ? 'round' : 'square';
        const majorPath = svg`<path class="major-marks" d="${majorDeltas}" stroke-width="${markWeight}" stroke-linecap="${linecap}"/>`;
        // SVG path for minor marks
        linecap = this._options.minorMark.rounded ? 'round' : 'square';
        const minorPath = svg`<path class="minor-marks" d="${minorDeltas}" stroke-width="${this._options.minorMark.weight}" stroke-linecap="${linecap}"/>`;
        // SVG combining major and minor paths
        const renderedSvg = svg`<svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">${majorPath} ${minorPath}</svg>`;
        return renderedSvg;
    }

    // Renders all minor marks within a major section
    private renderMinorTicks(from: number, to: number) {
        let minorDeltas = '';

        if (this._options.minorSections > 0 && this._options.minorMark.length.value > 0) {
            // Parameters
            const numMarks = this._options.minorSections - 1;
            const lengthRange = to - from;
            const markSpacing = lengthRange / (numMarks + 1);
            const thickness = this._options.vertical ? this._options.width : this._options.height;
            const markLength = this._options.minorMark.length.unit == '%' ? thickness * (this._options.minorMark.length.value / 100) : this._options.minorMark.length.value;

            // Generate tick marks
            if (this._options.vertical) {
                let offset = from + markSpacing;
                for (let step = 0; step < numMarks; step++) {
                    minorDeltas += this.placeMarksVertically(offset, thickness, markLength);
                    offset += markSpacing;
                }
            }
            else {
                let offset = from + markSpacing;
                for (let step = 0; step < numMarks; step++) {
                    minorDeltas += this.placeMarksHorizontally(offset, thickness, markLength);
                    offset += markSpacing;
                }
            }
        }

        return minorDeltas;
    }

    // Places left, right and center marks vertically at the specifid offset
    private placeMarksVertically(offset: number, thickness: number, markLength: number) {
        const markSizeRounded = markLength.toFixed(BasicAxis._roundTo);
        const yRounded = offset.toFixed(BasicAxis._roundTo);
        // Left
        const leftSide = this._options.leftSideTicks ? `M ${0} ${yRounded} h ${markSizeRounded}` : '';
        let xRounded = (thickness - markLength).toFixed(BasicAxis._roundTo);
        // Right
        const rightSide = this._options.rightSideTicks ? `M ${xRounded} ${yRounded} h ${markSizeRounded}` : '';
        xRounded = ((thickness / 2) - (markLength / 2)).toFixed(BasicAxis._roundTo);
        // Center
        const center = this._options.centerTicks ? `M ${xRounded} ${yRounded} h ${markSizeRounded}` : '';
        // Combined
        return ` ${rightSide} ${leftSide} ${center}`;
    }

    // Places left, right and center marks horizontally at the specifid offset
    private placeMarksHorizontally(offset: number, thickness: number, markLength: number) {
        const markSizeRounded = markLength.toFixed(BasicAxis._roundTo);
        const xRounded = offset.toFixed(BasicAxis._roundTo);
        // Left
        const y = thickness - markLength;
        let yRounded = y.toFixed(BasicAxis._roundTo);
        const leftSide = this._options.leftSideTicks ? `M ${xRounded} ${0} v ${markSizeRounded}` : '';
        // Right
        const rightSide = this._options.rightSideTicks ? `M ${xRounded} ${yRounded} v ${markSizeRounded}` : '';
        yRounded = (y - (thickness / 2) + (markLength / 2)).toFixed(BasicAxis._roundTo);
        // Center
        const center = this._options.centerTicks ? `M ${xRounded} ${yRounded} v ${markSizeRounded}` : '';
        // Combined
        return ` ${rightSide} ${leftSide} ${center}`;
    }
}