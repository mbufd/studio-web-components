export const sampleCode = [
{ elem: '#npm-install', language: 'html',
code:`npm install studio-web-components`},

{ elem: '#vue-config-js', language: 'js',
code:`// vue.config.js
module.exports = {
  chainWebpack: config => {
    config.module
        .rule('vue')
        .use('vue-loader')
        .tap(options => ({
          ...options,
          compilerOptions: {
            // Any tag starting with studio- is a custom element
            isCustomElement: 
              tag => tag.startsWith('studio-')
          }
    }))
  }
}`},

{ elem: '#app-vue', language: 'js',
code:`// Import the Studiö elements
import "studio-web-components";`},

{ elem: '#fonts-css', language: 'css',
code:`/* Load the prefered font for the Studiö Web Components */
@import url('https://fonts.googleapis.com/css2?family=Bai+Jamjuree&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Bai+Jamjuree:wght@600&display=swap');`},

{ elem: '#studio-styles', language: 'html',
code:`<!-- Import Studiö CSS files -->
<style src="studio-web-components/css/studio-css.css"></style>
<style src="studio-web-components/css/studio-light.css"></style>
<style src="studio-web-components/css/studio-dark.css"></style>
<style src="studio-web-components/css/studio-scale-100.css"></style>
<style src="studio-web-components/css/studio-scale-125.css"></style>`},

{ elem: '#body-style-css', language: 'css',
code:`body {
  /* Use Studiö paper and ink */
  background-color: var(--studio-paper-30);
  color: var(--studio-ink-30);
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

{ elem: '#theming-from-component-html', language: 'html',
code:`<!-- Toggle theme -->
<button v-on:click="theming.toggleTheme()">Toggle theme</button>
<!-- Toggle scale -->
<button v-on:click="theming.toggleScale()">Toggle scale</button>`},

{ elem: '#theming-from-component-ts', language: 'js',
code:`import { Theming } from "studio-web-components/helpers/theming";

export default defineComponent({
  name: "MyComponent",
  data() {
    return {
      theming: new Theming()
    };
  }
});`},

{ elem: '#binding-html', language: 'html',
code:`<div class="studio-row">
<div v-for="(slider, sliderIndex) in sliders" :key="slider.id">
    <studio-slider end-value="100" step="1" :value="slider.value"
        v-on:studio-slider-value="onSliderValue($event, sliderIndex)">
        <studio-label slot="label-start" class="slider-label">{{
            slider.value
            }}</studio-label>
        <studio-axis slot="cursor-range" fit></studio-axis>
    </studio-slider>
</div>
</div>`},

{ elem: '#binding-ts', language: 'js',
code:`import { defineComponent } from "vue";
import { StudioSliderValueEvent } from "studio-web-components/slider/slider-events";

export default defineComponent({
  name: "StudioExample",
  data() {
    return {
      sliders: [
        { id: 0, value: 0 },
        { id: 1, value: 25 },
        { id: 2, value: 50 },
        { id: 3, value: 75 },
      ]
    };
  },
  methods: {
    onSliderValue(ev: Event, sliderIndex: number) {
      const sliderEvent = ev as StudioSliderValueEvent;
      this.sliders[sliderIndex].value = sliderEvent.studio.value;
    },
  }
});`},

]
