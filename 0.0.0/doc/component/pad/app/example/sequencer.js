import { SequencerStep } from './sequencer-step.js';

/**
 * The sequencer can be in one of the following modes
 */
const ModePlaying = 'playing';
const ModeStopped = 'stopped';
const ModeEditing = 'editing';

export class Sequencer {
    _delayMs = 250;
    _sequencerSteps = [];
    _selectedSequencerStep;
    _currentStep = 0;
    _mode = ModeStopped;
    _drum;

    constructor(drum) {
        this._drum = drum;
        this.loadSequencerSteps();
        this.listenToDrumPads();
    }

    /**
     * There should be N pads named seq1 to seqN,
     * each with a led.
     */
    loadSequencerSteps() {
        const padNodes = document.querySelectorAll('.eg-seq-pad');
        padNodes.forEach((studioPad) => {
            // Get the studio-led from the pad
            const studioLed = studioPad.querySelector('studio-led');
            studioLed.normalizedIntensity = 1;
            studioLed.maxIntensity = 200;
            const sequencerStep = new SequencerStep(studioPad, studioLed);
            this._sequencerSteps.push(sequencerStep);
            studioPad.addEventListener('studio-pad-down', (_) => {
                this.onStepSelected(sequencerStep);
            });
        });
    }

    /**
     * When the use presses on a sequencer pad, highlight the  sequencer pad
     * and play it's drum pads.
     */
    onStepSelected(sequencerStep) {
        this.select(sequencerStep);
        sequencerStep.play();
        if (this._mode == ModePlaying) {
            // Keep highlighted only briefly during sequencer playback
            setTimeout(() => {
                this.unselect();
            }, 100);
        }
    }

    /**
     * On hitting a drum pad, we want to toggle it in the sequence if under editing mode
     */
    listenToDrumPads() {
        this._drum.pads.forEach((drumPad) => {
            drumPad.listen((event) => {
                if (event.type == 'studio-pad-down') {
                    if (this._selectedSequencerStep && this._mode == ModeEditing) {
                        this._selectedSequencerStep.toggleDrumPad(drumPad);
                    }
                }
            });
        });
    }

    /**
     * Mark this sequencer pad as selected
     */
    select(sequencerStep) {
        this.unselect();
        this._selectedSequencerStep = sequencerStep;
        this._selectedSequencerStep.select(true);
    }

    /**
     * Mark the selected sequencer pad as unselected
     */
    unselect() {
        if (this._selectedSequencerStep) {
            this._selectedSequencerStep.select(false);
        }
    }

    /**
     * Play the sequencer steps in loop
     */
    play() {
        if (this._mode != ModePlaying) {
            this.unselect();
            this._mode = ModePlaying;
            this.playNext();
        }
    }
    // Play the next sequencer step
    playNext() {
        if (this._mode == ModePlaying) {
            this._drum.sync(true);
            const sequencerStep = this._sequencerSteps[this._currentStep];
            sequencerStep.play();
            setTimeout(() => {
                sequencerStep.stop();
                if (this._mode == ModePlaying) {
                    this._currentStep = (this._currentStep + 1) % this._sequencerSteps.length;
                    this.playNext();
                }
            }, this._delayMs);
        }
    }

    /**
     * Stop playing the sequencer steps
     */
    stop() {
        if (this._mode != ModeStopped) {
            this._drum.sync(false);
            this._mode = ModeStopped;
            const sequencerStep = this._sequencerSteps[this._currentStep];
            sequencerStep.stop();
            this._currentStep = 0;
        }
    }

    /**
     * Enter editing mode
     */
    edit() {
        this.stop();
        this._mode = ModeEditing;
        const sequencerStep = this._sequencerSteps[this._currentStep];
        this.select(sequencerStep);
    }

    /**
     * Reset to default sequence
     */
    reset() {
        this._sequencerSteps.forEach((sequencerStep) => {
            sequencerStep.reset();
        });
        this.edit(); // Automatically go into edit mode
    }
}