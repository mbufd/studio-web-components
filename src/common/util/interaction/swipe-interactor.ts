import { webBrowserHelper } from '../../browser/web-browser-helper';
import { IGeometryPoint } from '../../geometry/geometry';

export class SwipeInteractorEvent {
    // Offset relative to the target element (not relative to the entire web page as are x,y from the pointerEvent)
    offset: IGeometryPoint | null;
    // Original pointer event, can still get the original (x,y) from there
    originalPointerEvent: PointerEvent | null;
}
export interface SwipeInteractorEventCallback {
    (event: SwipeInteractorEvent): void;
}
interface PointerEventHandler {
    (): SwipeInteractorEvent;
}

/**
 * Handles swipe interactions using pointer events.
 * 
 */
export class SwipeInteractor {
    // Pointer event handling
    private _isDown = false;
    // Id of pointer event if the pad is engaged in a pointer interaction (mouse or touching)
    private _pointerId: number | null = null;
    // Will throttle move events using this value
    private _moveThrottleTimeMs = 0;
    // Timestamp for debouncing
    private _downOrMoveTimeStamp = 0;

    /**
     * Creates an interactor.
     * 
     * The caller must catch the pointer events and forward them to the interactor using
     * the onPointerDown, onPointerUp and onPointerMove methods.
     * 
     * @param _swipableElement Element to use for pointer event capture 
     * 
     */
    constructor(private _swipableElement: HTMLElement) { }

    /**
     * Reports whether the pointer is down or not.
     */
    get pointerIsDown() {
        return this._isDown;
    }

    /**
     * Client should call onPointerDown upon receiving a pointerdown event.
     * @param pointerEvent The pointer event received on pointerdown.
     * @param callback Callback to process the event.
     * @param obj Parameter to pass back to the callback.
     * 
     * NOTE: a poinerdown event on iOS (Chrome and Safari) seems to be throttled such 
     * that event is received with a lag. This behavior is different then on Android and Windows where
     * pointerdow is received 'instantenously'  
     */
    onPointerDown(pointerEvent: PointerEvent): Promise<SwipeInteractorEvent> {
        return this.handleEvent(pointerEvent, () => {
            this._moveThrottleTimeMs = 50; // Provide some stability if just a click was intended
            this.setAsDown(true);
            this._downOrMoveTimeStamp = Date.now();
            this.startCapture(pointerEvent.pointerId);
            const eventOffset = webBrowserHelper.getPointerEventOffset(pointerEvent);
            const event: SwipeInteractorEvent = {
                offset: eventOffset,
                originalPointerEvent: pointerEvent
            };
            return event;
        });
    }

    /**
     * Client should call onPointerUp upon receiving a pointerup event.
     * @param pointerEvent The pointer event received on pointerup.
     * @param callback Callback to process the event.
     * @param obj Parameter to pass back to the callback.
     */
    onPointerUp(pointerEvent: any): Promise<SwipeInteractorEvent> {
        return this.handleEvent(pointerEvent, () => {
            this.stopCapture();
            this.setAsDown(false);
            const eventOffset = webBrowserHelper.getPointerEventOffset(pointerEvent);
            const event: SwipeInteractorEvent = {
                offset: eventOffset,
                originalPointerEvent: pointerEvent
            }
            return event;
        });
    }

    /**
     * Client should call onPointerMove upon receiving a pointermove event.
     * @param pointerEvent The pointer event received on pointermove.
     * @param callback Callback to process the event.
     * @param obj Parameter to pass back to the callback.
     */
    onPointerMove(pointerEvent: any): Promise<SwipeInteractorEvent> {
        return this.handleEvent(pointerEvent, () => {
            const eventOffset = webBrowserHelper.getPointerEventOffset(pointerEvent);
            const timestamp = Date.now();
            if (this._moveThrottleTimeMs == 0 || timestamp - this._downOrMoveTimeStamp > this._moveThrottleTimeMs) {
                this._moveThrottleTimeMs = 0; // No throttle time once started moving
                this._downOrMoveTimeStamp = timestamp;
                const event: SwipeInteractorEvent = {
                    offset: eventOffset,
                    originalPointerEvent: pointerEvent
                };
                return event;
            }
            return null;
        });
    }

    /**
     * Common process to handle an event in this interactor
     */
    private handleEvent(pointerEvent: PointerEvent, handler: PointerEventHandler): Promise<SwipeInteractorEvent> {
        pointerEvent.stopPropagation();
        pointerEvent.preventDefault();
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                const result = handler();
                result ? resolve(result) : reject(null);
            }, 0);
        });
    }

    /**
     * Start pointer capture on the element
     */
    private startCapture(pointerId: number) {
        this.stopCapture();
        this._pointerId = pointerId;
        if (this._pointerId !== null) {
            try {
                this._swipableElement.setPointerCapture(this._pointerId);
            }
            catch (e) {
                console.warn(`Failed setPointerCapture for ${this._pointerId}`, e);
            }
        }
    }

    /**
     * Stop pointer capture on the element
     */
    private stopCapture() {
        if (this._pointerId !== null) {
            try {
                this._swipableElement.releasePointerCapture(this._pointerId);
            }
            catch (e) {
                console.warn(`Failed releasePointerCapture for ${this._pointerId}`, e);
            }
            this._pointerId = null;
        }
    }


    /**
     * Sets the down state to true or false.
     * @param down Requested state
     * @returns Returns true only if the state has changed.
     */
    private setAsDown(down: boolean) {
        let changed = false;
        if (this._isDown != down) {
            this._isDown = down;
            changed = true;
        }
        return changed;
    }
}