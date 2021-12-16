export class Looper {
    _interval = null;
    get isRunning() {
        return this._interval !== null;
    }
    start(callback, delayMs) {
        this.stop();
        this._interval = setInterval(callback, delayMs);
    }
    stop() {
        if(this._interval) {
            clearInterval(this._interval);
            this._interval = null;
        }
    }
}