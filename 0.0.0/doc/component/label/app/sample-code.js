export async function getSampleCode() {
    return Promise.resolve(sampleCode);
}

// Static samples
const sampleCode = [

{ elem: '#label-content-html', language: 'html',
  code: `<studio-label></studio-label></div>
<div><studio-label>LABEL</studio-label></div>`},

{ elem: '#text-color-html', language: 'html',
  code: `<studio-label 
  style="--studio-content-color: var(--studio-lemon)">LABEL
</studio-label>`},

{ elem: '#label-icon-html', language: 'html',
  code: `<studio-label>
  <div data-feather="star" 
    style="height: 1em; width: 1em;"></div>
</studio-label>`},

{ elem: '#hex-color-html', language: 'html',
  code: `<studio-label 
  style="--studio-surface-color: #826f5e">
    LABEL
</studio-label>`},

{ elem: '#studio-color-html', language: 'html',
  code: `<studio-label 
  style="--studio-surface-color: var(--studio-candy);">
    LABEL
</studio-label>`},

{ elem: '#led-content-html', language: 'html',
  code: `<studio-label>
  <studio-led on class="label-led">
      <div class="led-anim-layer"></div>
  </studio-led>
</studio-label>`},
{ elem: '#led-content-css', language: 'css',
  code: `.label-led {
    --studio-surface-color: var(--studio-orange);
    --studio-border-color: transparent;
    --studio-width: var(--studio-size-1b);
    --studio-height: var(--studio-size-2u);
}
.led-anim-layer {
  width: 100%;
  height: 100%;
  background-color: var(--studio-azure);
  animation: kf-led-anim-layer 1s infinite;
}
@keyframes kf-led-anim-layer {
    0% {opacity:0;}
    100% {opacity:1;}
}`},

  { elem: '#custom-size-html', language: 'html',
  code: `<studio-label 
  style="--studio-length: 150px; 
         --studio-thickness: 25px;">
    150px &times; 25px
</studio-label>`},

{ elem: '#studio-size-html', language: 'html',
code: `<studio-label 
  style="--studio-length: var(--studio-size-6b); 
         --studio-thickness: var(--studio-size-5u);">
    --studio-size-6b &times; --studio-size-5u
</studio-label>`},

{ elem: '#orientation-html', language: 'html',
code: `<!-- horizontal -->
<studio-label>h</studio-label>
<!-- vertical, rotation 90 deg to the left -->
<studio-label orientation="90l">90&deg; left</studio-label>
<!-- vertical, rotation 90 deg to the right -->
<studio-label orientation="90r">90&deg; right</studio-label>`},

{ elem: '#surface-part-html', language: 'html',
code: `<studio-label class="surface-gradient">
  LINEAR GRADIENT
</studio-label>`},
{ elem: '#surface-part-css', language: 'css',
code: `.surface-gradient::part(surface) {
  background: linear-gradient(to right, 
    hsl(var(--studio-hue-indigo), 100%, 10%), 
        var(--studio-indigo));
}`},

{ elem: '#accent-html', language: 'html',
code: `<!-- Accent at start, end and both -->
<studio-label accent='s'>s</studio-label>
<studio-label accent='e'>e</studio-label>
<studio-label accent='se'>se</studio-label>
`},

{ elem: '#accent-color-html', language: 'html',
code: `<!-- Accent color -->
<studio-label accent='se' 
  style="--studio-accent-color: var(--studio-turquoise)">
    turquoise
</studio-label>
`},

{ elem: '#accent-length-html', language: 'html',
code: `<!-- Accent length -->
<studio-label accent='se'
  style="--studio-accent-color: var(--studio-turquoise);  
         --studio-label-accent-length: var(--studio-size-4u);">
    4u
</studio-label>
`},
];