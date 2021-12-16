// Plain JavaScript <studio-pad> event listener
// Displays event type and coordinates inside the pad
export class PadEventListener {
    _element = null;
    _secondaryElement = null;
    constructor(elementSelector) {
        this._element = document.querySelector(elementSelector);
        this._primaryElement = document.querySelector(`${elementSelector}-primary`);
        this._secondaryElement = document.querySelector(`${elementSelector}-secondary`);
        if (this._element) {
            this._element.addEventListener('studio-pad-down', (event) => {
                this.update(event);
            });
            this._element.addEventListener('studio-pad-up', (event) => {
                this.update(event);
            });
            this._element.addEventListener('studio-pad-swipe', (event) => {
                this.update(event);
            });
            this._element.addEventListener('studio-pad-move', (event) => {
                this.update(event);
            });
        }
    }
    update(event) {
        // Primary content is event type
        this._primaryElement.innerHTML = event.type;
        // Secondary content are the coordinates
        const x = event.studio.offset.x.toFixed(2);
        const y = event.studio.offset.y.toFixed(2);
        this._secondaryElement.innerHTML = `(${x}, ${y})`;
    }
}