export const sampleCode = [
    {
        elem: '#paper-and-ink-html', language: 'html',
        code:
`<div style="background-color: var(--studio-paper-30); 
            color: var(--studio-ink-30);">
  paper and ink -30</div>`
    },
    {
        elem: '#semantic-colors-html', language: 'html',
        code:
`<div style="background-color: var(--studio-semantic-warning); 
            color: var(--studio-semantic-color-ink);">
  warning</div>`
    },
    {
        elem: '#fixed-colors-html', language: 'html',
        code:
`<div style="background-color: var(--studio-neutral); 
            color: var(--studio-semantic-color-ink);">
  neutral</div>`
    },
    {
        elem: '#basic-colors-html', language: 'html',
        code:
`<div style="background-color: var(--studio-turquoise); 
            color: var(--studio-ink-light);">
  turquoise</div>`
    },
    {
        elem: '#flower-colors-html', language: 'html',
        code:
`<div style="background-color: var(--studio-turquoise-flower); 
            color: var(--studio-ink-flower);">
  turquoise flower</div>`
    },
    {
        elem: '#night-colors-html', language: 'html',
        code:
`<div style="background-color: var(--studio-turquoise-night); 
            color: var(--studio-ink-night);">
  turquoise night</div>`
    },

    {
      elem: '#hsl-html', language: 'html',
      code:
`<!-- A desaturated green --> 
<div style="background: 
  hsl(var(--studio-hue-green), 30%, 40%);">
</div>`
  },

  {
    elem: '#tinted-paper-html', language: 'html',
    code:`<!-- Blue tinted paper in shade 20 -->
<div style="background: 
            hsl(var(--studio-hue-blue), 
                var(--studio-paper-tint-s), 
                var(--studio-paper-20-tint-l)); 
         color: var(--studio-ink-20); 
         text-align: center; padding: var(--studio-size-1u);">
  20
</div>`},

{elem: '#grays-html', language: 'html',
  code:`<div 
    style="background-color: var(--studio-carbon);">
      carbon
</div>`},

{elem: '#common-theming-js', language: 'js',
  code:`import { Theming } from './libs/studio/lib/studio-web-components.js';
// Create a theming object
theming = new Theming();
// Set the theme to light
theming.setTheme('light');
// Toggle the theme
theming.toggleTheme();
`} 
];