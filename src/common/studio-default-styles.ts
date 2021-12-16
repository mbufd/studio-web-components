/**
 * Shared styles for components
 */
import { css } from 'lit';

export const defaultStyles = css`
:host, div {
    display: inline-block;
}
:root, :host {
    /* Disable selection */
    -moz-user-select: none;
    -khtml-user-select: none;
    -webkit-user-select: none;
    user-select: none;
    /* Disable special actions */
    -webkit-tap-highlight-color: transparent;
    -webkit-touch-callout: none !important;
    -webkit-user-callout: none !important;

    background-color: transparent;
    line-height: 1;
}
/* Fit to parent */
.fit {
    width: 100%;
    height: 100%;
}
/* Turn off selection */
.no-select {
    -moz-user-select: none;
    -khtml-user-select: none;
    -webkit-user-select: none;
    user-select: none;
}
/* Turn off default browser actions */
.no-action {
    -webkit-tap-highlight-color: transparent;
    -webkit-touch-callout: none !important;
    touch-action: none;
}
`;
