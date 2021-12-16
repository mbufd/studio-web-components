import { css } from 'lit';
import { defaultStyles } from '../common/studio-default-styles';

/** 
 * Public design tokens
 */
const designTokens = css`
 :host {
   /* size */
   --studio-thickness: var(--studio-size-1b);
   --studio-length: var(--studio-size-5b);
   --studio-border-size: var(--studio-size-1u);
   --studio-font-size: var(--studio-size-font-xs);
   --studio-cursor-size: var(--studio-size-1b);
   /* color */
   --studio-content-color: white;
   --studio-surface-color: var(--studio-default-surface-color);
   --studio-accent-color: var(--studio-raven);
   --studio-inner-surface-color: transparent;
   --studio-cursor-range-color: transparent;
   --studio-cursor-color: var(--studio-accent-color);
   --studio-uniform-color: var(--studio-neutral);
 }
`;

/**
 * Internal, for implementation 
 */
const internalTokens = css`
:host {
   /* Limits */
   --studio-slider-min-thickness: var(--studio-size-4u);
   --studio-slider-min-length: var(--studio-size-2b);
   --studio-slider-min-cursor-size: var(--studio-size-4u);
   /* Adjusted sizes */
   --studio-slider-thickness: max(var(--studio-thickness), var(--studio-slider-min-thickness));
   --studio-slider-length: max(var(--studio-length), var(--studio-slider-min-length));
   --studio-slider-cursor-size: min(max(var(--studio-cursor-size), var(--studio-slider-min-cursor-size)), calc(var(--studio-slider-length)/3));
   --studio-slider-margin: var(--studio-size-4u);
   }
`;

/**
 *   Host styling
 */
 const hostStyles = css`
 :host {
    display: block;
    font-family: var(--studio-font-family);
    font-size: var(--studio-font-size);
 }
 `;

/**
*   Surface styling
*/
const surfaceStyles = css`
#surface {
    /* display */
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    z-index: 0;
    overflow: hidden;
    cursor: pointer;
    padding: 0;
    /* size */
    height: var(--studio-slider-length);
    width: var(--studio-slider-thickness);
    /* shape */
    border-radius: 2px;
    /* appearance */
    background-color: var(--studio-surface-color);
    color: var(--studio-content-color);
    /* selection */
    -moz-user-select: none;
    -khtml-user-select: none;
    -webkit-user-select: none;
    user-select: none;
    -webkit-tap-highlight-color: transparent;
    -webkit-touch-callout: none !important;
    touch-action: none;
}
:host([orientation='h']) #surface {
    /* swap length and thickness when horizontal */
    flex-direction: row;
    width: var(--studio-slider-length);
    height: var(--studio-slider-thickness);
 }
:host([uniform]) #surface:not(.active) {
    background-color: var(--studio-uniform-color);
}
:host([no-direct]) #surface,
:host([disabled]) #surface,
.disabled#surface {
    cursor: default;
}
`;

/**
 * Shared sliding range used by #inner-surface and #cursor-container
 */
const rangeStyles = css`
/* Inner and cursor ranges are within the border margins */
:host([orientation='v']) .range-thickness {
    width: calc(var(--studio-slider-thickness) - calc(var(--studio-border-size) * 2));
}
:host([orientation='h']) .range-thickness {
    height: calc(var(--studio-slider-thickness) - calc(var(--studio-border-size) * 2));
}
/* Inner and cursor ranges are within the border margins */
:host([orientation='v']) .border-margins {
    margin-left: var(--studio-border-size);
    margin-right: var(--studio-border-size);
    width: calc(var(--studio-slider-thickness) - calc(var(--studio-border-size) * 2));
}
:host([orientation='h']) .border-margins {
    margin-top: var(--studio-border-size);
    margin-bottom: var(--studio-border-size);
    height: calc(var(--studio-slider-thickness) - calc(var(--studio-border-size) * 2));
}
/* Inner range spans the surface's length less the start and end margins */
:host([orientation='v']) .inner-range {
    margin-top: var(--studio-slider-margin);  
    margin-bottom: var(--studio-slider-margin);
}
:host([orientation='h']) .inner-range {
    margin-left: var(--studio-slider-margin);  
    margin-right: var(--studio-slider-margin);
}
:host([orientation='v']) .inner-length {
    height: calc(var(--studio-slider-length) - calc(2 * var(--studio-slider-margin)));
}
:host([orientation='h']) .inner-length {
    width: calc(var(--studio-slider-length) - calc(2 * var(--studio-slider-margin)));
}
`;

/**
 * Default content styling
 */
 const contentStyles = css`
 .default-slot {
     position: absolute;
     top: 0;
     left: 0;
     overflow: hidden;
     display: flex;
     align-items: center;
     justify-content: center;
     z-index: 2;
     width: 100%;
     height: 100%;
     pointer-events: none;
 }
 :host([orientation='v']) .default-slot {
     text-orientation: sideways;
     writing-mode: vertical-rl;
     transform: rotate(-180deg);
 }
 `;


/**
 * Cursor range
 */
const cursorRangeStyles = css`
/* Cursor range spans the inner range less the thickness of the cursor */
#cursor-range {
    position: absolute;
    display: flex;
    z-index: 3;
    background-color: var(--studio-cursor-range-color);
    pointer-events: none;
}
:host([orientation='v']) #cursor-range {
    height: calc(var(--studio-slider-length) - calc(2 * var(--studio-slider-margin)) - var(--studio-slider-cursor-size));
}
:host([orientation='h']) #cursor-range {
    width: calc(var(--studio-slider-length) - calc(2 * var(--studio-slider-margin)) - var(--studio-slider-cursor-size));
}
`;

/**
 * Inner surface where the cursor is included
 */
const innerStyles = css`
#inner-surface {
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 2;
    background-color: var(--studio-inner-surface-color);
    border-radius: 1px;
}
:host([uniform]) #inner-surface:not(.active) {
    background-color: var(--studio-uniform-color);
}
`;

/**
 * Cursor-related styling
 */
const cursorStyles = css`
/* Cursor container */
#cursor-container {
    position: absolute;
    display: flex;
    z-index: 4;
    background-color: transparent;
    pointer-events: none;
}
:host([orientation='v']) #cursor-container {
    flex-direction: column;
    align-items: center;
    width: var(--studio-slider-thickness);
}
:host([orientation='h']) #cursor-container {
    flex-direction: row;
    align-items: center;
    height: var(--studio-slider-thickness);
}
/* Cursor */
#cursor {
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 5;
    border-radius: 1px;
    cursor: pointer;
    background-color: var(--studio-cursor-color);
    pointer-events: none;
    opacity: 0.9;
}
:host([orientation='v']) #cursor {
    top: 0;
    flex-direction: column;
    width: var(--studio-slider-thickness);
    height: var(--studio-slider-cursor-size);
}
:host([orientation='h']) #cursor {
    left: 0;
    flex-direction: row;
    width: var(--studio-slider-cursor-size);
    height: var(--studio-slider-thickness);
}
#cursor:hover,
#cursor:active {
    opacity: 0.85;
    filter: brightness(120%);
}
:host([disabled]) #cursor,
.disabled#cursor {
    opacity: 1;
    filter: none;
    cursor: default;
}
/* Cursor decoration */
#cursor-decoration {
    background-color: var(--studio-content-color);
    border-radius: var(--studio-size-1u);
    pointer-events: none;
}
:host([disabled]) #cursor-decoration,
.disabled#cursor-decoration { 
    opacity: .5;
}
:host([orientation='v']) #cursor-decoration {
    width: calc(var(--studio-slider-thickness) - var(--studio-size-2u));
    height: var(--studio-size-1u);
}
:host([orientation='h']) #cursor-decoration {
    width: var(--studio-size-1u);
    height: calc(var(--studio-slider-thickness) - var(--studio-size-2u));
}
`;

/**
 * Accent sides styling
 */
const accentStyles = css`
.accent {
    /* display */
    position: absolute;
    z-index: 3;
    /* size */
    width: 100%;
    height: 100%;
    /* appearance */
    background-color: var(--studio-accent-color);
    pointer-events: none;
}
:host([orientation='v']) #accent-tl {
    /* display */
    top: 0;
    left: 0;
    width: var(--studio-border-size);
}
:host([orientation='v']) #accent-br {
    /* display */
    top: 0;
    right: 0;
    width: var(--studio-border-size);
}
:host([orientation='h']) #accent-tl {
    top: 0;
    left: 0;
    height: var(--studio-border-size);
}
:host([orientation='h']) #accent-br {
    bottom: 0;
    left: 0;
    height: var(--studio-border-size);
}
`;

/**
 * Label areas styling
 */
const labelStyles = css`
.label {
    position: absolute;
    z-index: 2;
    background-color: transparent;
    pointer-events: none;
}
:host([orientation='v']) #label-end {
    top: 0;
    left: 0;
    width: var(--studio-slider-thickness);
    height: var(--studio-slider-margin);
}
:host([orientation='v']) #label-start {
    bottom: 0;
    left: 0;
    width: var(--studio-slider-thickness);
    height: var(--studio-slider-margin);
}
:host([orientation='h']) #label-start {
    top: 0;
    left: 0;
    width: var(--studio-slider-margin);
    height: var(--studio-slider-thickness);
}
:host([orientation='h']) #label-end {
    top: 0;
    right: 0;
    width: var(--studio-slider-margin);
    height: var(--studio-slider-thickness);
}
`;

/**
 * The complete styling for the component
 */
export const styles = [
    defaultStyles,
    designTokens,
    internalTokens,
    hostStyles,
    surfaceStyles,
    rangeStyles,
    cursorRangeStyles,
    innerStyles,
    cursorStyles,
    accentStyles,
    labelStyles,
    contentStyles
];