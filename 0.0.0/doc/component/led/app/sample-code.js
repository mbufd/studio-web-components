import { siteFile } from '../../../site.js';

export async function getSampleCode() {
    const path = 'component/led/app';
    const examplePath = `${path}/example`;

    // Dynamic samples read from code files
    await siteFile.loadFile(`${examplePath}/game-of-life-cell.js`).then((data) => {
        sampleCode.push({ elem: '#game-of-life-cell-js', language: 'js', code: data });
    });
    await siteFile.loadFile(`${examplePath}/game-of-life-main.js`).then((data) => {
        sampleCode.push({ elem: '#game-of-life-js', language: 'js', code: data });
    });
    await siteFile.loadFile(`${examplePath}/game-of-life.css`).then((data) => {
        sampleCode.push({ elem: '#game-of-life-css', language: 'css', code: data });
    });
    await siteFile.loadFile(`${examplePath}/game-of-life-seeder.js`).then((data) => {
        sampleCode.push({ elem: '#game-of-life-pattern-js', language: 'js', code: data });
    });
    await siteFile.loadFile(`${examplePath}/game-of-life-patterns.json`).then((data) => {
        sampleCode.push({ elem: '#game-of-life-patterns-json', language: 'json', code: data });
    });

    return Promise.resolve(sampleCode);
}

// Static samples
const sampleCode = [
    { elem: '#corners-html', language: 'html', 
code:`<studio-led corners='rounded'></studio-led>
<studio-led corners='angled'></studio-led>`},

{ elem: '#sizes-html', language: 'html', 
code:`<!-- regular (w = h) -->
<studio-led class="size-s"></studio-led>
<studio-led class="size-m"></studio-led>
<studio-led class="size-l"></studio-led>
<studio-led class="size-s" corners="angled"></studio-led>
<studio-led class="size-m" corners="angled"></studio-led>
<studio-led class="size-l" corners="angled"></studio-led>
<!-- non regular (w != h)-->
<studio-led class="size-sl" corners="rounded"></studio-led>
<studio-led class="size-ls" corners="rounded"></studio-led>
<studio-led class="size-sl" corners="angled"></studio-led>
<studio-led class="size-ls" corners="angled"></studio-led>`},

{ elem: '#sizes-css', language: 'css', 
code:`.size-s {
    --studio-width: var(--studio-size-2u);
    --studio-height: var(--studio-size-2u);
}
.size-m {
    --studio-width: var(--studio-size-3u);
    --studio-height: var(--studio-size-3u);
}
.size-l {
    --studio-width: var(--studio-size-4u);
    --studio-height: var(--studio-size-4u);
}
.size-sl {
    --studio-width: var(--studio-size-2u);
    --studio-height: var(--studio-size-4u);
}
.size-ls {
    --studio-width: var(--studio-size-4u);
    --studio-height: var(--studio-size-2u);
}`},

{ elem: '#custom-sizes-html', language: 'html', 
code:`<!-- Using calc and --studio-scale to scale custom sizes -->
<studio-led 
  style="--studio-width: calc(var(--studio-scale)*40px); 
         --studio-height: calc(var(--studio-scale)*10px);">
</studio-led>
<studio-led 
  style="--studio-height: calc(var(--studio-scale)*40px); 
         --studio-width: calc(var(--studio-scale)*10px);">
</studio-led>`},

{ elem: '#state-html', language: 'html', 
code:`<studio-led></studio-led>
<studio-led on></studio-led>`},

{ elem: '#intensity-html', language: 'html', 
code:`<studio-led normalized-intensity=0 on></studio-led>
<studio-led normalized-intensity=.25 on></studio-led>
<studio-led normalized-intensity=.5 on></studio-led>
<studio-led normalized-intensity=.75 on></studio-led>
<studio-led normalized-intensity=1 on></studio-led>`},

{ elem: '#intensity-range-html', language: 'html', 
code:`<studio-led normalized-intensity=0 on 
            min-intensity=50 max-intensity=200></studio-led>
<studio-led normalized-intensity=.25 on 
            min-intensity=50 max-intensity=200></studio-led>
<studio-led normalized-intensity=.5 on 
            min-intensity=50 max-intensity=200></studio-led>
<studio-led normalized-intensity=.75 on 
            min-intensity=50 max-intensity=200></studio-led>
<studio-led normalized-intensity=1 on 
            min-intensity=50 max-intensity=200></studio-led>`},

{ elem: '#surface-color-html', language: 'html', 
code:`<studio-led on 
  style="--studio-surface-color: var(--studio-pink-flower);">
</studio-led>
<studio-led on 
  style="--studio-surface-color: #7788FF;">
</studio-led>`},

{ elem: '#surface-part-html', language: 'html', 
code:`<studio-led class="glow-surface" on 
   style="--studio-border-color: var(--studio-ink-35);">
</studio-led>`},

{ elem: '#surface-part-css', language: 'css', 
code:`/* styling the surface part */
.glow-surface::part(surface) {
    background: radial-gradient(
                  var(--studio-azure-flower), 
                  55%, 
                  var(--studio-azure-night)
                );
}`},

{ elem: '#border-color-html', language: 'html', 
code:`<studio-led 
  style="--studio-border-color: var(--studio-orange);">
</studio-led>
<studio-led 
  style="--studio-border-color: gray;">
</studio-led>`},

{ elem: '#border-width-html', language: 'html', 
code:`<studio-led on style="--studio-border-width: 2px;">
</studio-led>`},

{ elem: '#border-part-html', language: 'html', 
code:`<studio-led class="dotted-border"></studio-led>
<studio-led class="custom-corners"></studio-led>`},

{ elem: '#border-part-css', language: 'css', 
code:`/* styling the border part */
.dotted-border::part(border) {
    border-style: dotted;
    border-width: 1px;
    border-color: var(--studio-ink-30);
}
.custom-corners::part(border),
.custom-corners::part(surface) {
    border-radius: var(--studio-size-1u);
}`},

{ elem: '#off-opacity-html', language: 'html', 
code:`<studio-led style="--studio-led-off-opacity: .1"></studio-led>
<studio-led style="--studio-led-off-opacity: .2"></studio-led>
<studio-led style="--studio-led-off-opacity: .3"></studio-led>
<studio-led style="--studio-led-off-opacity: .4"></studio-led>`},

{ elem: '#animated-html', language: 'html', 
code:`<studio-led on>
  <div class="led-anim-layer"></div>
</studio-led>`},
{ elem: '#animated-css', language: 'css', 
code:`/* animated overlay */
.led-anim-layer {
    width: 100%;
    height: 100%;
    background-color: var(--studio-azure);
    animation: kf-led-anim-layer 1s infinite;
}
@keyframes kf-led-anim-layer {
    0% {opacity:0;}
    50% {opacity:1;}
    100% {opacity:0;}
}`},

{ elem: '#labeled-html', language: 'html', 
code:`<studio-led class="labeled-led" corners="angled">
    <div class="label">A</div>
</studio-led>
<studio-led on class="labeled-led" corners="angled">
    <div class="label">A</div>
</studio-led>`},
{ elem: '#labeled-css', language: 'css', 
code:`/* labeled led */
studio-led .label {
    font-family: var(--studio-font-family);
    font-weight: 600;
    line-height: 100%;
    vertical-align: top;
    font-size: var(--studio-size-font-xxs);
    text-align: center;
    color: white;
    opacity: .8;
}
.labeled-led[on]::part(surface) {
    border-radius: 0;
    background: radial-gradient(var(--studio-lime-flower), 55%, var(--studio-spruce));
}
studio-led[on] .label {
    color: var(--studio-spruce);
    opacity: 1;
}`},

{ elem: '#icon-html', language: 'html', 
code:`<studio-led on>
    <div class="icon" data-feather="target"></div>
</studio-led>`},
{ elem: '#icon-css', language: 'css', 
code:`.icon {
    vertical-align: top;
    color: var(--studio-neutral);
}`},

{ elem: '#game-of-life-html', language: 'html', 
code:`<!-- 
A matrix of <studio-led> will be inserted into 
this host element by game-of-life-main.js
-->
<div id="life-game-cells"></div>`},

{ elem: '#clickable-html', language: 'html', 
code:`<studio-led id="clickable" 
  style="--studio-width: var(--studio-size-4u);" 
  clickable onclick="ledClickHandler();">
</studio-led>`},
{ elem: '#clickable-js', language: 'js', 
code:`function ledClickHandler() {
  const clickableLed = document.querySelector('#clickable');
  clickableLed.on = !clickableLed.on;
};`},
];