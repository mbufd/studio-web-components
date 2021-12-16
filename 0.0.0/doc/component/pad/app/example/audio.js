/**
 * We are using Tone.js to provide a sound source over the Web Audio API.
 * See: https://tonejs.github.io/
 */
import '../../../../../ext/tone/Tone.js';

export class Audio {
    static noteFrequencies = [
        // Note frequencies from C2 up
        65.41, 69.30, 73.42, 77.78,
        82.41, 87.31, 92.50, 98.00,
        103.83, 110.00, 116.54, 123.47,
        130.81, 138.59, 146.83, 155.56
    ];
    /**
     * Call isReady on an early user interaction.
     * @returns A resolved promise once Web Audio API is ready.
     */
    static isReady() {
        return Tone.start().then(() => {
            Audio.ready = true;
        });
    }
}

export class Sound {
    // Configure volume as final stage to destination
    _volume = new Tone.Volume(0).toDestination();
    // Configure filter as prior stage to volume
    _filter = new Tone.Filter(400, "highpass").connect(this._volume);
    // MembraneSynth as a synthetic drum synth, with filter
    _synth = new Tone.Synth().connect(this._filter);
    _note;
    _noteDuration = .25; // second

    constructor(noteIndex) {
        noteIndex = Math.max(0, Math.min(noteIndex, Audio.noteFrequencies.length - 1));
        this._note = Audio.noteFrequencies[noteIndex];
    }

    /**
     * Sets the playback volume
     * @param {*} normalizedVolume Volume between 0 and 1
     */
    setVolume(normalizedVolume) {
        const dbRange = 18;
        const volumeDb = (normalizedVolume * dbRange) - 18;
        this._volume.volume.value = volumeDb;
    }

    /**
     * Sets the playback filter level
     */
    setFilter(normalizedLevel) {
        const maxCutoffFrequency = 1200;
        this._filter.frequency.value = normalizedLevel * maxCutoffFrequency;
    }

    /**
     * Play the note for this 
     */
    play() {
        this._synth.triggerAttackRelease(this._note, this._noteDuration);
    }
}
