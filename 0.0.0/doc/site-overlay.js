/**
 * Utility for effect only
 */
export class SiteOverlay {
    _defaultDuration = 3000; // full animation (fade in + fade out) duration
    _elementId = '';
    constructor(elementId) {
        this._elementId = elementId;
    }
    animate(callback, duration = this._defaultDuration) {
        this.show(() => {
            this.hide(() => {
                callback();
            }, duration / 2);
        }, duration / 2);
    }
    show(callback, duration = this._defaultDuration/2) {
        const overlay = this.getOverlay();
        if(overlay) {
            const animation = overlay.animate([
                { opacity: 0 },
                { opacity: 1 }
            ], {
                duration: duration
            });
            animation.onfinish = () => {
                callback();
            };    
        }
        else {
            callback();
        }
    }
    hide(callback, duration = this._defaultDuration/2) {
        const overlay = this.getOverlay();
        if(overlay) {
            const animation = overlay.animate([
                { opacity: 1 },
                { opacity: 0 }
            ], {
                duration: duration,
                forwards: true
            });
            animation.onfinish = () => {
                callback();
            };
        }
        else {
            callback();
        }
    }
    getOverlay() {
        return document.querySelector(this._elementId);
    }
}
