import { html } from 'lit';
import { classMap } from 'lit/directives/class-map.js';
import { customElement, property, state } from 'lit/decorators.js';
import { StudioLitElement } from '../common/studio-lit-element';
import { SwipeInteractor } from '../common/util/interaction/swipe-interactor';
import { ValueRange } from '../common/geometry/range-tranformation-model';
import { SliderCursor, IOrientedRange } from './slider-cursor';
import { isInRect } from '../common/geometry/geometry';

import { styles } from './slider.css';
import { StudioSliderValueEvent, StudioSliderBoundsEvent, StudioSliderStateEvent } from './slider-events';

/**
 * A label which can be oriented horizontally or sideways.
 */
@customElement('studio-slider')
export class StudioSliderElement extends StudioLitElement implements IOrientedRange {
    // Behaviors
    private _swipeInteractor: SwipeInteractor | null = null;
    // Elements
    private _labelStartElement: HTMLDivElement | null = null;
    private _cursorElement: HTMLDivElement | null = null;
    private _cursorRangeElement: HTMLDivElement | null = null;
    private _sliderInnerSurfaceElement: HTMLDivElement | null = null;
    private _lastEmittedValue: number = undefined; // To avoid multiple event dispatch of the same value
    // Delegate positioning of the cursor to this SliderCursor.
    private _sliderCursor: SliderCursor | null;
    private _moveOffset = 0;
    private _canMove = false;

    /* Styles for the component */
    static styles = styles;

    // Vertical 'v' or horizontal 'h' slider
    @property({ reflect: true })
    orientation = 'v'; // h or v

    // Extreme value at the start of the slider
    private _startValue = 0;
    @property({ attribute: 'start-value', type: Number, reflect: true })
    get startValue() { return this._startValue };
    set startValue(value) {
        this.setPropertyNumberValue('_startValue', 'start-value', value);
        this.onBoundsChanged();
    }

    // Extreme value at the end of the slider
    private _endValue = 1;
    @property({ attribute: 'end-value', type: Number, reflect: true })
    get endValue() { return this._endValue };
    set endValue(value) {
        this.setPropertyNumberValue('_endValue', 'end-value', value);
        this.onBoundsChanged();
    }

    // Current value 
    private _value = 0;
    @property({ type: Number, reflect: true })
    get value() { return this._value; }
    set value(value: number) {
        const newValue = this.clipValue(value); // Don't go out of bounds
        this.setPropertyNumberValue('_value', 'value', this.quantize(newValue));
        if (this.hasUpdated) {
            this.onWorldValueChanged();
        }
    }

    // Current value 
    private _step = 0; // No quantization by default
    @property({ type: Number, reflect: true })
    get step() { return this._step; }
    set step(value: number) {
        value = Math.max(0, value); // 0 or less means no step
        this.setPropertyNumberValue('_step', 'step', value);
        // Set the value and render accordingly
        this.value = this._value;
    }

    // Quantize value to step value
    private quantize(value: number) {
        if (this._step > 0) {
            const multipleOfStep = Math.round(value / this._step);
            return multipleOfStep * this._step;
        }
        return value;
    }

    // Use uniform color
    @property({ type: Boolean, reflect: true })
    uniform = false;

    // Disabled state
    @property({ type: Boolean, reflect: true })
    disabled = false;

    // If true, disables direct click on surface to move the cursor
    @property({ attribute: 'no-direct', type: Boolean, reflect: true })
    noDirect = false;

    // If noDirect is false, enable animation when value > 0
    @property({ type: Number, reflect: true })
    animation = 100; // <= 0 means no animation, > 0 means animation time in MS

    // Used instead of the CSS :active selector because it doens't work well on touch
    @state()
    private _showAsActive = false;

    /**
     * Get ready
     */
    constructor() {
        super();
        // Render when slider size changes (including the first time around)
        // See: https://codelabs.developers.google.com/codelabs/lit-brick-viewer#3
        new ResizeObserver((_) => {
            // Re-position the cursor to reflect new dimensions
            this._sliderCursor.worldRange = new ValueRange(this.startValue, this.endValue);
            this._sliderCursor.setCursorPositionWorld(this.value);
            this._sliderCursor.applyCursorPositionPx();
        }).observe(this);
    }

    /**
     * Setup things on firt update and emit first value
     */
    firstUpdated() {
        this._labelStartElement = this.renderRoot.querySelector('#label-start');
        this._sliderInnerSurfaceElement = this.renderRoot.querySelector('#inner-surface');
        this._cursorRangeElement = this.renderRoot.querySelector('#cursor-range');
        this._cursorElement = this.renderRoot.querySelector('#cursor');
        this._sliderCursor = new SliderCursor(this._cursorElement, this);
        this._swipeInteractor = new SwipeInteractor(this._sliderInnerSurfaceElement);
        this.onWorldValueChanged();
    }

    /**
     * Returns true only if interaction is possible
     */
    private get canInteract() {
        // Lock the interaction if disabled or if the bounds are the same
        return !this.disabled && this.startValue != this.endValue;
    }

    /**
     * !!! ...to research... special case on iOS...
     * On Safari as well as any browser on iOS, the source of the pointer event is 'inner-surface' 
     * in which case the margin is already accounted for. 
     * In other cases, the source element is the studio-slider as it should be, in 
     * which case the margin needs to be accounted for.
     * It's not clear yet why this is the case but this is an easy fix for the moment.
     * Note: see the css, but the inner-surface is narrower than the full surface
     * by the margin, which is why there is a difference in accounting here.
     * If Safari eventually fixes such that the source is the studio-slider just as 
     * on Chrome and Firefox engines, then it should work and the patch should not be
     * required. Or it may be possible to change the css such that the problem does not 
     * occur.
     */
    getPointerEventMarginCorrectionPix(pointerEvent: any) {
        if (pointerEvent.srcElement.id == 'inner-surface') {
            return 0; // Safari & iOS case, no margin correction because margin accounted for in inner-surface
        }
        // Account for the margin
        return this.orientation == 'v' ? this._labelStartElement.clientHeight : this._labelStartElement.clientWidth;
    }

    /**
     * Pointer down event on the surface
     * Swipe interactor starts capture
     */
    onPointerDown(pointerEvent: any) {
        if (this.canInteract) {
            this._swipeInteractor!.onPointerDown(pointerEvent).then((event) => {
                const cursorBox = this._cursorElement.getBoundingClientRect();
                if (isInRect(pointerEvent.x, pointerEvent.y, cursorBox)) {
                    // Grabbing the cursor directly
                    this._canMove = true;
                    this.handleCursorPointerDown(pointerEvent.x, pointerEvent.y, cursorBox);
                }
                else if (!this.noDirect) {
                    this._canMove = true;
                    // Case when hitting the cursor range outside of the cursor.
                    const marginCorrectionPix = this.getPointerEventMarginCorrectionPix(pointerEvent);
                    this.handleSurfacePointerDown(event.offset.x, event.offset.y, marginCorrectionPix);
                }
            });
        }
    }

    // Pointer is down on the surface but outside the cursor
    private handleSurfacePointerDown(x: number, y: number, marginCorrectionPix: number) {
        this._moveOffset = 0; // Will grab the cursor at it's center once moving
        this._showAsActive = true;
        // Animate to the new position
        const positionPix = this.orientation == 'v' ? y : x;
        this._sliderCursor.animate(positionPix - marginCorrectionPix, (animCursorPosition: number) => {
            // During animation
            this.setValueEventFromCursorPosition(animCursorPosition);
        }, this.animation).then(() => {
            // Animation done
            this.setValueEventFromCursorPosition();
        });
        this.emitStateEvent(true);
    }

    /**
     * Pointer falls inside the cursor: take the offest where the cursor was grabbed.
     * The offset is applied during moves.
     */
    private handleCursorPointerDown(x: number, y: number, cursorBox: DOMRect) {
        // Compute the offset for the grab point on the cursor, center is and offset of 0
        this._moveOffset = this.orientation == 'v' ?
            (y - cursorBox.top - (this._cursorElement.clientHeight / 2)) :
            (x - cursorBox.left - (this._cursorElement.clientWidth / 2));
        this._showAsActive = true;
        this.setValueEventFromCursorPosition();
        this.emitStateEvent(true);
    }

    /**
     * Pointer move event.
     */
    onPointerMove(pointerEvent: any) {
        this._swipeInteractor!.onPointerMove(pointerEvent).then((event) => {
            if (this.canInteract && this._canMove) {
                // Adjust for any offset relative to cursor center
                const positionPx = this.orientation == 'v' ?
                    (event.offset.y - this._moveOffset) :
                    (event.offset.x - this._moveOffset);
                const marginCorrectionPix = this.getPointerEventMarginCorrectionPix(pointerEvent);
                this._sliderCursor.centerCursorPositionAtPix(positionPx - marginCorrectionPix);
                this._sliderCursor.applyCursorPositionPx();
                this.setValueEventFromCursorPosition();
            }
        }).catch(() => { });
    }

    /**
     * Pointer up event
     * Swipe interactor starts capture
     */
    onPointerUp(pointerEvent: any) {
        this._swipeInteractor!.onPointerUp(pointerEvent).then((event) => {
            this._canMove = false;
            this._showAsActive = false;
            if (this.canInteract) {
                this.setValueEventFromCursorPosition();
                this.emitStateEvent(false);
            }
        }).catch(() => { });
    }

    /**
     * Render based on the current state of the slider
     */
    render() {
        const surfaceClasses = { active: this._showAsActive, disabled: !this.canInteract };
        const cursorClasses = { accent: true, disabled: !this.canInteract };
        const innerClasses = { active: this._showAsActive, 'inner-length': true, 'inner-range': true, 'border-margins': true };
        return html`
        <div id="surface" class="${classMap(surfaceClasses)}"
            @pointerdown="${this.onPointerDown}" 
            @pointerup="${this.onPointerUp}" 
            @pointermove="${this.onPointerMove}"
            @contextmenu="${this.preventAndStop}">

            <div id="accent-tl" class="accent" part="accent-tl"></div>
            <div id="accent-br" class="accent" part="accent-br"></div>

            <div id="label-start" class="label" part="label-start"><slot name="label-start"></slot></div>
            <div id="label-end" class="label" part="label-end"><slot name="label-end"></slot></div>

            <div class="default-slot border-margins"><slot></slot></div>

            <div id="inner-surface" part="inner-surface" class="${classMap(innerClasses)}"><slot name="inner-surface" style="pointer-events: none"></slot></div>

            <div id="cursor-range" part="cursor-range" class="range-thickness"><slot name="cursor-range"></slot></div>

            <div id="cursor-container" class="inner-length">
                <div id="cursor" class="${classMap(cursorClasses)}" part="cursor">
                   <div id="cursor-decoration" class=${classMap(cursorClasses)} part="cursor-decoration"></div>
                </div>
            </div>
        </div>
        `;
    }

    /**
     * Updates the cursor position based on the current slider value
     */
    private onWorldValueChanged() {
        if (this._sliderCursor) {
            // Inform the cursor about the new world
            this._sliderCursor.worldRange = new ValueRange(this.startValue, this.endValue);
            // Since the world has changed, the value may means something else, 
            // therefore update the cursor position
            this._sliderCursor.setCursorPositionWorld(this.value);
            this._sliderCursor.applyCursorPositionPx();
            // Emit the new value
            this.emitValueEvent();
        }
    }

    /**
     * Emit new value and bounds on a change of bounds
     */
    private onBoundsChanged() {
        if (this._sliderCursor) {
            this._sliderCursor.worldRange = new ValueRange(this.startValue, this.endValue);
            // Update the value based on the new bounds
            const newValue = this._sliderCursor.positionPxToWorld(this._sliderCursor.positionPx);
            this._value = this.quantize(newValue);
            // Emit the new value
            this.emitValueEvent();
            // Emit the new bounds
            const event = new StudioSliderBoundsEvent({ bubbles: true, composed: true });
            event.studio = {
                startValue: this._startValue,
                endValue: this._endValue
            };
            this.dispatchEvent(event);
        }
    }

    /**
     * Use the cursor position to compute and emit the new value. 
     * Useful during interactions.
     */
    private setValueEventFromCursorPosition(cursorPosition: number = null) {
        if (this._sliderCursor) {
            cursorPosition = cursorPosition !== null ? cursorPosition : this._sliderCursor.positionPx;
            const newValue = this._sliderCursor.positionPxToWorld(cursorPosition);
            this._value = this.quantize(newValue);
            if (this._value !== newValue) {
                this._sliderCursor.setCursorPositionWorld(this.value);
                this._sliderCursor.applyCursorPositionPx();
            }
            this.emitValueEvent(this._value);
        }
    }

    /**
     * Emit a new value if it has changed since last emitted
     */
    private emitValueEvent(value: number = this._value) {
        if (value != this._lastEmittedValue) {
            this._lastEmittedValue = value;
            const event = new StudioSliderValueEvent({ bubbles: true, composed: true });
            event.studio = {
                value: value
            };
            this.dispatchEvent(event);
        }
    }

    /**
     * Emits the up or down state
     */
    private emitStateEvent(isDown: boolean) {
        const event = new StudioSliderStateEvent({ bubbles: true, composed: true });
        event.studio = {
            isDown: isDown
        };
        this.dispatchEvent(event);
    }

    /**
     * Takes a value and returns it constrained to the bounds
     */
    private clipValue(value: number) {
        if (this._startValue && this._endValue) {
            const minValue = Math.min(this._startValue, this._endValue);
            const maxValue = Math.max(this._startValue, this._endValue);
            value = Math.max(minValue, Math.min(maxValue, value));
        }
        return value;
    }

    /**
     * Returns the allowed cursor's travel range in pixels.
     */
    get rangePix() {
        if (this.orientation == 'v') {
            // Vertical, 0 is at bottom
            return new ValueRange(this._cursorRangeElement.clientHeight, 0);
        }
        else {
            // Horizontal, 0 is on left
            return new ValueRange(0, this._cursorRangeElement.clientWidth);
        }
    }
}

// Make it easy to use from Typescript
declare global { interface HTMLElementTagNameMap { 'studio-slider': StudioSliderElement } }
