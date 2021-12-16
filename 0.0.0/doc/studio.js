/**
 * Import and export the flavor of the components you need for this application.
 * - for produdction., import from dist/lib/
 * - for debug, import from '/dev-dist/debug/lib/
 * 
 * From a JS module, then import from this file, e.g.:
 *   import { StudioLedElement } from '/dist/lib/studio.js';
 * 
 * This isolates the path from the application code. Alternatively you
 * can use a development web server to configure for lib to point to either
 * lib or lib-debug depending on the mode you want to use.
 */
import { 
    StudioAxisElement,
    StudioLabelElement,
    StudioLedElement, 
    StudioPadElement,
    StudioSliderElement
} 
from '../dist/lib/studio-web-components.js';
// from '../dev-dist/debug/lib/studio-web-components.js';

export { 
    StudioAxisElement,
    StudioLabelElement,
    StudioLedElement,
    StudioPadElement,
    StudioSliderElement
}
    