export class Interactor {
    _pointerId = null;
    _active = false;
    _interactionCallback = null;

    constructor(hostDiv) {
        this._hostDiv = hostDiv;
        this.bindEvents();
    }

    get active() {
        return this._active;
    }
    set active(value) {
        this._active = value;
    }

    setInteractionCallback(callback) {
        this._interactionCallback = callback;
    }

    get hostBoundingRect() {
        return this._hostDiv.getBoundingClientRect();
    }

    onPointerDown = (pointerEvent) => {
        if(this._active) {
            this.onPointerEvent(pointerEvent, null, () => {
                if(this._interactionCallback) {
                    this._interactionCallback(this, true)
                }
                this.onInteractionStart(pointerEvent);
            });    
        }
    }

    onPointerUp = (pointerEvent) => {
        if(this._active) {
            this.onPointerEvent(pointerEvent, null, () => {
                if(this._interactionCallback) {
                    this._interactionCallback(this, false)
                }
                this.onInteractionEnd(pointerEvent);
                this.stopCapture();
            });    
        }
    }

    onPointerMove = (pointerEvent) => {
        if(this._active) {
            this.onPointerEvent(pointerEvent, this._hostDiv.id, () => {
                this.onInteractionMove(pointerEvent);
            });    
        }
    }

    onInteractionStart(pointerEvent) {}
    onInteractionEnd(pointerEvent) {}
    onInteractionMove(pointerEvent) {}

    onResize() {
        this.onHostResized();
    }

    bindEvents() {
        // Watch for events
        this._hostDiv.addEventListener('pointerdown', this.onPointerDown);
        this._hostDiv.addEventListener('pointerup', this.onPointerUp);
        this._hostDiv.addEventListener('pointermove', this.onPointerMove);
        // Handle resizing
        const resizeObserver = new ResizeObserver(() => { this.onResize(); });
        resizeObserver.observe(this._hostDiv);
    }

    startCapture(pointerId) {
        this.stopCapture();
        this._pointerId = pointerId;
        if (this._pointerId !== null) {
            this._hostDiv.setPointerCapture(this._pointerId);
        }
    }

    stopCapture() {
        if (this._pointerId !== null) {
            this._hostDiv.releasePointerCapture(this._pointerId);
            this._pointerId = null;
        }
    }

    onPointerEvent(pointerEvent, forElementId, callback) {
        if (forElementId === null || pointerEvent.target.id === forElementId) {
            pointerEvent.stopPropagation();
            pointerEvent.preventDefault();
            callback();
        }
    }
}