export const sampleCode = [
{ elem: '#example-include-html', language: 'html', 
code:`<!-- Include what we need for Studiö -->
<link rel="stylesheet" href="https://studio.frontdynamics.com/latest/dist/css/studio-css.css" />
<link rel="stylesheet" href="https://studio.frontdynamics.com/latest/dist/css/studio-scale-100.css" />
<link rel="stylesheet" href="https://studio.frontdynamics.com/latest/dist/css/studio-scale-125.css" />
<link rel="stylesheet" href="https://studio.frontdynamics.com/latest/dist/css/studio-light.css" />
<link rel="stylesheet" href="https://studio.frontdynamics.com/latest/dist/css/studio-dark.css" />
<script src="https://studio.frontdynamics.com/latest/dist/lib/studio-web-components.js" 
        type="module"></script>`},

{ elem: '#example-include-js', language: 'js', 
code:`// Import the components
import { StudioLabelElement } 
  from 'https://studio.frontdynamics.com/latest/dist/lib/studio-web-components.js';
`},

{ elem: '#example-selective-include-html', language: 'html', 
code:`<!-- Include some of the components -->
<script type="module" href="https://studio.frontdynamics.com/latest/dist/lib/led.js"></script>
<script type="module" href="https://studio.frontdynamics.com/latest/dist/lib/pad.js"></script>`},

{ elem: '#example-selective-include-js', language: 'js', 
code:`// Import the components
import { StudioLedElement } from 'https://studio.frontdynamics.com/latest/dist/lib/led.js';
import { StudioPadElement } from 'https://studio.frontdynamics.com/latest/dist/lib/pad.js'`},

{ elem: '#example1-html', language: 'html', 
code:`<studio-label>LABEL</studio-label>`},
    
{ elem: '#example2-html', language: 'html', 
code:`<span id="container"></span>`},
    
{ elem: '#example2-js', language: 'js', 
code:`const containerElement = document.querySelector('#container');
const labelElement = document.createElement('studio-label');
labelElement.innerHTML = 'LABEL';
containerElement.appendChild(labelElement);`}
];