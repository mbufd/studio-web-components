import { Sequencer } from './sequencer.js';
import { Drum } from './drum.js';
import { ButtonGroup } from './button-group.js';
import { Audio } from './audio.js';

/**
 * The drum machine example
 */
export class Example {
    static _sequencer;
    static _drum;
    static _sequencerButtons = new ButtonGroup('eg-button', 'selected');

    /**
     * Run the example
     */
    static run() {
        // Make sure the example is initialized
        Example.initialize();
    }

    /**
     * One-time initialization
     */
    static initialize() {
        if (!Example._drum) {
            Example._drum = new Drum(); // drum singleton
            Example._sequencer = new Sequencer(Example._drum); // sequencer singleton  
            // Configure global event handlers for the sequencer control buttons
            Example.setupGlobalEventHandlers();
            /**
             * This doc uses UIKit for some of the doc CSS and UI.
             * Watch and reinitialize when the Example tab opens.
            */
            Example.watchUIKitExampleShow();
            // Start in edit mode
            Audio.isReady().then(() => {
                editSequence();
            });
        }
    }

    /**
     * We are using UIKit for UI controls in the documentation.
     * Initialize only once the Example tab has shown.
     */
    static watchUIKitExampleShow() {
        const padExampleId = 'pad-example';
        UIkit.util.on(`#${padExampleId}`, 'shown', (event) => {
            if (event.target.id == padExampleId) {
                // The Example tab was selected
            }
        });
        UIkit.util.on(`#${padExampleId}`, 'hidden', (event) => {
            if (event.target.id == padExampleId) {
                // The Example tab was de-selected
                // Make sure the example is initialized
                Example._sequencer.stop();
            }
        });
    }

    /**
     * Use clicked PLAY
     */
    static onPlay() {
        Example._sequencerButtons.selectGroupButton('#play-button');
        Example._sequencer.play();
    }

    /**
     * Use clicked STOP
     */
    static onStop() {
        Example._sequencerButtons.selectGroupButton('#stop-button');
        Example._sequencer.stop();
    }

    /**
     * Use clicked EDIT
     */
    static onEdit() {
        Example._sequencerButtons.selectGroupButton('#edit-button');
        Example._sequencer.edit();
    }

    /**
     * Use clicked RESET
     */
    static onReset() {
        Example._sequencerButtons.selectGroupButton('#reset-button');
        Example._sequencer.reset();
        // Automatically switch to EDIT 
        Example.onEdit();
    }

    /**
     * We are demonstrating the use of some studio-pads as buttons. 
     * The onclick events for these buttons are set in HTML.
     * Since this is an ES module, we expose the event handlers globally.
    */
    static setupGlobalEventHandlers() {
        window.playSequence = Example.onPlay;
        window.stopSequence = Example.onStop;
        window.editSequence = Example.onEdit;
        window.resetSequence = Example.onReset;
    }
}