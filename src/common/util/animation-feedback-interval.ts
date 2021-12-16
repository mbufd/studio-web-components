/**
 * Class to interpolate feedback during an animation
 */

// State of the animation
class AnimationFeedbackIntervalState {
    finished = false;
    count = 0;
}

// Callback type
interface AnimationFeedbackIntervalCallback {
    (state: AnimationFeedbackIntervalState): void;
}

// Interpolator class
export class AnimationFeedbackInterval {
    private _state = new AnimationFeedbackIntervalState();
    private _interval: number = undefined;

    // Requires an animation
    constructor (private _animation: Animation) {}

    // Start feedback
    setFeedbackInterval(handler: AnimationFeedbackIntervalCallback, intervalMs: number) {
        this.clearFeedbackInterval();
        this._state = new AnimationFeedbackIntervalState();
        this._animation.onfinish = () => {
            this.clearFeedbackInterval();
            this._state.finished = true;
            this.callback(handler);
        }
        this._interval = setInterval(() => {
            if(!this._state.finished) {
                this.callback(handler);
            }
        }, intervalMs);  
    }

    // End feedback
    clearFeedbackInterval() {
        this._state.finished = true;
        if(this._interval !== undefined) {
            clearInterval(this._interval);
        }
    }

    // Callback to give feedback
    callback(feedbackHandler: AnimationFeedbackIntervalCallback) {
        this._state.count++;
        if(feedbackHandler) {
            feedbackHandler(this._state);
        }
    }
}