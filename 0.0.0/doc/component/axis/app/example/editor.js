import { PlasticRuler } from './plastic-ruler.js';
import { Pencil } from './pencil.js';

export class Editor {
    _colorPatchDivs = [];
    static _plasticRuler = null;
    static _pencil = null;

    constructor(hostDiv) {
        this.bindElements();
        this._plasticRuler = new PlasticRuler(hostDiv, (rulerActivated) => {
            this.activateRuler(rulerActivated);
        });
        this._pencil = new Pencil(hostDiv);
        this._pencil.setInteractionCallback((_, pencilIsInteracting) => {
            this._plasticRuler.enablePointerEvents(!pencilIsInteracting);
        });
        this.activateRuler(false);
        this.selectColor(this._colorPatchDivs[0]);
    }

    bindElements() {
        // Bind with the color patch buttons
        const colorPatches = document.querySelectorAll('.eg-color-patch');
        colorPatches.forEach((colorDiv) => {
            this._colorPatchDivs.push(colorDiv);
            colorDiv.addEventListener('click', this.onSelectColor);
        });
        // Bind with the clear button
        const clearDiv = document.querySelector(`#clear`);
        clearDiv.addEventListener('click', this.onClear);
    }

    onSelectColor = (ev) => {
        this.selectColor(ev.target);
    }

    selectColor(colorPatchDiv) {
        this.showIcon(colorPatchDiv);
        const styles = window.getComputedStyle(colorPatchDiv);
        this._pencil.selectedColor = styles.getPropertyValue('background-color');
        this.activateRuler(false);
    }

    onClear = () => {
        this._pencil.eraseAll();
    }

    activateRuler(active) {
        this._plasticRuler.active = active;
        this._pencil.active = !active;
        if (this._pencil.active) {
            this._pencil.mask = this._plasticRuler.polygon;
        }
    }

    showIcon(showColorPatchDiv) {
        this._colorPatchDivs.forEach((colorPatchDiv) => {
            const colorIcon = colorPatchDiv.children[0];
            colorPatchDiv == showColorPatchDiv ? 
                colorIcon.removeAttribute('hidden') :
                colorIcon.setAttribute('hidden', '');
        });
    }
}