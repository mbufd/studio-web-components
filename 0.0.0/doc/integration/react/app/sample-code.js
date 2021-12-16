export const sampleCode = [
{ elem: '#npm-install', language: 'html',
  code:`npm install studio-web-components`},

{ elem: '#lit-react', language: 'html',
  code:`npm install @lit-labs/react`},

{ elem: '#custom-elements-ts', language: 'js',
  code:`import { 
    StudioLabel,
    StudioAxis, 
    StudioPad, 
    StudioSlider 
} from 'studio-web-components/studio-react';`},

{ elem: '#index-css', language: 'css',
  code:`/* Load the prefered font for the Studiö Web Components */
@import url('https://fonts.googleapis.com/css2?family=Bai+Jamjuree&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Bai+Jamjuree:wght@600&display=swap');`},

{ elem: '#styles-css', language: 'css',
  code:`@import '~studio-web-components/css/studio-base.css';
@import '~studio-web-components/css/studio-light.css';
@import '~studio-web-components/css/studio-dark.css';
@import '~studio-web-components/css/studio-scale-125.css';
@import '~studio-web-components/css/studio-scale-100.css';`},

{ elem: '#body-style-css', language: 'css',
code:`body {
  /* Use Studiö paper and ink */
  background-color: var(--studio-paper-30);
  color: var(--studio-ink-30);
}`},

{ elem: '#theming-from-component-html', language: 'html',
code:`<!-- Toggle theme -->
<button onClick={() => this.theming.toggleTheme()}>Toggle theme</button>
<!-- Toggle scale -->
<button onClick={() => this.theming.toggleScale()}">Toggle scale</button>`},

{ elem: '#theming-from-component-ts', language: 'js',
code:`import { Theming } from "studio-web-components/helpers/theming";
/*...*/
export default class App extends React.Component {
    theming = new Theming();
/*...*/
}`},

{ elem: '#theming-ts', language: 'js',
code:`export class Theming {
    // Domain and value for theme and scale
    private _kinds: { [key: string]: { domain: string[], value: number } } = {
      'theme': { domain: ['light', 'dark'], value: 0 },
      'scale': { domain: ['100', '125'], value: 0 }
    };
  
    toggleTheme() {
      this.cycle('theme');
    }
    toggleScale() {
      this.cycle('scale');
    }
  
    // Cycle to next theme or scale value in the domain and apply classes to &lt;body&gt
    private cycle(kindName: string) {
      const kind = this._kinds[kindName];
      const domain = kind.domain;
      // Determine old and new class names
      const oldValue = kind.value;
      kind.value = (oldValue + 1) % domain.length;
      const newValue = kind.value;
      // Apply the appropriate class to the &lt;body&gt;
      document.body.classList.add(\`studio-\${kindName}-\${domain[newValue]}\`);
      document.body.classList.remove(\`studio-\${kindName}-\${domain[oldValue]}\`);
    }
}`},

{ elem: '#binding-html', language: 'html',
code:`<!-- In the render() method, binding a list of sliders -->
<div className="studio-row">
{this.sliders.map((slider) => {
  return (
    <StudioSlider value={slider.value} end-value="100" step={1} key={slider.id}
      studioSliderValue={e => this.onSliderValue(e, slider.id)}>
      <StudioAxis fit slot="cursor-range"></StudioAxis>
      <StudioLabel slot="label-start" className="slider-label">{slider.value}</StudioLabel>
    </StudioSlider>
  );
})}
</div>`},

{ elem: '#binding-ts', language: 'js',
code:`import update from 'immutability-helper';

interface iSliderData { readonly id: number, readonly value: number };

export default class App extends React.Component {
  constructor(props: any) {
    super(props);
        this.state = {
          sliders: [
            { id: 0, value: 0 },
            { id: 1, value: 25 },
            { id: 2, value: 50 },
            { id: 3, value: 75 },
          ]
    };
  }

  get sliders(): Readonly<iSliderData[]> { return (this.state as any).sliders; }

  onSliderValue(event: Event, id: number) {
    const studioSliderEvent = (event as StudioSliderValueEvent);
    const newValue = studioSliderEvent.studio.value;
    const newState = update(this.state, {
      sliders: {[id]: { value: { $set: newValue}}}
    });
    this.setState(newState);
  }
}`},
];