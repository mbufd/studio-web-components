import { GameOfLife } from './game-of-life-main.js';
import { GameOfLifePatternLoader } from './game-of-life-seeder.js';
import { SiteOverlay } from '../../../../site-overlay.js'; // Utility for effects only

/**
 * Housekeeping to host the game of life as an example
 */
export class Example {
    static _gameOfLife; // The game board and logic
    static _patterns; // Patterns for the game
    static _hostElement = null; // Element where to display the game
    static _starting = false; // Protect against fast repeated starts

    static run() {
        if (this._hostElement === null) {
            // Get the host element where to run the game
            this._hostElement = document.querySelector('#life-game-cells');

            // Get our pattern data from a JSON file
            const patternFile = 'component/led/app/example/game-of-life-patterns.json';
            GameOfLifePatternLoader.load(patternFile).then((patterns) => {
                this._patterns = patterns;
            });

            // A single game is enough for this example
            Example._gameOfLife = new GameOfLife();
            Example.startGameOfLife();

            // Restart game, for instance when called from HTML on a button
            window.restartGame = () => {
                Example.startGameOfLife();
            }

            // Restart game when our UI Kit tab is displayed
            const ledExampleId = 'led-example';
            UIkit.util.on(`#${ledExampleId}`, 'show', (event) => {
                if (event.target.id == ledExampleId) {
                    Example.startGameOfLife();
                }
            });
        }
    }

    static startGameOfLife() {
        if (!Example._starting) { // protect against fast repeated starts
            Example._starting = true;
            Example._gameOfLife.stop();
            // Just animate a title, then start the game
            new SiteOverlay('#game-of-life-overlay').animate(() => {
                Example._starting = false;
                Example._gameOfLife.start(this._hostElement, this._patterns);
            });
        }
    }
}