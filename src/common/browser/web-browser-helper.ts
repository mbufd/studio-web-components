import { IGeometryPoint } from '../geometry/geometry';
import { WebBrowserType } from './web-browser-type';

export class WebBrowserHelper {
    readonly browserType = new WebBrowserType();

    /**
     * Returns the local (x,y) offset from a pointer event, relative to 
     * the element (not to the browser page).
     * The local (x,y) are the coordinates where the click or touch happened inside the target element.
     * This normally would simply be pointerEvent.offsetX and pointerEvent.offsetY,
     * but Firefox does not support these properties in shadow DOM.
     */
    getPointerEventOffset(pointerEvent: any): IGeometryPoint | null {
        if(!pointerEvent) {
            return null;
        }
        const offset: IGeometryPoint = { x: 0, y: 0 };
        if (this.browserType.isFirefox) {
            /**
             * On Firefox, offsetX and offsetY are always 0: need to compute from other fields
             * See here: https://bugzilla.mozilla.org/show_bug.cgi?id=69787.
             * It is possibly fixed now on regular elements but apparently does not work inside the
             * shadow DOM.
             * The following was copied from the above and really is a hack wich cannot be fully 
             * garanteed on future versions of Firefox. There is a more sophisticated versions that 
             * walks the parents based on their display type but that relies on findind indexOf at
             * each step, so we stayed off of that for now.
             */
            var elem = pointerEvent.target;
            // Compute the (x,y) offset of the target element
            do {
                offset.x += elem.offsetLeft;
                offset.y += elem.offsetTop;
                elem = elem.offsetParent;
            } while (elem);
            // Adjust the offset relative to the page
            offset.x = (window.pageXOffset + pointerEvent.clientX) - offset.x;
            offset.y = (window.pageYOffset + pointerEvent.clientY) - offset.y;
        }
        else {
            // Chrome, new Edge and Safari seem to get it right directly with offsetX and offsetY on the element
            offset.x = pointerEvent.offsetX;
            offset.y = pointerEvent.offsetY;
        }
        return offset;
    }
}

// Singleton object
export const webBrowserHelper = new WebBrowserHelper();

