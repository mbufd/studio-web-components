import { IGeometryPoint } from '../common/geometry/geometry';

// Pad event info
export class StudioPadEventInfo {
    offset: IGeometryPoint = { x: 0, y: 0 };
    pointerEvent: any = null;
  };
// Pad event type
export class StudioPadEvent extends Event {
    constructor(type: string, eventInitDict?: EventInit) {
      super(type, eventInitDict);
    }
    studio = new StudioPadEventInfo();
  };