/**
 * A drum pad object is made of a <studio-pad>.
 *    We set the bold property (attribute) to indicate that 
 *    the user is manually playing a note on the pad.
 */
export class DrumPad {
    _studioPad;
    _eventCallback;
    _sound;
    _beatXY = null;
    _sync = false;
    _downOnMs = 0;
    _lastPlayMs = 0;

    constructor(studioPad, sound) {
        this._studioPad = studioPad;
        this._sound = sound;
    }

    get studioPad() {
        return this._studioPad;
    }

    /**
    * On pad down, use the X and Y offsets from the event 
    * and play a note as a function of the swipe location.
    */
    onPadDown(studioPadEvent) {
        this._downOnMs = Date.now();
        if (this._eventCallback) {
            this._eventCallback(studioPadEvent);
        }
        // Play using the XY offset
        this.playXY(studioPadEvent.studio.offset.x, studioPadEvent.studio.offset.y);
        // Setup repeated play for the same location
        this._beatXY = studioPadEvent.studio.offset;
        // Show the studio-pad as bold to indicate interaction
        this._studioPad.bold = true;
    }

    /**
     * On pad down, stop repeated play and show the studio-pad 
     * as not bold.
     */
    onPadUp() {
        // Stop repeated play
        this._beatXY = null;
        // Show the studio-pad as not bold after at least 100 ms 
        // so that the tap is visible on touch devices
        const waitMs = Math.min(100, Date.now() - this._downOnMs);
        setTimeout(() => {
            this._studioPad.bold = false;
        }, waitMs);
    }

    /**
     * On pad swipe, update the XY location for repeated play.
     */
    onPadSwipe(studioPadEvent) {
        this._beatXY = studioPadEvent.studio.offset;
        if (this._eventCallback) {
            this._eventCallback(studioPadEvent);
        }
    }

    /**
     * Hook handlers to events
     */
    listen(eventCallback) {
        this._eventCallback = eventCallback;
        this._studioPad.addEventListener('studio-pad-down', (studioPadEvent) => {
            this.onPadDown(studioPadEvent);
        });
        this._studioPad.addEventListener('studio-pad-up', (_) => {
            this.onPadUp();
        });
        this._studioPad.addEventListener('studio-pad-swipe', (studioPadEvent) => {
            this.onPadSwipe(studioPadEvent);
        });
    }

    /**
     * Play a note as a function of the XY location
     */
    playXY(x, y) {
        const now = Date.now();
        if (now - this._lastPlayMs > 125) {
            this._lastPlayMs = now;
            this._sound.setFilter(x);
            this._sound.setVolume(y);
            this._sound.play();
        }
    }

    /**
     * Play a regular note
     */
    play() {
        const minimum = 0;
        const center = .5;
        this._sound.setFilter(minimum);
        this._sound.setVolume(center);
        this._sound.play();
    }

    /**
     * An external clock will call onBeat for repeating the XY play
     * if applicable.
     */
    onBeat() {
        if (this._beatXY) {
            this.playXY(this._beatXY.x, this._beatXY.y);
        }
    }
}