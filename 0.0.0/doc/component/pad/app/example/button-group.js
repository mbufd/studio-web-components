/**
 * A simple button group
 */
 export class ButtonGroup {
    _selectionAttribute; // Attibute 'selected' or 'bold' serving to indicate selection state
    _groupClass; // CSS class tagged on the button group

    /**
     * @param {*} groupClass // CSS class tagged on the button group
     * @param {*} selectionAttribute // Attibute 'selected' or 'bold' serving to indicate selection state
     */
    constructor(groupClass, selectionAttribute) {
        this._groupClass = groupClass;
        this._selectionAttribute = selectionAttribute;
    }

    /**
     * Clear all the buttons in the group.
     */
    clearGroupButtons() {
        const buttons = document.querySelectorAll(`.${this._groupClass}`);
        buttons.forEach((button) => {
            this.selectButton(button, false);
        });
    }
    /**
     * Select a single button in the group.
     */
    selectGroupButton(idSelector) {
        this.clearGroupButtons();
        const button = document.querySelector(idSelector);
        this.selectButton(button, true);
    }
    /** 
     * Select or deselect a button
    */
    selectButton(button, selected) {
        if (selected) {
            button.setAttribute(this._selectionAttribute, '');
        }
        else {
            button.removeAttribute(this._selectionAttribute);
        }
    }
}