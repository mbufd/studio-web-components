export const sampleCode = [

{elem: '#theming-helper-js', language: 'js',
  code:`import { Theming } from '../studio/lib/studio-web-components.js';
// Create a theming object
theming = new Theming();`}, 

{elem: '#theme-js', language: 'js',
  code:`// Set the theme to light
theming.setTheme('light');
// Toggle the theme between 'light' and 'dark'
theming.toggleTheme();`},

{elem: '#scale-js', language: 'js',
  code:`// Set the scale to 125%
theming.setScale('125');
// Toggle the scale between '100' and '125'
theming.toggleScale();`},

{elem: '#body-css', language: 'css',
  code:`/* Use Studiö paper and ink */
body {
    background-color: var(--studio-paper-30);
    color: var(--studio-ink-30);
}`} 
];