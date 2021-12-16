import { Geometry } from './geometry.js';

/**
 * Polygon representation of the plastic ruler HTML div element.
 * (Useful to create a mask for editing)
 */
export class PlasticRulerPolygon {
    _original = null;
    constructor() {
        this._plasticRulerDiv = document.querySelector('#plastic-ruler');
        this._rotationHandleDiv = document.querySelector('#rotation-handle');
        // Get the original shape of the full plastic ruler (untransformed)
        this._original = {
            points: [
                { x: 0, y: - this._rotationHandleDiv.offsetHeight },
                { x: this._plasticRulerDiv.offsetWidth, y: - this._rotationHandleDiv.offsetHeight },
                { x: this._plasticRulerDiv.offsetWidth, y: this._plasticRulerDiv.offsetHeight - this._rotationHandleDiv.offsetHeight },
                { x: 0, y: this._plasticRulerDiv.offsetHeight - this._rotationHandleDiv.offsetHeight }
            ],
            center: {
                x: this._plasticRulerDiv.offsetWidth / 2,
                y: (this._plasticRulerDiv.offsetHeight - (2 * this._rotationHandleDiv.offsetHeight)) / 2
            }
        }
    }
    /**
    * Applies rotation then translation to the original shape.
    * Returns the following members in the result object:
    *   points as an array of {x: number, y: number}
    *   center as a {x: number, y: number}
    */
    transform(transform) {
        const original = this._original;
        // Rotate
        const polygon = [
            Geometry.rotatePointAroundCenter(original.points[0].x, original.points[0].y, transform.angleRad, original.center),
            Geometry.rotatePointAroundCenter(original.points[1].x, original.points[1].y, transform.angleRad, original.center),
            Geometry.rotatePointAroundCenter(original.points[2].x, original.points[2].y, transform.angleRad, original.center),
            Geometry.rotatePointAroundCenter(original.points[3].x, original.points[3].y, transform.angleRad, original.center),
        ];
        // Translate
        for (let i = 0; i < polygon.length; i++) {
            polygon[i].x += transform.translation.x,
                polygon[i].y += transform.translation.y
        }
        return polygon;
    }
}
