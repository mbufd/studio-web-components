import { css } from 'lit';
import { defaultStyles } from '../common/studio-default-styles';

const designTokens = css`
 :host {
   /* size */
   --studio-width: var(--studio-size-3b);
   --studio-height: var(--studio-size-3b);
   /* color */
   --studio-content-color: white;
   --studio-fx-color: var(--studio-content-color);
   --studio-surface-color: var(--studio-default-surface-color);
   --studio-font-size: var(--studio-size-font-s);
   --studio-highlight-color: var(--studio-ink-30);
   --studio-selected-highlight-color: var(--studio-content-color);
   --studio-uniform-color: var(--studio-neutral);
   /* Adjusted sizes */
   --studio-pad-width: max(var(--studio-width), var(--studio-size-1b));
   --studio-pad-height: max(var(--studio-height), var(--studio-size-1b));
 }
`;

const hostStyles = css`
:host {
    display: block;
    border-radius: 2px;
    border-width: 0;
    font-family: var(--studio-font-family);
    font-size: var(--studio-font-size);
    line-height: 1;
    /* size */
    width: var(--studio-pad-width);
    height: var(--studio-pad-height);

    /* selection */
    -moz-user-select: none;
    -khtml-user-select: none;
    -webkit-user-select: none;
    user-select: none;
    -webkit-tap-highlight-color: transparent;
    -webkit-touch-callout: none !important;
    touch-action: none;
}
`;

const surfaceStyles = css`
#surface {
    /* display */
    position: relative;
    /* shape */
    border-radius: 2px;
    border-width: 0;
    /* size */
    width: var(--studio-pad-width);
    height: var(--studio-pad-height);
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
:host([uniform]) #surface {
    background-color: var(--studio-uniform-color);
}
#surface.active {
    box-shadow: inset 0px 0px 0px 1px var(--studio-highlight-color);
    background-color: var(--studio-surface-color);
}
`;

const innerstyles = css`
#inner {
    margin: var(--studio-size-1u);
    cursor: pointer;
    /* shape */
    border-radius: 2px;
    border-width: 0;
    /* size */
    width: calc(var(--studio-pad-width) - calc(var(--studio-size-1u) * 2));
    height: calc(var(--studio-pad-height) - calc(var(--studio-size-1u) * 2));
    /* appearance */
    background-color: var(--studio-surface-color);
    /* selection */
    -moz-user-select: none;
    -khtml-user-select: none;
    -webkit-user-select: none;
    user-select: none;
    -webkit-tap-highlight-color: transparent;
    -webkit-touch-callout: none !important;
    touch-action: none;
}
:host([uniform]) #inner {
    background-color: var(--studio-uniform-color);
}
#inner.active  {
    background-color: var(--studio-surface-color) !important;
    filter: brightness(115%);
}
@media (hover: hover) { /* Only hover on capable devices */
    :host([uniform]) #inner:hover,
    #inner:hover { 
        background-color: var(--studio-surface-color) !important;
        filter: brightness(115%);
    }
}
:host([selected]) #inner { /* in selected state, highlight the inner div's border */
    background-color: var(--studio-surface-color);
    box-shadow: inset 0px 0px 0px 1px var(--studio-selected-highlight-color);
}
#inner-content {
    position: relative;
    left: 0px;
    top: 0px;
    width: calc(var(--studio-pad-width) - calc(var(--studio-size-1u) * 2));
    height: calc(var(--studio-pad-height) - calc(var(--studio-size-1u) * 2));
    pointer-events: none;
}
`;

const contentStyles = css`
.absolute {
   position: absolute;
}
.content {
    /* display */
    display: flex;
    flex-direction: column;
    margin-left: var(--studio-size-1u);
    margin-right: var(--studio-size-1u);
    /* selection */
    -moz-user-select: none;
    -khtml-user-select: none;
    -webkit-user-select: none;
    user-select: none;
    -webkit-tap-highlight-color: transparent;
    touch-action: none;
}
#default-content {
    margin-top: var(--studio-size-1u);
}
:host([bold]) #default-content {
    font-weight: 600;
}
#secondary-content{
    /* display */
    margin-top: var(--studio-size-1u);
    /* appearance */
    opacity: .8;
    /* text */ 
    font-size: 80%;
    font-weight: 400;
    /* selection */
    -moz-user-select: none;
    -khtml-user-select: none;
    -webkit-user-select: none;
    user-select: none;
    -webkit-tap-highlight-color: transparent;
    touch-action: none;
}
slot {
    pointer-events: none; /* Needed otherwise will by skippy over slotted content */
}
`;

const labelStyles = css`   
.label {
    position: absolute;
    overflow: hidden;
    line-height: 0;
} 
#label-top {
    top: 0;
    left: 50%;
    transform: translate(-50%, 0);
}
:host([inset-label]) #label-top {
    top: var(--studio-size-1u);
}
#label-bottom {
    bottom: 0;
    left: 50%;
    transform: translate(-50%, 0);
}
:host([inset-label]) #label-bottom {
    bottom: var(--studio-size-1u);
}
#label-left {
    top: 50%;
    left: 0;
    transform: translate(0, -50%);
}
:host([inset-label]) #label-left {
    left: var(--studio-size-1u);
}
#label-right {
    top: 50%;
    right: 0;
    transform: translate(0, -50%);
}
:host([inset-label]) #label-right {
    right: var(--studio-size-1u);
}
`;

const animationStyles = css`
.fx {
    position: absolute;
    display: inline;
    z-index: 10;
    top: 0;
    left: 0;
    background-color: var(--studio-fx-color);
    opacity: .5;
    visibility: hidden;
}
#fx-center {
    width: 5px;
    height: 5px;
    border-radius: 50%;
    opacity: 1;
}
#fx-x {
    width: 3px;
    height: 100%;
}
#fx-y {
    width: 100%;
    height: 3px;
}
`;

/* The complete styling for the component */
export const styles = [
    defaultStyles,
    designTokens,
    hostStyles,
    surfaceStyles,
    innerstyles,
    contentStyles,
    labelStyles,
    animationStyles
];