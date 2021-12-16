/**
 * A sequencer step is made of a <studio-pad> containing a <studio-led>.
 *   We highlight the current sequencer step by setting:
 *     the 'selected' property (attribute) on it's _studioPad member. 
 *     and the on property (attribute) on it's _studioLed member.
 * 
 * A sequencer step also maintains a list of associated drum pads.
 *   Each associated drum pad is kept as a DrumPad object in _drumPads.
 *   By setting the 'selected' property (attribute) on the studioPad member of a
 *   DrumPad object, we indicate that this drum pad is associated with this 
 *   sequencer step.
 */
export class SequencerStep {
    _studioPad;
    _studioLed;
    _drumPads = []; // Drum pads to play for this sequencer step

    constructor(studioPad, studioLed) {
        this._studioPad = studioPad;
        this._studioLed = studioLed;
    }

    /**
     * Select or unselect the sequencer pad and it's drum pads
     *   by seting the selected property on the studio-pad
     *   and setting the on property on the studio-led.
     * 
     * Furthermore, set selected property on the set of
     * studio-pad for the associated drum pads.
     * 
     * The CSS has selectors on [selected] and [on]
     * for these elements.
     */
    select(selected) {
        this._studioPad.selected = selected;
        this._studioLed.on = selected;
        this._drumPads.forEach((drumPad) => {
            drumPad.studioPad.selected = selected;
        });
    }

    /**
     * Play every drum sound assigned to this sequencer step.
     */
    play() {
        this.select(true);
        this._drumPads.forEach((drumPad) => {
            drumPad.play();
        });
    }

    /**
     * Stop playing the drum sounds assigned to this pad
     */
    stop() {
        this.select(false);
    }

    /**
     * Remove all drum pads from this sequencer step.
     */
    reset() {
        this._drumPads.forEach((drumPad) => {
            drumPad.studioPad.selected = false;
        });
        this._drumPads = [];
    }

    /**
     * Add or remove a drum pad from this sequencer step.
     *   Set the selected property (attribute) on the drum pads
     *   accordingly.
     */
    toggleDrumPad(drumPad) {
        const drumPadIndex = this.findDrumPad(drumPad);
        if(drumPadIndex === -1) {
            // Add the drum pad to this step
            this._drumPads.push(drumPad);
            // Highlight the drum pad
            drumPad.studioPad.selected = true;
        }
        else {
            // Remove the drum pad from this step
            this._drumPads.splice(drumPadIndex, 1);
            // Un-hghlight the drum pad
            drumPad.studioPad.selected = false;
        }
    }

    /**
     * Find a drum pad associated to this pad
     */
    findDrumPad(drumPad) {
        for(let i=0; i<this._drumPads.length; i++) {
            if(this._drumPads[i] == drumPad) {
                return i;
            }
        }
        return -1;
    }
}