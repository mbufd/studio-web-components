import { siteFile } from '../../../site.js';

export async function getSampleCode() {
  const path = 'component/slider/app';
  const examplePath = `${path}/example`;

  // Dynamic samples read from code files
  await siteFile.loadFile(`${examplePath}/color-picker.html`).then((data) => {
    sampleCode.push({ elem: '#color-picker-html', language: 'html', code: data });
  });
  await siteFile.loadFile(`${examplePath}/color-picker.css`).then((data) => {
    sampleCode.push({ elem: '#color-picker-css', language: 'css', code: data });
  });
  await siteFile.loadFile(`${examplePath}/color-picker.js`).then((data) => {
    sampleCode.push({ elem: '#color-picker-js', language: 'js', code: data });
  });
  await siteFile.loadFile(`${examplePath}/color.js`).then((data) => {
    sampleCode.push({ elem: '#color-js', language: 'js', code: data });
  });

  return Promise.resolve(sampleCode);
}

// Static samples
const sampleCode = [
  {
    elem: '#slider-html', language: 'html',
    code: `<studio-slider orientation="h"></studio-slider>`},

  {
    elem: '#orientation-html', language: 'html',
    code: `<!-- Vertical slider -->
<studio-slider></studio-slider>
<!-- Horizontal slider -->
<studio-slider orientation="h">
</studio-slider>`},

  {
    elem: '#length-html', language: 'html',
    code: `<!-- Set length to 4 blocks -->
<studio-slider 
  style="--studio-length: var(--studio-size-4b);">
</studio-slider>`},

  {
    elem: '#length-horizontal-html', language: 'html',
    code: `<!-- Horizontal length of 4 blocks -->
<studio-slider orientation="h"
  style="--studio-length: var(--studio-size-4b);">
</studio-slider>`},

{
  elem: '#thickness-html', language: 'html',
  code: `<studio-slider orientation="h" 
    style="--studio-thickness: var(--studio-size-2b);">
</studio-slider>`},

  {
    elem: '#cursor-size-html', language: 'html',
    code: `<studio-slider orientation="h" 
  style="--studio-cursor-size: var(--studio-size-4u);">
</studio-slider>`},

  {
    elem: '#value-html', language: 'html',
    code: `<studio-label class="co-5b">INITIAL VALUE &nbsp;&nbsp;.75</studio-label>
<studio-slider orientation="h" value=".75">
</studio-slider>
`},

  {
    elem: '#bounds-html', language: 'html',
    code: `<!-- Values between 1 and 10-->
<studio-slider value="8"
  start-value="1" end-value="10" orientation="h">
</studio-slider>`},

  {
    elem: '#inverted-bounds-html', language: 'html',
    code: `<!-- Values between 1 and 10 -->
<studio-slider value="8"
  start-value="1" end-value="10">
</studio-slider>
<!-- Values between 10 and 1-->
<studio-slider value="8"
  start-value="10" end-value="1">
</studio-slider>`},

  {
    elem: '#disabled-html', language: 'html',
    code: `<studio-slider disabled orientation="h">
</studio-slider>`},

  {
    elem: '#value-event-html', language: 'html',
    code: `<studio-slider id="value-event-slider" 
    orientation="h" end-value="100 step="1">
      <studio-label id="value-event-label" 
        slot="label-start" 
        orientation="90l" 
        style="--studio-length: var(--studio-size-1b);">
      </studio-label>
</studio-slider>`},
  {
    elem: '#value-event-js', language: 'js',
    code: `const slider = document.querySelector(\`#value-event-slider\`);
  const label = document.querySelector(\`#value-event-label\`);
  // Set initial value of label
  label.innerHTML = slider.value;
  // Watch for value changes
  slider.addEventListener('studio-slider-value', (event) => {
      label.innerHTML = event.studio.value;
  });`},

  {
    elem: '#bounds-event-html', language: 'html',
    code: `<div class="studio-column">
  <div class="studio-row">
      <studio-label id="start-bound-event-label" style="--studio-length: var(--studio-size-1b);"></studio-label>
      <studio-label style="--studio-length: var(--studio-size-3b);--studio-surface-color: transparent"></studio-label>
      <studio-label id="end-bound-event-label" style="--studio-length: var(--studio-size-1b);"></studio-label>
  </div>
  <studio-slider id="bounds-event-slider" orientation="h" end-value="100" 
    value="50">
  </studio-slider>
</div>`},
  {
    elem: '#bounds-event-js', language: 'js',
    code: `let offset = 0;
const slider = document.querySelector(\`#bounds-event-slider\`);
const start = document.querySelector(\`#start-bound-event-label\`);
const end = document.querySelector(\`#end-bound-event-label\`);
// Set initial label values
start.innerHTML = slider.startValue;
end.innerHTML = slider.endValue;
// Watch for value changes
slider.addEventListener('studio-slider-bounds', (event) => {
    start.innerHTML = event.studio.startValue;
    end.innerHTML = event.studio.endValue;
});
// Generate bounds changes in a loop
setInterval(() => {
    offset = (offset + 1) % 20;
    slider.startValue = offset;
    slider.endValue = 100 - offset;
}, 500);`},

  {
    elem: '#no-direct-html', language: 'html',
    code: `<studio-slider no-direct orientation="h">
</studio-slider>`},

  {
    elem: '#surface-color-html', language: 'html',
    code: `<studio-slider orientation="h" value =".5"
    style="--studio-surface-color: var(--studio-spruce)">
      Spruce
</studio-slider>
  <studio-slider orientation="h" value =".5"
    style="--studio-surface-color: darkslateblue">
      Web color
</studio-slider>`},

{
  elem: '#inner-surface-color-html', language: 'html',
  code: `<studio-slider orientation="h" value =".5"
  style="--studio-inner-surface-color: var(--studio-spruce)">
    Spruce
</studio-slider>`},

{
  elem: '#cursor-range-color-html', language: 'html',
  code: `<studio-slider orientation="h" value =".5"
  style="--studio-cursor-range-color: var(--studio-spruce)">
    Spruce
</studio-slider>`},

  {
    elem: '#accent-color-html', language: 'html',
    code: `<studio-slider orientation="h" 
  style="--studio-accent-color: var(--studio-candy)">
</studio-slider>
<studio-slider orientation="h" 
  style="--studio-accent-color: darkturquoise">
</studio-slider>`},

  {
    elem: '#cursor-color-html', language: 'html',
    code: `<studio-slider orientation="h" 
  style="--studio-cursor-color: var(--studio-grape)">
</studio-slider>
<studio-slider orientation="h" 
  style="--studio-cursor-color: #493366">
</studio-slider>`},

  {
    elem: '#uniform-color-html', language: 'html',
    code: `<studio-slider uniform orientation="h">
</studio-slider>
<studio-slider uniform orientation="h" 
  style="--studio-inner-surface-color: var(--studio-raspberry);">
</studio-slider>`},

  {
    elem: '#sides-html', language: 'html',
    code: `<studio-slider orientation="h" 
  style="--studio-border-size: var(--studio-size-2u);">
</studio-slider>`},

  {
    elem: '#default-slot-gradient-html', language: 'html',
    code: `<studio-slider orientation="h">
  <div style="width: 100%; height: 100%; 
       background: linear-gradient(to right, transparent, var(--studio-mauve));">
  </div>
</studio-slider>`},

{
  elem: '#default-slot-label-html', language: 'html',
  code: `<div class="studio-column">
  <studio-slider orientation="h">
      <studio-label style="--studio-length: 100%; 
                    --studio-thickness: var(--studio-size-1b); --studio-surface-color: transparent;">
          LABEL
      </studio-label>
  </studio-slider>
  <studio-slider orientation="h">
      <div style="width: 100%; background: linear-gradient(to right, transparent, var(--studio-mauve));">
          <studio-label style="--studio-length: 100%; 
                        --studio-thickness: var(--studio-size-1b); --studio-surface-color: transparent;">
            WITH GRADIENT
          </studio-label>
      </div>
  </studio-slider>
</div>`},

{ elem: '#inner-surface-slot-html', language: 'html',
  code: `<studio-slider orientation="h">
  <div slot="inner-surface" class="pattern" 
       style="width: 100%; height: 100%; pointer-events: none"></div>
</studio-slider>`},

{ elem: '#cursor-range-slot-html', language: 'html',
  code: `<studio-slider orientation="h">
  <div slot="cursor-range" class="pattern" 
       style="width: 100%; height: 100%"></div>
</studio-slider>`},

  {
    elem: '#slider-leds-html', language: 'html',
    code: `<studio-slider id="led-slider" orientation="h" style="--studio-surface-color: var(--studio-spruce);">
  <!-- LEDs in the default slot -->
  <div class="studio-column">
      <div>
          <studio-led id="led0" style="--studio-width: var(--studio-size-2u);"></studio-led>
          <studio-led id="led1" style="--studio-width: var(--studio-size-2u);"></studio-led>
          <studio-led id="led2" style="--studio-width: var(--studio-size-2u);"></studio-led>
          <studio-led id="led3" style="--studio-width: var(--studio-size-2u);"></studio-led>
          <studio-led id="led4" style="--studio-width: var(--studio-size-2u);"></studio-led>
          <studio-led id="led5" style="--studio-width: var(--studio-size-2u);"></studio-led>
          <studio-led id="led6" style="--studio-width: var(--studio-size-2u);"></studio-led>
          <studio-led id="led7" style="--studio-width: var(--studio-size-2u);"></studio-led>
          <studio-led id="led8" style="--studio-width: var(--studio-size-2u);"></studio-led>
          <studio-led id="led9" style="--studio-width: var(--studio-size-2u);"></studio-led>
      </div>
  </div>
</studio-slider>`},
  {
    elem: '#slider-leds-js', language: 'js',
    code: `class LedContentDemo {
    _slider;
    _leds = [];
    constructor() {
        this._slider = document.querySelector(\`#led-slider\`);
        for (let i = 0; i < 10; i++) {
            const led = document.querySelector(\`#led\${i}\`);
            // LEDs get more intense towards the right end
            led.normalizedIntensity = i / 10;
            this._leds.push(led);
        }
        this._slider.addEventListener('studio-slider-value', (event) => {
            const value = event.studio.value * 10;
            for (let i = 0; i < 10; i++) {
                const led = this._leds[i];
                // Only on when left of cursor
                led.on = i <= value;
            }
        });
    }
}`},

  {
    elem: '#text-html', language: 'html',
    code: `<div class="uk-margin-top uk-margin-left uk-margin-bottom">
    <div class="studio-row">
        <studio-slider value="1">
            <div>VERTICAL</div>
        </studio-slider>
        <studio-slider>
            <div>
                <div data-feather="star" class="v-icon"></div>
                <div data-feather="star" class="v-icon"></div>
                <div data-feather="star" class="v-icon"></div>
            </div>
        </studio-slider>
        <div class="studio-column">
            <studio-slider orientation="h" value="1">
                <div>HORIZONTAL</div>
            </studio-slider>
            <studio-slider orientation="h">
                <div>
                    <div data-feather="star" class="v-icon"></div>
                    <div data-feather="star" class="v-icon"></div>
                    <div data-feather="star" class="v-icon"></div>
                </div>
            </studio-slider>
        </div>
    </div>
</div`},

  {
    elem: '#label-slot-html', language: 'html',
    code: `<div class="studio-row">
  <!-- Vertical -->
  <studio-slider >
      <studio-label slot="label-start" style="--studio-length: 100%">
          start
      </studio-label>
      <studio-label slot="label-end" style="--studio-length: 100%">
          end
      </studio-label>
  </studio-slider>
  <!-- Horizontal -->
  <studio-slider orientation="h">
      <studio-label slot="label-start" orientation="90l" style="--studio-length: 100%">
          start
      </studio-label>
      <studio-label slot="label-end" orientation="90r" style="--studio-length: 100%">
          end
      </studio-label>
  </studio-slider>
</div>`},

  {
    elem: '#combined-parts-html', language: 'html',
    code: `<studio-slider orientation="h"
  class="inner-surface-gradient label-ends sides cursor cursor-range decoration">
</studio-slider>`},
  {
    elem: '#combined-parts-css', language: 'css',
    code: `/* Styling the surface itself */
.inner-surface-gradient {
  --studio-surface-color: var(--studio-marine);
}   
/* The inner-surface part */ 
.inner-surface-gradient::part(inner-surface) {
  background: linear-gradient(to left, var(--studio-surface-color), var(--studio-turquoise), var(--studio-surface-color));
  box-shadow: inset 0 0 var(--studio-size-1u) var(--studio-size-2u) var(--studio-surface-color);
}
/* The label parts */
.label-ends::part(label-start) {
  background: linear-gradient(to left, var(--studio-surface-color), 70%, var(--studio-turquoise));
}
.label-ends::part(label-end) {
   background: linear-gradient(to right, var(--studio-surface-color), 70%, var(--studio-turquoise));
}
/* The accent parts */
.sides::part(accent-tl),
.sides::part(accent-br) {
  border-style: dotted;
  border-width: 0;
  border-color: white;
  background: linear-gradient(to left, var(--studio-turquoise), var(--studio-turquoise-flower), var(--studio-turquoise));
}
.sides::part(accent-tl) {
  border-bottom-width: 1px;
}
.sides::part(accent-br) {
  border-top-width: 1px;
}
/* The cursor part */
.cursor::part(cursor) {
  background-color: var(--studio-turquoise);
  box-shadow: inset 0 0 5px 0px var(--studio-turquoise-flower);
  height: var(--studio-size-6u);
}
/* The cursor range part */
.cursor-range::part(cursor-range) {
  border-style: solid;
  border-color: rgba(255,255,255,.3);
  border-width: 0 2px 0 2px;
  height: 25%;
}
/* The cursor-decoration part */
.decoration::part(cursor-decoration) {
  width: var(--studio-size-1u);
  height: var(--studio-size-1u);  
  border-radius: 50%;
}`},

{ elem: '#step-html', language: 'html',
code: `<studio-slider id="step-slider" end-value="100" 
                step="12.5" value="0" orientation="h">
  <studio-axis fit slot="cursor-range" orientation="h" 
               major-sections="8" minor-sections="0" 
               major-length="20%"></studio-axis>
  <studio-label id="step-label" slot="label-start" orientation="90l"
              style="--studio-length: var(--studio-size-1b);">
  </studio-label>
</studio-slider>`},

{ elem: '#step-int-html', language: 'html',
code: `<studio-slider id="step-slider" end-value="100" 
                step="1" value="0" orientation="h">
  <studio-axis fit slot="cursor-range" orientation="h"></studio-axis>
  <studio-label id="step-label" slot="label-start" orientation="90l"
              style="--studio-length: var(--studio-size-1b);">
  </studio-label>
</studio-slider>`},

];