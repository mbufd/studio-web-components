import { PlasticRulerPolygon } from './plastic-ruler-polygon.js';
import { Interactor } from './interactor.js';

/**
 * Implements a simple plastic ruler which can be moved on top of a graphics page
 */
export class PlasticRuler extends Interactor {
    _translateDownAt = null;
    _rotateDownAt = null;
    _pointerId = null;
    _centerGraphicsCs = null;
    _rulerPolygon = null;
    _activationCallback  = null;

    // Initial transformation
    _transform = {
        angleRad: 30 * Math.PI / 180,
        translation: { x: 65, y: 0 }
    }

    constructor(hostDiv, activationCallback) {
        super(hostDiv);
        this._activationCallback = activationCallback;
        // Bind the elements we need
        this.bindElements();
        // Apply initial transform
        this.resize();
    }

    get polygon() {
        return this._rulerPolygon.transform(this._transform);
    }

    enablePointerEvents(enabled) {
        this._plasticRulerDiv.style.pointerEvents = enabled ? 'auto' : 'none';
    }

    bindElements() {
        this._plasticRulerDiv = document.querySelector('#plastic-ruler');
        this._rotationHandleDiv = document.querySelector('#rotation-handle');
        // Watch for events
        this._rotationHandleDiv.addEventListener('pointerdown', this.onRotatePointerDown);
        this._plasticRulerDiv.addEventListener('pointerdown', this.onTranslatePointerDown);
    }

    onHostResized() {
        this.resize();
        this._activationCallback(this.active);
    }

    resize() {
        this.applyTransform();
        this._rulerPolygon = new PlasticRulerPolygon();
    }

    onRotatePointerDown = (pointerEvent) => {
        this._activationCallback(true);
        this.onPointerEvent(pointerEvent, this._rotationHandleDiv.id, () => {
            this._translateDownAt = null;
            this._rotateDownAt = { x: pointerEvent.offsetX, y: pointerEvent.offsetY };
            this.startCapture(pointerEvent.pointerId);
        });
    }

    onTranslatePointerDown = (pointerEvent) => {
        this._activationCallback(true);
        this.onPointerEvent(pointerEvent, this._plasticRulerDiv.id, () => {
            // Enable translation on move. Will take a first position on move so it is then relative to the graphics page.
            this._translateDownAt = { x: null, y: null };
            this._rotateDownAt = null;
            this.startCapture(pointerEvent.pointerId);
        });
    }

    onInteractionEnd(_) {
        this._activationCallback(false);
        this._translateDownAt = null;
        this._rotateDownAt = null;
    }

    /**
     * pointerEvent (x,y) relative to the graphics coordinate system
     */
     onInteractionMove(pointerEvent) {
        // (x,y) relative to the element, regardless of rotation
        const pointGraphicsCs = {
            x: pointerEvent.offsetX,
            y: pointerEvent.offsetY
        }
        if (this._translateDownAt !== null) {
            this.computeTranslationGraphicsCs(pointGraphicsCs.x, pointGraphicsCs.y);
            this.applyTransform();
            // Invalidate the center of rotation
            this.invalidateRotationGraphicsCS();
        }
        else if (this._rotateDownAt !== null) {
            this.computeRotationFromGraphicsCSPoint(pointGraphicsCs.x, pointGraphicsCs.y);
            this.applyTransform();
        }
    }

    /**
     * (x,y) and this._translateDownAt are relative to the graphics page
     */
    computeTranslationGraphicsCs(x, y) {
        if (this._translateDownAt.x != null) {
            const delta = {
                x: x - this._translateDownAt.x,
                y: y - this._translateDownAt.y
            };
            this._transform.translation.x += delta.x;
            this._transform.translation.y += delta.y;
        }
        this._translateDownAt = { x: x, y: y };
    }

    invalidateRotationGraphicsCS() {
        this._centerGraphicsCs = null;
    }
    computeRotationFromGraphicsCSPoint(x, y) {
        if (this._centerGraphicsCs === null) {
            const metricsGraphicsCs = this.getRulerMetricsInGraphicsCs();
            this._centerGraphicsCs = metricsGraphicsCs.center;
        }
        x = x - this._centerGraphicsCs.x;
        y = y - this._centerGraphicsCs.y;
        this._transform.angleRad = Math.atan2(y, x) + (Math.PI / 2);
    }

    applyTransform() {
        const translation = `translate(${this._transform.translation.x.toFixed(0)}px, ${this._transform.translation.y.toFixed(0)}px)`;
        const rotation = `rotate(${this._transform.angleRad.toFixed(4)}rad)`;
        // CSS transform is applied from right to left : rotate then translate
        const transform = `${translation} ${rotation}`;
        // Apply the transformation to the div
        this._plasticRulerDiv.style.transform = transform;
        this._plasticRulerDiv.style.webkitTransform = transform;
    }

    /**
     * Returns size, origin and center of ruler.
     * Origin and center are relative to the graphics page, (0,0) at top left of graphics page.
     * Size is constant.
     */
    getRulerMetricsInGraphicsCs() {
        const rulerBoundingBox = this._plasticRulerDiv.getBoundingClientRect();
        const hostBoundingBox = this.hostBoundingRect;
        const size = { // Smallest box that fits the rotated ruler
            width: (rulerBoundingBox.width),
            height: (rulerBoundingBox.height)
        };
        const origin = { // Relative to graphics page
            x: (rulerBoundingBox.x - hostBoundingBox.x),
            y: (rulerBoundingBox.y - hostBoundingBox.y)
        };
        const center = { // Relative to graphics page
            x: origin.x + (size.width / 2),
            y: origin.y + (size.height / 2)
        }
        const metrics = { origin: origin, size: size, center: center };
        return metrics;
    }
}