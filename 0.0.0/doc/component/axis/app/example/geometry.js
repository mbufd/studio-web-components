/**
 * geometry.js
 * A small set of geometry functions for the plastic ruler example
 */
export class Geometry {

    // Rotates the point (x,y) around the specified center
    static rotatePointAroundCenter(x, y, angleRad, center) {
        const rotatedAround0 = Geometry.rotatePointAround0(x - center.x, y - center.y, angleRad);
        return { // Translate back to original position
            x: rotatedAround0.x + center.x,
            y: rotatedAround0.y + center.y
        }
    }

    // Rotates the point (x,y) around (0,0)
    static rotatePointAround0(x, y, angleRad) {
        const cos = Math.cos(angleRad);
        const sin = Math.sin(angleRad);
        return {
            x: (x * cos) - (y * sin),
            y: (x * sin) + (y * cos)
        }
    }

    /**
     * Returns true only if point is in polygon 
     * ray-casting algorithm based on
     * https://wrf.ecse.rpi.edu/Research/Short_Notes/pnpoly.html/pnpoly.html
     */
    static pointInPolygon(x, y, polygon) {
        let inside = false;
        for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
            const xi = polygon[i].x, yi = polygon[i].y;
            const xj = polygon[j].x, yj = polygon[j].y;
            const intersect = ((yi > y) != (yj > y)) && (x < (xj - xi) * (y - yi) / (yj - yi) + xi);
            if (intersect) inside = !inside;
        }
        return inside;
    }

    /** 
     * Returns closest point to polygon, members:
     *   point: closest point
     *   edge: edge where point found
     *   distance: distance from point
     * If edge is not null on input, computes only for that edge
     */
    static getClosestPoint(point, polygon, edge = null) {
        let closest = null;
        for (let i = 0; i < polygon.length; i++) {
            if (edge === null || edge === i) {
                const a = polygon[i];
                const b = polygon[(i + 1) % polygon.length];
                const projected = Geometry.projectPoint(point, a, b);
                const distance = Geometry.computeDistanceSquared(projected.point, point);
                if (closest === null || distance < closest.distance) {
                    closest = {
                        point: projected.point,
                        edge: i,
                        distance: distance
                    }
                }
            }
        }
        return closest;
    }

    // Returns distance squared between two points
    static computeDistanceSquared(p1, p2) {
        const dx = p1.x - p2.x;
        const dy = p1.y - p2.y;
        return (dx * dx) + (dy * dy);
    }

    // Projects a point onto the line from a to b
    static projectPoint(point, a, b) {
        let atob = { x: b.x - a.x, y: b.y - a.y };
        let atop = { x: point.x - a.x, y: point.y - a.y };
        let len = atob.x * atob.x + atob.y * atob.y;
        let dot = atop.x * atob.x + atop.y * atob.y;
        let t = Math.min(1, Math.max(0, dot / len));
        dot = (b.x - a.x) * (point.y - a.y) - (b.y - a.y) * (point.x - a.x);
        return {
            point: {
                x: a.x + atob.x * t,
                y: a.y + atob.y * t
            },
            left: dot < 1,
            dot: dot,
            t: t
        };
    }
}
