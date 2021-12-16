import { siteFile } from '../../../site.js';

export async function getSampleCode() {
  const path = 'component/pad/app';
  const examplePath = `${path}/example`;

  // Dynamic samples read from code files
  await siteFile.loadFile(`${path}/pad-event-listener.js`).then((data) => {
      sampleCode.push({ elem: '#event-example-js', language: 'js', code: data });
  });
  // Drum example
  await siteFile.loadFile(`${examplePath}/drum-machine.html`).then((data) => {
    sampleCode.push({ elem: '#example-html', language: 'html', code: data });
  });
  await siteFile.loadFile(`${examplePath}/example.css`).then((data) => {
    sampleCode.push({ elem: '#example-css', language: 'css', code: data });
  });
  await siteFile.loadFile(`${examplePath}/sequencer.js`).then((data) => {
    sampleCode.push({ elem: '#example-sequencer-js', language: 'js', code: data });
  });
  await siteFile.loadFile(`${examplePath}/sequencer-step.js`).then((data) => {
    sampleCode.push({ elem: '#example-sequencer-pad-js', language: 'js', code: data });
  });
  await siteFile.loadFile(`${examplePath}/drum.js`).then((data) => {
    sampleCode.push({ elem: '#example-drum-js', language: 'js', code: data });
  });
  await siteFile.loadFile(`${examplePath}/drum-pad.js`).then((data) => {
    sampleCode.push({ elem: '#example-drum-pad-js', language: 'js', code: data });
  });
  await siteFile.loadFile(`${examplePath}/button-group.js`).then((data) => {
    sampleCode.push({ elem: '#example-button-group-js', language: 'js', code: data });
  });
  await siteFile.loadFile(`${examplePath}/audio.js`).then((data) => {
    sampleCode.push({ elem: '#example-audio-js', language: 'js', code: data });
  });
  
  return Promise.resolve(sampleCode);
}

const eventProperties = `{
  studio: {
    // Offset x and y are normalized between 0 and 1
    offset: { x: 0, y: 0 }, 
    // original pointer event object
    pointerEvent: {}, 
  },
  // other standard event members
  // ...
}`;

// Static samples
const sampleCode = [

{ elem: '#pad-content-html', language: 'html',
  code: `<studio-pad>PAD</studio-pad>
<studio-pad>Longer text spans lines</studio-pad>`},

  { elem: '#bold-content-html', language: 'html',
  code: `<studio-pad bold>PAD</studio-pad>`},

  { elem: '#secondary-content-html', language: 'html',
  code: `<!-- Secondary with main content -->
<studio-pad>
  PAD
  <div slot="secondary">Secondary</div>
</studio-pad>
<!-- Secondary content alone -->
<studio-pad>
  <div slot="secondary">Secondary</div>
</studio-pad>`},

{ elem: '#font-size-content-html', language: 'html',
code: `<!-- Default -->
<studio-pad>Font size s
    <div slot="secondary">Secondary</div>
</studio-pad>
<!-- Using a smaller font size -->
<studio-pad style="--studio-font-size: 
  var(--studio-size-font-xs);">Font size xs
    <div slot="secondary">Secondary</div>
</studio-pad>`},

{ elem: '#icon-content-html', language: 'html',
code: `<!-- Icon used in secondary content -->
<studio-pad>PLAY
  <div slot="secondary" class="studio-column" 
       style="margin-top: var(--studio-size-2u); align-items: center;
              width: calc(var(--studio-size-3b) - var(--studio-size-4u));">
          <div class=" icon" data-feather="play"></div>
          <div class="mt-1u">Click to play</div>
  </div>
</studio-pad>`},

{ elem: '#inner-surface-content-html', language: 'html',
code: `<studio-pad>
  <img slot="inner-surface" width="100%" height="100%"
       src="assets/gray-goblin-100.jpg" 
       style="mix-blend-mode: lighten;">
</studio-pad>`},

{ elem: '#label-top-html', language: 'html',
  code: `<studio-pad>
  <div slot="label-top">
      <studio-label
          style="--studio-length: var(--studio-size-2b); 
                 --studio-surface-color: var(--studio-blueberry);">
          LABEL</studio-label>
  </div>
</studio-pad>`},

{ elem: '#inset-label-html', language: 'html',
  code: `<studio-pad inset-label>
  <div slot="label-top">
      <studio-label
          style="--studio-length: var(--studio-size-2b); 
                 --studio-surface-color: var(--studio-blueberry);">
          INSET
      </studio-label>
  </div>
</studio-pad>`},

{ elem: '#four-labels-html', language: 'html',
  code: `<!-- Using horizontal labels at top and bottom -->
<studio-pad 
  style="--studio-width: var(--studio-size-4b); 
         --studio-height: var(--studio-size-4b);">
    <div slot="label-top">
      <studio-label class="label-class">TOP</studio-label>
    </div>
    <div slot="label-bottom">
      <studio-label class="label-class">BOTTOM</studio-label>
    </div>
    <!-- Using orientation on studio-label to display left and right -->
    <div slot="label-left">
      <studio-label orientation="90l" 
       class="label-class">LEFT</studio-label>
    </div>
    <div slot="label-right">
      <studio-label orientation="90r" 
       class="label-class">RIGHT</studio-label>
    </div>
</studio-pad>`},
{ elem: '#four-labels-css', language: 'css',
  code: `.label-class {
    --studio-length: var(--studio-size-2b); 
    --studio-surface-color: var(--studio-blueberry);
}`},

{ elem: '#led-label-html', language: 'html',
  code: `<studio-pad inset-label>LED OFF
  <div slot="label-bottom">
      <studio-led class="led-label"></studio-led>
  </div>
</studio-pad>
<studio-pad inset-label>LED ON
  <div slot="label-bottom">
      <studio-led on class="led-label"></studio-led>
  </div>
</studio-pad>`},
{ elem: '#led-label-css', language: 'css',
  code: `.led-label {
    --studio-surface-color: var(--studio-turquoise);
    --studio-border-color: transparent;
    --studio-width: var(--studio-size-2b);
    --studio-height: var(--studio-size-2u);
}`},

{ elem: '#pad-selected-html', language: 'html',
  code: `<!-- Off when the selected attribute is not present -->
<studio-pad>OFF
  <div slot="secondary">Not selected</div>
</studio-pad>
<!-- On when the selected attribute is present -->
<studio-pad selected>ON
  <div slot="secondary">Selected</div>
</studio-pad>`},

{ elem: '#swipe-xy-html', language: 'html',
  code: `<studio-pad swipe xy-fx="xy">SWIPE ME
  <div slot="secondary">xy</div>
</studio-pad>
<studio-pad swipe xy-fx="x">SWIPE ME
  <div slot="secondary">x</div>
</studio-pad>
<studio-pad swipe xy-fx="y">SWIPE ME
  <div slot="secondary">y</div>
</studio-pad>`},

{ elem: '#swipe-filter-html', language: 'html',
  code: `<!-- Use a label as heading -->
<studio-label id="filter-heading">
  LOW PASS FILTER
</studio-label>
<!-- Pad with full XY swipe and effects + 4 labels -->
<studio-pad inset-label swipe xy-fx="xy" 
  style="--studio-width: var(--studio-size-6b);">
    <div slot="label-top">
        <studio-label class="filter-label">
            MAX VOL
        </studio-label>
    </div>
    <div slot="label-bottom">
        <studio-label class="filter-label">
            MIN VOL
        </studio-label>
    </div>
    <div slot="label-left">
        <studio-label orientation="90l" class="filter-label">
            20 Hz
        </studio-label>
    </div>
    <div slot="label-right">
        <studio-label orientation="90r" class="filter-label">
            1200 Hz
        </studio-label>
    </div>
</studio-pad>`},
{ elem: '#swipe-filter-css', language: 'css',
  code: `#filter-heading {
    --studio-thickness: var(--studio-size-4u); 
    --studio-length: var(--studio-size-6b); 
    --studio-surface-color: var(--studio-indigo-night);
}
.filter-label {
    --studio-thickness: var(--studio-size-3u); 
    --studio-length: var(--studio-size-2b); 
    --studio-surface-color: transparent;
}`},

{ elem: '#fx-no-swipe-html', language: 'html',
  code: `<div class="studio-row">
  <studio-pad xy-fx="xy" class="square-3b">XY
      <div slot="secondary">Click for XY</div>
  </studio-pad>
  <studio-pad xy-fx="x" class="square-3b">X
      <div slot="secondary">Click for Y</div>
  </studio-pad>
  <studio-pad xy-fx="y" class="square-3b">Y
      <div slot="secondary">Click for Y</div>
  </studio-pad>
</div>`},
{ elem: '#fx-no-swipe-css', language: 'css',
  code: `.square-3b {
    --studio-width: var(--studio-size-3b);
    --studio-height: var(--studio-size-3b);
}`},

{ elem: '#pad-color-html', language: 'html',
  code: `<!-- Using a Studiö color -->
<studio-pad 
  style="--studio-surface-color: var(--studio-spruce)">
    Spruce
</studio-pad>
<!-- Using a Web color name -->
<studio-pad 
  style="--studio-surface-color: darkslateblue">
    Web color
</studio-pad>`},

{ elem: '#content-color-html', language: 'html',
  code: `<!-- Using darker text over light color -->
<studio-pad 
  style="--studio-surface-color: var(--studio-indigo-flower);
         --studio-content-color: var(--studio-blueberry);">
    Azure
    <div slot="secondary">Over indigo flower</div>
</studio-pad>`},

{ elem: '#selected-color-html', language: 'html',
  code: `<studio-pad selected
  style="--studio-surface-color: var(--studio-indigo-flower);
         --studio-content-color: var(--studio-blueberry);
         --studio-highlight-color: var(--studio-magenta);
         --studio-selected-highlight-color: var(--studio-blueberry);">
    Selected
</studio-pad>`},

{ elem: '#uniform-color-html', language: 'html',
  code: `<studio-pad uniform>Uniform</studio-pad>
<studio-pad uniform selected>Uniform
    <div slot="secondary">Selected</div>
</studio-pad>`},

{ elem: '#uniform-override-html', language: 'html',
  code: `<studio-pad uniform 
  style="--studio-uniform-color: #9d94c7;">
    Uniform
  <div slot="secondary">Custom color</div>
</studio-pad>
<studio-pad selected uniform 
  style="--studio-uniform-color: #9d94c7;">
    Uniform
  <div slot="secondary">Custom color
    <div class="mt-2u">Selected</div>
  </div>
</studio-pad>`},

{ elem: '#pad-size-html', language: 'html',
  code: `<studio-pad 
  style="--studio-width: var(--studio-size-5b);
         --studio-height: var(--studio-size-3b);">
    5b &times; 3b
</studio-pad>`},

{ elem: '#pad-layout-html', language: 'html',
  code: `<!-- Sample pad layout -->
  <div class="studio-row">
  <div class="studio-column">
      <div class="studio-row">
          <div class="studio-column">
              <div class="studio-row">
                  <div class="studio-column">
                      <div class="studio-row">
                          <div class="studio-column">
                              <div class="studio-row">
                                  <studio-pad style="--studio-width: var(--studio-size-1b);
                              --studio-height: var(--studio-size-1b);"></studio-pad>
                                  <studio-pad neutral style="--studio-width: var(--studio-size-1b);
                              --studio-height: var(--studio-size-1b);"></studio-pad>
                              </div>
                              <studio-pad style="--studio-width: var(--studio-size-2b);
                          --studio-height: var(--studio-size-1b);"></studio-pad>
                          </div>
                          <studio-pad neutral style="--studio-width: var(--studio-size-1b);
                      --studio-height: var(--studio-size-2b);">
                          </studio-pad>
                      </div>
                      <studio-pad style="--studio-width: var(--studio-size-3b);
                  --studio-height: var(--studio-size-1b);"></studio-pad>
                  </div>
                  <studio-pad neutral style="--studio-width: var(--studio-size-1b);
              --studio-height: var(--studio-size-3b);">
                  </studio-pad>
              </div>
              <studio-pad style="--studio-width: var(--studio-size-4b);
          --studio-height: var(--studio-size-1b);"></studio-pad>
          </div>
          <studio-pad neutral style="--studio-width: var(--studio-size-1b);
       --studio-height: var(--studio-size-4b);"></studio-pad>
      </div>
  </div>
  <studio-pad style="--studio-width: var(--studio-size-4b);
       --studio-height: var(--studio-size-4b);"></studio-pad>
</div>`},

{ elem: '#fx-color-html', language: 'html',
  code: `<studio-pad swipe xy-fx="xy" 
  style="--studio-fx-color: var(--studio-tomato);">
    SWIPE ME
</studio-pad>`},


{ elem: '#event-properties-js', language: 'js',
  code: eventProperties},
{ elem: '#event-properties-api-js', language: 'js',
  code: eventProperties},

{ elem: '#event-example-html', language: 'html',
  code: `<studio-pad id="pad-event" swipe xy-fx="xy" 
  style="--studio-width: var(--studio-size-5b); 
         --studio-height: var(--studio-size-5b);">
      <div id="pad-event-primary">CLICK or SWIPE ME</div>
      <div id="pad-event-secondary" slot="secondary"></div>
</studio-pad>`},

{ elem: '#outer-surface-html', language: 'html',
  code: `<studio-pad id="custom-outer-surface">
  outer-surface
</studio-pad>`},
{ elem: '#outer-surface-css', language: 'css',
  code: `#custom-outer-surface::part(outer-surface) {
      background: linear-gradient(
          var(--studio-surface-color),
          var(--studio-turquoise));
}`},

{ elem: '#inner-surface-html', language: 'html',
  code: `<studio-pad id="custom-inner-surface">
  inner-surface
</studio-pad>`},
{ elem: '#inner-surface-css', language: 'css',
  code: `#custom-inner-surface::part(inner-surface) {
    background: linear-gradient(
        var(--studio-surface-color),
        var(--studio-turquoise));
}`},

{ elem: '#composed-surface-html', language: 'html',
  code: `<!-- Using the default surface color -->
<studio-pad class="composed-surface">
  combined
</studio-pad>
<!-- Same effect with a different surface color -->
<studio-pad class="composed-surface" 
  style="--studio-surface-color: var(--studio-spruce);">
    combined
</studio-pad>`},
{ elem: '#composed-surface-css', language: 'css',
  code: `.composed-surface::part(outer-surface) {
    background: linear-gradient(
        var(--studio-surface-color),
        var(--studio-turquoise));    
}
.composed-surface::part(inner-surface) {
  background: radial-gradient(
    hsla(var(--studio-hue-turquoise), 100%, 90%, .5) 20%, 
    transparent);
}
/* Special hover state */
.composed-surface::part(inner-surface):hover {
  background: radial-gradient(
    rgba(255,255,255,.6) 20%, 
    transparent);
}`},

];