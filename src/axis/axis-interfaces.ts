/**
 * Generic options for an axis
 */
import { CSSValue } from '../common/util/css-value';

// Properties of a tick mark
export interface ITickMark {
    length: CSSValue;
    weight: number;
    rounded: boolean;
}

// Interface
export interface IAxisOptions {
    /* Axix size */
    width: number;
    height: number;
    /* Ticks */
    majorSections: number;
    majorMark: ITickMark;
    minorSections: number;
    minorMark: ITickMark;
    /* Presense on either side */
    leftSideTicks: boolean; // top when horizontal or left when vertical
    rightSideTicks: boolean; // bottom when horizontal or right when vertical
    centerTicks: boolean;
    /* Orientation */
    vertical: boolean;
}

// Axis with default property values
export class AxisOptions implements IAxisOptions {
    width = 32;
    height = 180;
    majorSections = 10;
    majorMark = { weight: 1, length: CSSValue.fromCSSString('33%'), rounded: false };
    minorSections = 5;
    minorMark = { weight: 1, length: CSSValue.fromCSSString('20%'), rounded: false };
    leftSideTicks = true;
    rightSideTicks = true;
    centerTicks = false;
    vertical = true;
}