import { css } from 'lit';
import { defaultStyles } from '../common/studio-default-styles';

/**
 * Design tokens
 */
const designTokens = css`
    :host {
      /* size */
      --studio-width: var(--studio-size-3u);
      --studio-height: var(--studio-width); /* square or cicle */
      /* when intensity = 0 */
      --studio-led-off-opacity: 0.2;
      /* border styling */
      --studio-border-color: var(--studio-spruce);
      --studio-border-width: 1px;
      /* surface styling */
      --studio-surface-color: var(--studio-lime);
    }
`;

/**
 *   Host styling
 */
const hostStyles = css`
    :host {
      display: inline-block;
      width: var(--studio-width);
      height: var(--studio-height);
      pointer-events: none;
      /* "private" properties */  
      --rounded-radius: calc(min(var(--studio-width), var(--studio-height))/2);
      --angled-radius: 1px;
      --led-opacity-on: 1;
    }
`;

/**
 *   Border part styling
 */
const borderStyles = css`
    #border {
      display: block;
      overflow: hidden; /* the surface part will be limited to the border part */
      pointer-events: none;
      /* minus 2px on width and height to account for border width */
      width: calc(100% - calc(2 * var(--studio-border-width)));
      height: calc(100% - calc(2 * var(--studio-border-width)));
      /* border */
      border-style: solid;
      border-width: var(--studio-border-width);
      border-color: var(--studio-border-color);
      border-radius: var(--circle-radius);
      background-color: transparent;
    }
    :host([corners='angled']) #border {
      border-radius: var(--angled-radius); 
    }
    :host([corners='rounded']) #border {
      border-radius: var(--rounded-radius);
    }
`;

/** 
  * Surface part styling
  * The surface of the LED serves as a fill color within the bounds of the border part.
  */
const surfaceStyles = css`
    #surface {
      display: block; 
      overflow: hidden;
      pointer-events: none;
      background-color: var(--studio-surface-color);
      opacity: var(--studio-led-off-opacity);
      /* Cover 100% of the border part area */
      width: 100%;
      height: 100%;
    }

    :host([on]) #surface {
      filter: brightness(var(--studio-led-light-brightness));
      opacity: var(--led-opacity-on);
    }
    :host([corners='angled']) #surface {
      border-radius: var(--angled-radius); 
    }
    :host([corners='rounded']) #surface {
      border-radius: var(--rounded-radius);
    }
`;

const clickableStyles = css`
    :host([clickable]) #border,
    :host([clickable]) #surface {
      pointer-events: auto;
      cursor: pointer;
    }
`;

/* The complete styling for the component */
export const styles = [
    defaultStyles, 
    designTokens,
    hostStyles,
    surfaceStyles,
    borderStyles,
    clickableStyles
];