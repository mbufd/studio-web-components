import { siteFile } from '../../../site.js';

export async function getSampleCode() {
    const path = 'component/axis/app';
    const examplePath = `${path}/example`;
  
    await siteFile.loadFile(`${examplePath}/plastic-ruler.html`).then((data) => {
        sampleCode.push({ elem: '#example-html', language: 'html', code: data });
    });
    await siteFile.loadFile(`${examplePath}/example.css`).then((data) => {
        sampleCode.push({ elem: '#example-css', language: 'css', code: data });
    });
    await siteFile.loadFile(`${examplePath}/plastic-ruler.js`).then((data) => {
        sampleCode.push({ elem: '#plastic-ruler-js', language: 'js', code: data });
    });
    await siteFile.loadFile(`${examplePath}/pencil.js`).then((data) => {
        sampleCode.push({ elem: '#pencil-js', language: 'js', code: data });
    });
    await siteFile.loadFile(`${examplePath}/interactor.js`).then((data) => {
        sampleCode.push({ elem: '#interactor-js', language: 'js', code: data });
    });
    await siteFile.loadFile(`${examplePath}/editor.js`).then((data) => {
        sampleCode.push({ elem: '#editor-js', language: 'js', code: data });
    });
    await siteFile.loadFile(`${examplePath}/plastic-ruler-polygon.js`).then((data) => {
        sampleCode.push({ elem: '#plastic-ruler-polygon-js', language: 'js', code: data });
    });
    await siteFile.loadFile(`${examplePath}/geometry.js`).then((data) => {
        sampleCode.push({ elem: '#geometry-js', language: 'js', code: data });
    });

    return Promise.resolve(sampleCode);
}

const rulerBox = `.ruler-box{
    display: flex; 
    width: fit-content;
    border-radius: 2px;
}
.bk-marine { background-color: var(--studio-marine); }
.vpad-8 { padding: 0 8px 0 8px; }
.hpad-8 { padding: 8px 0 8px 0;}`;

// Static samples
const sampleCode = [
{ elem: '#orientation-html', language: 'html',
code: `<div class="studio-row">
<div class="studio-column">
    <div class="ruler-box vpad-8 bk-marine">
        <studio-axis></studio-axis>
    </div>
</div>
<div class="studio-column">
    <div class="ruler-box hpad-8 bk-marine">
        <studio-axis orientation="h"></studio-axis>
    </div>
</div>
</div>`},
{ elem: '#orientation-css', language: 'css',
code: rulerBox},

{ elem: '#major-sections-html', language: 'html',
code: `<div class="ruler-box hpad-8 bk-marine">
  <studio-axis orientation="h" major-sections="5"></studio-axis>
</div>`},
{ elem: '#major-sections-css', language: 'css',
code: rulerBox},

{ elem: '#minor-sections-html', language: 'html',
code: `<div class="ruler-box hpad-8 bk-marine">
  <studio-axis orientation="h" minor-sections="2"></studio-axis>
</div>`},
{ elem: '#minor-sections-css', language: 'css',
code: rulerBox},

{ elem: '#no-minor-section-html', language: 'html',
code: `<div class="ruler-box hpad-8 bk-marine">
  <studio-axis orientation="h" minor-sections="0"></studio-axis>
</div>`},
{ elem: '#no-minor-section-css', language: 'css',
code: rulerBox},

{ elem: '#ticks-html', language: 'html',
code: `<div class="studio-column">
  <div class="ruler-box hpad-8 bk-marine">
    <studio-axis ticks="l" orientation="h"></studio-axis>
  </div>
  <div class="ruler-box hpad-8 bk-blueberry">
    <studio-axis ticks="c" orientation="h"></studio-axis>
  </div>
  <div class="ruler-box hpad-8 bk-sea">
    <studio-axis ticks="r" orientation="h"></studio-axis>
  </div>
  <div class="studio-row">
    <div class="ruler-box vpad-8 bk-marine">
        <studio-axis ticks="l"></studio-axis>
    </div>
    <div class="ruler-box vpad-8 bk-blueberry">
        <studio-axis ticks="c"></studio-axis>
    </div>
    <div class="ruler-box vpad-8 bk-sea">
        <studio-axis ticks="r"></studio-axis>
    </div>
  </div>
</div>`},
{ elem: '#ticks-css', language: 'css',
code: rulerBox},

{ elem: '#major-length-html', language: 'html',
code: `<div class="studio-column">
  <div class="ruler-box hpad-8 bk-marine">
    <studio-axis major-length="50%" orientation="h"></studio-axis>
  </div>
  <div class="ruler-box hpad-8 bk-blueberry">
    <studio-axis major-length="12px" orientation="h"></studio-axis>
  </div>
  <div class="ruler-box hpad-8 bk-sea">
    <studio-axis major-length="8" orientation="h"></studio-axis>
  </div>
</div>`},
{ elem: '#major-length-css', language: 'css',
code: rulerBox},

{ elem: '#minor-length-html', language: 'html',
code: `<div class="studio-column">
  <div class="ruler-box hpad-8 bk-marine">
    <studio-axis minor-length="33%" orientation="h"></studio-axis>
  </div>
  <div class="ruler-box hpad-8 bk-blueberry">
    <studio-axis minor-length="6px" orientation="h"></studio-axis>
  </div>
  <div class="ruler-box hpad-8 bk-sea">
    <studio-axis minor-length="3" orientation="h"></studio-axis>
  </div>
</div>`},
{ elem: '#minor-length-css', language: 'css',
code: rulerBox},

{ elem: '#major-weight-html', language: 'html',
code: `<div class="ruler-box hpad-8 bk-marine">
  <studio-axis major-weight="2" orientation="h"></studio-axis>
</div>`},
{ elem: '#major-weight-css', language: 'css',
code: rulerBox},

{ elem: '#minor-weight-html', language: 'html',
code: `<div class="ruler-box hpad-8 bk-marine">
  <studio-axis minor-weight="2" orientation="h"></studio-axis>
</div>`},
{ elem: '#minor-weight-css', language: 'css',
code: rulerBox},

{ elem: '#rounded-ticks-html', language: 'html',
code: `<div class="ruler-box hpad-8 bk-marine">
  <studio-axis rounded-ticks 
                major-weight="2" orientation="h"></studio-axis>
</div>`},
{ elem: '#rounded-ticks-css', language: 'css',
code: rulerBox},

{ elem: '#length-html', language: 'html',
code: `<div class="ruler-box hpad-8 bk-marine">
  <studio-axis orientation="h"
    style="--studio-length: var(--studio-size-3b);">
  </studio-axis>
</div>`},
{ elem: '#length-css', language: 'css',
code: rulerBox},

{ elem: '#thickness-html', language: 'html',
code: `<div class="ruler-box hpad-8 bk-marine">
  <studio-axis orientation="h"
    style="--studio-thickness: var(--studio-size-4u);">
  </studio-axis>
</div>`},
{ elem: '#thickness-css', language: 'css',
code: rulerBox},

{ elem: '#slider-compo-html', language: 'html',
code: `<div class="studio-row">
  <studio-slider>
    <studio-axis fit slot="cursor-range"></studio-axis>
  </studio-slider>
  <studio-slider orientation="h">
    <studio-axis fit slot="cursor-range" orientation="h"></studio-axis>
  </studio-slider>
</div>`},

{ elem: '#pad-compo-html', language: 'html',
code: `<studio-pad swipe xy-fx="xy">
  <div style="padding-top: var(--studio-size-1u); padding-left: var(--studio-size-1u);">PAD</div>
  <div slot="secondary" style="padding-left: var(--studio-size-1u);">Swipe me</div>
  <div slot="inner-surface">
    <studio-axis fit orientation="v" style="position: absolute;" major-sections="5" minor-sections="5"
        major-length="3px" minor-length="3px">
    </studio-axis>
    <studio-axis fit orientation="h" style="position: absolute;" major-sections="5" minor-sections="5"
        major-length="3px" minor-length="3px">
    </studio-axis>
  </div>
</studio-pad>`},

{ elem: '#fit-html', language: 'html',
code: `<studio-slider orientation="h">
  <studio-axis fit slot="cursor-range" orientation="h" 
      style="--studio-accent-color: var(--studio-azure);">
  </studio-axis>
</studio-slider>`},

];