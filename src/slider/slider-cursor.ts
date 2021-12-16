import { AnimationFeedbackInterval } from '../common/util/animation-feedback-interval';
import { ValueRange, RangeTransformationModel } from '../common/geometry/range-tranformation-model';

// Exposes only the info that we need from the host (slider)
export interface IOrientedRange {
    orientation: string; // 'v' or 'h'
    rangePix: ValueRange;
}

/**
 * Handles positioning of the cursor for the slider
 */
export class SliderCursor {
    private _positionPx = 0; // In pixels within valid range on the element
    private _transformationModel = new RangeTransformationModel(new ValueRange(), new ValueRange());

    constructor(private _cursorElement: HTMLDivElement, private _orientedRange: IOrientedRange) { }

    // Return cursor position in pixel coordinates
    get positionPx() {
        return this._positionPx;
    }

    // Return cursor position in world coordinates
    get positionWorld() {
        return this.positionPxToWorld(this._positionPx);
    }
    positionPxToWorld(positionPx: number) {
        return this._transformationModel.transformBackward(positionPx);
    }

    // Set the transformation model to match the provided world range
    set worldRange(fromRangeWorld: ValueRange) {
        const toRangePix = this._orientedRange.rangePix;
        const transformationModel = new RangeTransformationModel(fromRangeWorld, toRangePix);
        this._transformationModel = transformationModel;
    }

    // Returns the length of the cursor in pixels
    get lengthPx() {
        return this._orientedRange.orientation == 'v' ? this._cursorElement.clientHeight : this._cursorElement.clientWidth;
    }

    /**
     * 
     * @param positionIntervalPx Relative to the available interval within the slider space.
     */
    private setCursorPositionPix(positionIntervalPx: number) {
        if (this._orientedRange.orientation == 'v') {
            // Vertical : min and max are inverted so to have the lowest value at the bottom of the slider
            const minY = this._orientedRange.rangePix.end;
            const maxY = this._orientedRange.rangePix.start;
            this._positionPx = Math.min(maxY, Math.max(minY, positionIntervalPx));
        }
        else {
            // Horizontal
            const minX = this._orientedRange.rangePix.start;
            const maxX = this._orientedRange.rangePix.end;
            this._positionPx = Math.min(maxX, Math.max(minX, positionIntervalPx));
        }
    }

    /**
    * Set the _cursorPosition at the center around the specified position
    */
    centerCursorPositionAtPix(cursorPositionPx: number) {
        const adjustment = this.lengthPx / 2;
        const positionPx = Math.round(cursorPositionPx - adjustment);
        this.setCursorPositionPix(positionPx);
    }

    /**
     * Applies a new cursor position based on a value in world coordinate
     * @param cursorPositionWorld Cursor position in world coordinates
     */
    setCursorPositionWorld(cursorPositionWorld: number) {
        const positionPx = Math.round(this._transformationModel.transformForward(cursorPositionWorld));
        this.setCursorPositionPix(positionPx);
    }

    /**
     * Applies a new cursor position based on a value in pixel coordinates
     */
    applyCursorPositionPx(cursorPositionPx: number = this._positionPx) {
        const translationAxis = this._orientedRange.orientation == 'v' ? 'Y' : 'X';
        const translation = `translate${translationAxis}`;
        // Make sure our element starts with the current translation
        this._cursorElement.style.transform = `${translation}(${cursorPositionPx}px)`;
        return translation;
    }

    /**
     * Animates the cursor to a new location (xPx,yPx) in pixel coordinates.
     * Provides feedback using a feedbackCallback during the animation.
     * If animationDurationMs is <= 0 then applies the position without animating.
     */
    animate(toCursorPositionPx: number, feedbackCallback: any, animationDurationMs: number) {
        return new Promise((resolve) => {
            const fromCursorPositionPx = this.positionPx;
           // const toCursorPositionPx = this._orientedRange.orientation == 'v' ? yPx : xPx;
            const translationAxis = this._orientedRange.orientation == 'v' ? 'Y' : 'X';
            const translation = `translate${translationAxis}`;
            this.centerCursorPositionAtPix(toCursorPositionPx);
            // Animate using new translation
            if (animationDurationMs > 0) {
                const animation = this._cursorElement.animate([
                    { transform: `${translation}(${fromCursorPositionPx}px)` }, // From 
                    { transform: `${translation}(${this._positionPx}px)` } // To
                ], {
                    duration: animationDurationMs
                });
                this.startAnimationFeedback(animation, animationDurationMs, fromCursorPositionPx, feedbackCallback).then(() => {
                    // Done animation
                    this.centerCursorPositionAtPix(toCursorPositionPx);
                    this.applyCursorPositionPx();
                    resolve(true);
                });
            }
            else {
                this.centerCursorPositionAtPix(toCursorPositionPx);
                // No animation, go directly to the position
                this.applyCursorPositionPx();
                resolve(true);
            }
        });
    }

    /**
     * Calls feedbackCallback iteratively during the animation
     */
    private startAnimationFeedback(
        animation: Animation, animationDurationMs: number,
        fromCursorPosition: number, feedbackCallback: any): Promise<boolean> {

        if (animationDurationMs <= 0) {
            return Promise.resolve(true); // No animation needed
        }
        return new Promise((resolve) => {
            let divisions = 5;
            const feedbackIntervalMs = animationDurationMs / divisions;
            const cursorPositionIncrement = (this._positionPx - fromCursorPosition) / divisions;
            let animCursorPosition = fromCursorPosition;
            const feedback = new AnimationFeedbackInterval(animation);
            feedback.setFeedbackInterval((state) => {
                if (!state.finished) {
                    feedbackCallback?.(animCursorPosition);
                    animCursorPosition = animCursorPosition + cursorPositionIncrement;
                    animCursorPosition = this._transformationModel.rangeTo.clip(animCursorPosition);
                    if (divisions === 0) {
                        resolve(true);
                    } else {
                        divisions--;
                    }
                }
                else {
                    resolve(true);
                }
            }, feedbackIntervalMs);
        });
    }
}