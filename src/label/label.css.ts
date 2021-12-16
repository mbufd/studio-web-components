import { css } from 'lit';
import { defaultStyles } from '../common/studio-default-styles';

/**
 * Design tokens
 */
const designTokens = css`
 :host {
   /* size */
   --studio-length: var(--studio-size-4b);
   --studio-thickness: var(--studio-size-4u);
   /* font size, no more than 3u and no more than 65% thickness */
   --studio-label-font-size: min(var(--studio-size-3u), calc(var(--studio-thickness) * .65));
   /* color */
   --studio-content-color: white;
   --studio-surface-color: var(--studio-default-surface-color);
   /* accent */
   --studio-accent-color: var(--studio-tangerine);
   --studio-label-accent-length: var(--studio-size-1u);
 }
`;

/**
 *   Host styling
 */
const hostStyles = css`
 :host {
    display: block;
    border-radius: 1px;
    width: var(--studio-length);
    height: var(--studio-thickness);
    line-height: var(--studio-thickness);
    font-family: var(--studio-font-family);
 }
 :host([orientation='90r']),
 :host([orientation='90l']) {
    /* swap length and thickness when vertical */
    height: var(--studio-length);
    width: var(--studio-thickness);
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
    align-items: center;
    justify-content: center;
    z-index: 0;
    overflow: hidden;
    padding: 0;
    /* size */
    width: 100%;
    height: 100%;
    /* shape */
    border-radius: 1px;
    /* appearance */
    background-color: var(--studio-surface-color);
    color: var(--studio-content-color);
    /* text */
    font-family: var(--studio-font-family);
    font-size: var(--studio-label-font-size);
    text-align: center;
}
:host([orientation='90r']) #surface {
    writing-mode: vertical-rl;
    text-orientation: sideways;
}
:host([orientation='90l']) #surface {
    writing-mode: vertical-rl;
    text-orientation: sideways;
    transform: rotate(-180deg);
}
`;

const contentStyling = css`
#content {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 2;
}
#default-slot {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
}
`;

/**
 * Accent styling
 */
const accentStyles = css`
.accent {
    /* display */
    position: absolute;
    z-index: 1;
    /* size */
    width: var(--studio-label-accent-length);
    height: 100%;
    /* appearance */
    background: transparent;
}
:host([accent='s']) #accent-start,
:host([accent='se']) #accent-start {
    background: var(--studio-accent-color);
}
:host([accent='e']) #accent-end,
:host([accent='se']) #accent-end {
    background: var(--studio-accent-color);
}
:host([orientation='h']) #accent-start {
    /* display */
    top: 0;
    left: 0;
}
:host([orientation='h']) #accent-end {
    /* display */
    top: 0;
    right: 0;
}
:host([orientation='90l']) #accent-start,
:host([orientation='90r']) #accent-start {
    top: 0;
    left: 0;
    height: var(--studio-label-accent-length);
    width: 100%;
}
:host([orientation='90l']) #accent-end,
:host([orientation='90r']) #accent-end {
    bottom: 0;
    left: 0;
    height: var(--studio-label-accent-length);
    width: 100%;
}
`;

/* The complete styling for the component */
export const styles = [
    defaultStyles,
    designTokens,
    hostStyles,
    surfaceStyles,
    contentStyling,
    accentStyles
];