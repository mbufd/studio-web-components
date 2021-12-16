import { Interactor } from './interactor.js';
import { Geometry } from './geometry.js';

/**
 * A pencil for drawing on the canvas.
 * The pencil is constrained to follow a a mask, if provided.
 */
export class Pencil extends Interactor {
    _selectedColor = 'black';
    _canvas = null;
    _isDown = false;
    _lastPoint = null;
    _mask = null;
    _retainMaskEdge = null;

    constructor(hostDiv) {
        super(hostDiv);
        // Bind the color patch selector divs
        this.bindElements();
    }

    bindElements() {
        // Bind with the canvas
        this._canvas = document.querySelector(`#drawing-canvas`);
        this._canvas.addEventListener('pointerdown', this.onPointerDown);
    }

    /** 
     * If not null, the pencil will follow the closest edge on the mask 
     * when the pointer is inside the mask
     */
    set mask(value) {
        this._mask = value;
    }

    // Sets the color to draw with
    set selectedColor(value) {
        this._selectedColor = value;
    }

    // On pointer down
    onInteractionStart(_) {
        this._isDown = true;
        // Make sure the canvas dimensions are up to date
        this.setCanvasDimensions();
    }

    // On pointer up
    onInteractionEnd(_) {
        this._isDown = false;
        this._lastPoint = null;
        this._closestEdge = null;
    }

    // On pointer move, draw and constrain to mask
    onInteractionMove(pointerEvent) {
        if (this._canvas && this._isDown) {
            // Use the point in the local CS of the graphics page element
            const boundingRect = this.hostBoundingRect;
            let pt = {
                x: pointerEvent.x - boundingRect.x,
                y: pointerEvent.y - boundingRect.y
            }
            // Check if point is inside the mask polygon
            const pointIsInMask = this._mask && Geometry.pointInPolygon(pt.x, pt.y, this._mask);
            if (pointIsInMask) {
                // The point is inside the mask, constrain position to the mask and retain the same edge until outside mask again
                const closest = Geometry.getClosestPoint(pt, this._mask, this._retainMaskEdge);
                pt = closest.point;
                this._retainMaskEdge = closest.edge;
            }
            else {
                this._retainMaskEdge = null; // Went outside the mask, don't retain an edge
            }
            // Draw the line for this move
            if (this._lastPoint !== null) {
                this.drawLine(this._lastPoint, pt, this._selectedColor);
            }
            this._lastPoint = pt;
        }
    }


    onHostResized() {
        this.eraseAll();
    }

    setCanvasDimensions() {
        const currentDimensions = {
            x: this._canvas.getAttribute('width'),
            y: this._canvas.getAttribute('height')
        };
        const boundingRect = this.hostBoundingRect;
        const newDimensions = {
            x: boundingRect.width,
            y: boundingRect.height
        }
        if (currentDimensions.x != newDimensions.x || currentDimensions.y != newDimensions.y) {
            // Set the dimension attributes on the canvas element
            this.eraseAll();
            this._canvas.setAttribute('width', boundingRect.width);
            this._canvas.setAttribute('height', boundingRect.height);
        }
    }

    eraseAll() {
        const ctx = this._canvas.getContext('2d');
        ctx.clearRect(0, 0, this._canvas.width, this._canvas.height);
    }

    drawLine(from, to, color) {
        const ctx = this._canvas.getContext('2d');
        ctx.strokeStyle = color;
        ctx.beginPath();
        ctx.moveTo(from.x, from.y);
        ctx.lineTo(to.x, to.y);
        ctx.stroke();
    }
}
