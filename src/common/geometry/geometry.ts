/**
 * Very basic geometry
 */

export interface IGeometryPoint {
    x: number;
    y: number;
};

export interface IGeometryRect {
    left: number;
    right: number;
    top: number;
    bottom: number;
};

export function isInRect(x: number, y: number, rect: IGeometryRect | DOMRect) {
    return x >= rect.left && x <= rect.right && y >= rect.top && y <= rect.bottom;
}