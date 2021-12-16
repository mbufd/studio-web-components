import { css } from 'lit';
import { defaultStyles } from '../common/studio-default-styles';

/**
 * Design tokens
 */
const designTokens = css`
:host {
    /* Color */
    --studio-surface-color: transparent;
    --studio-content-color: rgba(255,255,255,.7);
    --studio-accent-color: rgba(255,255,255,.3);
    /* Size */
    --studio-length: var(--studio-size-5b);
    --studio-thickness: var(--studio-size-1b);
 }
`;

/**
 *   Host styling
 */
const hostStyles = css`
:host([orientation='v']) {
    width: var(--studio-thickness);
    height: var(--studio-length);
}
:host([orientation='h']) {
    width: var(--studio-length);
    height: var(--studio-thickness);
}
 `;

/**
*   Surface styling
*/
const surfaceStyles = css`
#surface {
    background-color: var(--studio-surface-color);
}
:host([orientation='v']) #surface {
    width: var(--studio-thickness);
    height: var(--studio-length);
}
:host([orientation='h']) #surface {
    width: var(--studio-length);
    height: var(--studio-thickness);
}
`;

const contentStyling = css`
.major-marks {
    stroke: var(--studio-content-color);
}
.minor-marks {
    stroke: var(--studio-accent-color);
}
`;

/**
 * Accent styling
 */
const accentStyles = css`
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