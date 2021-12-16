/**
 * game-of-life-seeder.js
 */
import { siteFile } from '../../../../site-file.js';

/**
 * A pattern is a symbol (relative) which can be placed (absolute)
 */
export class GameOfLifePattern {
    _pattern;
    constructor(pattern) {
        this._pattern = pattern;
    }
    get name() {
        return this._pattern.name;
    }
    get locations() {
        return this._pattern.locations;
    }
    /**
     * Expands the pattern to a set of cells by translating the 
     * pattern's locations by (col,row)
     */
    place(col, row) {
        const cells = new Array(this._pattern.locations.length);
        for (let i = 0; i < this._pattern.locations.length; i++) {
            const location = this._pattern.locations[i];
            cells[i] = {
                col: col + location.col,
                row: row + location.row
            }
        }
        return cells;
    }
}

/**
 * Manages the seeding of cells from patterns
 */
export class GameOfLifeSeeder{
    // A registry of basic patterns
    static _registeredPatterns = {};
    static register(pattern) {
        if (!GameOfLifeSeeder._registeredPatterns[pattern.name]) {
            GameOfLifeSeeder._registeredPatterns[pattern.name] = pattern;
        }
    }
    /**
     * Seeds a board by placing registered patterns as cells at specific locations.
     * @param seeds is an array of { type, col, row } each defining the specific 
     * placement of a pattern.
     * @returns an array of { col, row } containing the locations of the placed
     * cells
     */
    seed(seeds) {
        let placedCells = [];
        seeds.forEach((seed) => {
            const pattern = GameOfLifeSeeder._registeredPatterns[seed.type];
            if (pattern) {
                placedCells = [...placedCells, ...pattern.place(seed.col, seed.row)];
            }
        });
        return placedCells;
    }
}

/**
 * JSON file loader for patterns and seed data
 */
export class GameOfLifePatternLoader {
    static load(patternFile) {
        return new Promise((resolve, reject) => {
            siteFile.loadFile(patternFile).then((jsonPatterns) => {
                const patterns = JSON.parse(jsonPatterns);
                Object.keys(patterns.primitives).forEach((patternKey) => {
                    const pattern = patterns.primitives[patternKey];
                    GameOfLifeSeeder.register(new GameOfLifePattern(pattern));
                });  
                resolve(patterns);
            }).catch(reject);
        });
    }
}
