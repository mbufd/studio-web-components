/**
 *  game-of-life-main.js
 * 
 *  Main JS code for the game of life example.
 */
import { GameOfLifeCell } from './game-of-life-cell.js';
import { GameOfLifePattern, GameOfLifeSeeder } from './game-of-life-seeder.js';
import { Looper } from '../../../../site-looper.js';

/** 
 * A straightforward, brute force implementation that plays 
 * John Conway's game of life.
 * 
 * The board wraps horizontally and vertically 
 * (unlike the infinite board on the real game)
 */
export class GameOfLife {
    _size = 25; /* Match with size in game-of-life.css */
    _playIntervalMs = 50;
    _cells = new Array(this._size * this._size);
    _hostElement = null;
    _changedCells = [];
    _agingCells = [];
    _patterns = null;
    _patternTypeToPlace = 'blinker'; // See the JSON file
    _looper = new Looper();

    /**
     * Create the board, initialize the cells with a pattern 
     * and play in loop. 
     * 
     * @param hostElement is a div where to insert the game of life board.
     * @param patterns is a js object containing the patterns such as parsed
     * from our game-of-life-patterns.json data source.
     */
    start(hostElement, patterns) {
        this._hostElement = hostElement;
        if (this._hostElement) {
            this.stop();
            this._patterns = patterns;
            this.createBoard();
            this.initializeCells();
            // Run in a loop
            this._looper.start(() => {
                // Continue while the loop has not been stopped
                if (this._looper.isRunning) {
                    this.playNextGeneration();
                }
            }, this._playIntervalMs);
        }
    }

    /**
     * Stop the game
     */
    stop() {
        this._looper.stop();
        if (this._hostElement) {
            while (this._hostElement.firstChild) {
                this._hostElement.removeChild(this._hostElement.firstChild);
            }
        }
    }

    /**
     * Initialize the board with no pattern.
     * - rows are styled with .life-row
     * - cells LEDs are style with .life-led
     */
    createBoard() {
        for (let row = 0; row < this._size; row++) {
            const div = document.createElement('div');
            div.classList.add('cell-row');
            for (let col = 0; col < this._size; col++) {
                const cell = new GameOfLifeCell('cell-led', () => {
                    // Placing  manually in reaction to click on LED
                    this.placePattern(this._patternTypeToPlace, col, row);
                });
                this._cells[(row * this._size) + col] = cell;
                div.append(cell.led);
            }
            this._hostElement.append(div);
        }
    }

    /**
     *  Place a pattern at the specified location
     */
    placePattern(type, col, row) {
        const pattern = new GameOfLifePattern(this._patterns.primitives[type]);
        const patternLocations = pattern.place(col, row);
        patternLocations.forEach((patternLocation) => {
            const targetCell = this.getCell(patternLocation.col, patternLocation.row);
            targetCell.isAlive = true;
        });
    }

    /**
     * Initialize cells on the board based on an 
     * existing pattern
     */
    initializeCells() {
        const seeder = new GameOfLifeSeeder();
        const gameOfLifePatterns = seeder.seed(this._patterns.boards.default);
        gameOfLifePatterns.forEach((patternCell) => {
            const cell = this.getCell(patternCell.col, patternCell.row);
            cell.isAlive = true;
            cell.update();
        });
    }

    /**
     * Returns the cell at position (col,row), 
     * wrapping horizontally and vertically across the board.
     */
    getCell(col, row) {
        const x = (col + this._size) % this._size;
        const y = (row + this._size) % this._size;
        const cell = this._cells[(y * this._size) + x];
        return cell;
    }

    /**
     * Compute, apply and display the next generation
     */
    playNextGeneration() {
        // Compute what will happen at the next genration
        this.computeNextGeneration();
        // Apply the next generation
        this.applyNextGeneration();
    }

    /**
     * Compute changes for the next generation
     * - invert isAlive on live cells that are dying
     * - invert isAlive on cells to be newborns
     * - age cells that are alive and remain alive
     */
    computeNextGeneration() {
        for (let row = 0; row < this._size; row++) {
            for (let col = 0; col < this._size; col++) {
                const count = this.countLivingNeighbours(col, row);
                const cell = this.getCell(col, row);
                cell.invert = false
                if (cell.isAlive) {
                    if (count < 2 || count > 3) {
                        cell.invert = true; // Death
                    }
                    else {
                        cell.age(); // Increase the age
                    }
                }
                else {
                    if (count == 3) {
                        cell.invert = true; // Birth
                    }
                }
            }
        }
    }

    /**
     * Count how many of the 8 neighbours are alive
     */
    countLivingNeighbours(col, row) {
        let count = 0;
        for (let x = col - 1; x <= col + 1; x++) {
            for (let y = row - 1; y <= row + 1; y++) {
                if (x != col || y != row) {
                    const cell = this.getCell(x, y);
                    if (cell.isAlive) {
                        count++;
                    }
                }
            }
        }
        return count;
    }

    /**
     * Update any cell that is either changing state or 
     * that is still alive and aging.
     */
    applyNextGeneration() {
        for (let row = 0; row < this._size; row++) {
            for (let col = 0; col < this._size; col++) {
                const cell = this.getCell(col, row);
                if (cell.isAlive || cell.invert) {
                    if (cell.invert) {
                        cell.isAlive = !cell.isAlive;
                    }
                    cell.update();
                }
            }
        }
    }
}
