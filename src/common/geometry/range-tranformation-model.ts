/**
 * Model to transform between two value ranges
 */

// A value range
export class ValueRange {
    private _min = 0;
    private _max = 1;
    constructor(public start = 0, public end = 1) {
        this._min = Math.min(this.start, this.end);
        this._max = Math.max(this.start, this.end);
    }
    get interval() {
        return this.start - this.end;
    }
    clip(value: number) {
        if(value < this._min) {
            return this._min;
        }
        if(value > this._max) {
            return this._max;
        }
        return value;
    }
}

// Forward and backward transforms between two value ranges
export class RangeTransformationModel {
    private _factor = 1;
    constructor(private _rangeFrom: ValueRange, private _rangeTo: ValueRange) {
        this._factor = this._rangeFrom.interval == 0 ? 1 : this._rangeTo.interval / this._rangeFrom.interval;
    }
    get rangeFrom() {
        return this._rangeFrom;
    }
    get rangeTo() {
        return this._rangeTo;
    }
    transformForward(valueCsFrom: number): number {
        // Translate to 0 in _rangeFrom
        const zeroBasedValueCsFrom = valueCsFrom - this._rangeFrom.start;
        // Scale
        const zeroBasedValueCsTo = zeroBasedValueCsFrom * this._factor;
        // Translate to _min of _rangeTo
        const valueCsTo = zeroBasedValueCsTo + this._rangeTo.start;
        return this._rangeTo.clip(valueCsTo);
    }
    transformBackward(valueCsTo: number): number {
        // Translate to 0 in _rangeTo
        const zeroBasedValueCsTo = valueCsTo - this._rangeTo.start;
        // Scale
        const zeroBasedValueCsFrom = zeroBasedValueCsTo / this._factor;
        // Translate to _min of _rangeFrom
        const valueCsFrom = zeroBasedValueCsFrom + this._rangeFrom.start;
        return this._rangeFrom.clip(valueCsFrom);
    }
}