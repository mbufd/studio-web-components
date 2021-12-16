/**
 *  game-of-life-cell.js
 * 
 *  Main JS code for the game of life example.
 */
import { StudioLedElement } from "../../../../studio.js";

/**
 * A cell is represented by a LED which is on only when the 
 * cell is alive and which normalized intensity is a function 
 * the age (number of generations) the cell has been alive.
 */
export class GameOfLifeCell {
    static _agingPerGeneration = 0.075;
    isAlive = false;
    invert = false;

    /**
     * Create and initialize the LED for the cell.
     * We use a custom maximum intensity and set the normalized 
     * intensity to 0 by default, to reflect a cell age of 0.
     */
    constructor(cssClass, callback) {
        // Create the LED for this cell
        this.led = new StudioLedElement(); 
        // Customize LED intensity
        this.led.normalizedIntensity = 0;
        this.led.maxIntensity = 220;
        this.led.clickable = true;
        this.led.classList.add(cssClass);
        // Handle clicks on the wrapper div
        this.led.onclick = (_) => {
            if (callback) {
                callback();
            }
        };
    }

    /**
     * Change the intensity of the LED to reflect the age of the cell.
     */
    age() {
        this.led.normalizedIntensity =
            Math.min(1, this.led.normalizedIntensity + GameOfLifeCell._agingPerGeneration);
    }

    /**
     * Sets or remove the 'on' attribute on the LED for 
     * this cell based on its isAlive state.
     * If not alive, reset the normalizedIntensity to 0 on the LED.
     */
    update() {
        if (this.isAlive) {
            this.led.on = true;
        }
        else {
            this.led.normalizedIntensity = 0;
            this.led.on = false;
        }
    }
}