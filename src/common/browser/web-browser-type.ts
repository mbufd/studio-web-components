/**
 * Provides browser type information
 * Not a robust solution because based on userAgent (which can be overriden by applications)
 */
export class WebBrowserType {
    private _isFirefox = false;
    private _isChromiumEdge = false;
    private _isOriginalEdge = false;
    private _isChrome = false;
    private _isSafari = false;

    constructor() {
        this.evaluateBrowserType();
    }

    get isChromiumBased() { // Will be true for Chromium based browsers (Chrome, new Edge)
        return (window as any).chrome !== undefined;
    }
    get isFirefox() {
        return this._isFirefox;
    }
    get isChromiumEdge() {
        return this._isChromiumEdge;
    }
    get isOriginalEdge() {
        return this._isOriginalEdge;
    }
    get isChrome() {
        return this._isChrome;
    }
    get isSafari() {
        return this._isSafari;
    }

    private evaluateBrowserType() {
        const userAgent = navigator.userAgent.toLocaleLowerCase();
        if(!this.isChromiumBased) {
            // Non Chromium-based browsers
            if (userAgent.indexOf("edge") >= 0) {
                this._isOriginalEdge = true;
            }
            else if (userAgent.indexOf("firefox") >= 0) {
                this._isFirefox = true;
            }
            else if (userAgent.indexOf("safari") >= 0) {
                this._isSafari = true;
            }
        } 
        else
        {            
            // Chromium-based browsers
            if (userAgent.indexOf("edg/") >= 0) {
                this._isChromiumEdge = true;
            }
            else if (userAgent.indexOf("chrome") >= 0) {
                this._isChrome = true;
            }
        }
    }
}

