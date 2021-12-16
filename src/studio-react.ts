/**
 *  React wrappers for the Studiö components
 */
 import React from "react";
 import { createComponent } from "@lit-labs/react";
 import {
    StudioLabelElement,
    StudioLedElement,
    StudioAxisElement,
    StudioSliderElement,
    StudioPadElement,
  } from './studio-web-components';

 export const StudioLabel = createComponent(React, 'studio-label', StudioLabelElement);
 
 export const StudioLed = createComponent(React, 'studio-led', StudioLedElement);

 export const StudioAxis = createComponent(React, 'studio-axis', StudioAxisElement);

 export const StudioPad = createComponent(React, 'studio-pad', StudioPadElement,{
     studioPadDown: 'studio-pad-down',
     studioPadUp: 'studio-pad-up',
     studioPadSwipe: 'studio-pad-swipe',
     studioPadMove: 'studio-pad-move'
 });

 export const StudioSlider = createComponent(React, 'studio-slider', StudioSliderElement,{
     studioSliderValue: 'studio-slider-value',
     studioSliderBounds: 'studio-slider-bounds',
     studioSliderState: 'studio-slider-state'
 });