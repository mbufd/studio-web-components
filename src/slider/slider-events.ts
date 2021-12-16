/** 
 * Value event
 */
export class StudioSliderValueEventInfo {
    value = 0;
};
export class StudioSliderValueEvent extends Event {
    constructor(eventInitDict?: EventInit) {
        super('studio-slider-value', eventInitDict);
    }
    studio = new StudioSliderValueEventInfo();
};

/**
 * Bounds event
 */
export class StudioSliderBoundsEventInfo {
    startValue = 0;
    endValue = 1;
};
export class StudioSliderBoundsEvent extends Event {
    constructor(eventInitDict?: EventInit) {
        super('studio-slider-bounds', eventInitDict);
    }
    studio = new StudioSliderBoundsEventInfo();
};

/** 
 * State event
 */
export class StudioSliderStateEventInfo {
    isDown = false;
};
export class StudioSliderStateEvent extends Event {
    constructor(eventInitDict?: EventInit) {
        super('studio-slider-state', eventInitDict);
    }
    studio = new StudioSliderStateEventInfo();
};