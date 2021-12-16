import { Editor } from './editor.js';

export class Example {
    static _editor = null;

    static run() {
        if (Example._editor === null) {
            const hostDiv = document.querySelector('#graphics-page');
            this._editor = new Editor(hostDiv);
        }
    }
}