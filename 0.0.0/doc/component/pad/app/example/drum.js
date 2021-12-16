import { Sound } from './audio.js';
import { DrumPad } from './drum-pad.js';

/**
 * A simple drum with capability to sync to an external or internal clock.
 */
export class Drum {
    _drumPads = [];
    _sync = false;
    _sounds = [];
    _internalClockDelayMs = 500;

    constructor(studioPads) {
        // Load the drum pad elements
        this.loadDrumPads(studioPads);
        // Start an internal clock for playing the pads
        this.startInternalClock(this._internalClockDelayMs);
    }

    /**
     * Exposes the drum pads to caller
     */
    get pads() {
        return this._drumPads;
    }

    /**
     * Load the <studio-pad> from HTML.
     * Create the corresponding DrumPad objects.
     */
    loadDrumPads() {
        let soundIndex = 0;
        const studioPadElements = document.querySelectorAll('.eg-drum-pad');
        studioPadElements.forEach((studioPad) => {
            // Populate the sound bank
            const sound = new Sound(soundIndex++);
            this._sounds.push(sound);
            // Assign the studio pad and its sound to a new drum pad object
            const drumPad = new DrumPad(studioPad, sound);
            this._drumPads.push(drumPad);
        });
    }

    /**
     * If asked to synchronize from an external sequencer, play on the beat now.
     * Otherwise our internal clock will trigger the beats.
     */
    sync(sync) {
        this._sync = sync;
        if (this._sync) {
            this.onBeat();
        }
    }

    /**
     * Always running internal clock.
     * Will play beats if not synched to an external clock.
     * Keep the clock running but act only when not synched externally
     */
    startInternalClock(delayMs) {
        setInterval(() => {
            if (!this._sync) {
                this.onBeat();
            }
        }, delayMs);
    }

    /**
     * Play a synchronized beat on all pads.
     */
    onBeat() {
        this._drumPads.forEach((drumPad) => {
            drumPad.onBeat();
        });
    }
}