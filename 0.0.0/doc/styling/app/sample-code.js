export const sampleCode = [

{ elem: '#surface-part-html', language: 'html',
code: `<studio-led id="pink-led"></studio-led>
<studio-led id="pink-led" on></studio-led>`
},
{ elem: '#surface-part-css', language: 'css',
code: `#pink-led::part(surface) {
    background-color: var(--studio-pink);
}
/* glow inwards when the LED is on */
#pink-led[on]::part(surface) {
    box-shadow: inset 0 0 3px 1px white;
}`
},
{ elem: '#border-part-html', language: 'html',
code: `<studio-led id="dashed-border"></studio-led>`
},
{ elem: '#border-part-css', language: 'css',
code: `#dashed-border::part(border) {
    border-color: var(--studio-ink-12);
    border-style: dashed;
}`
},
{ elem: '#custom-property-html', language: 'html',
code: `<studio-led id="green-led"></studio-led>`
},
{ elem: '#custom-property-css', language: 'css',
code: `#green-led {
    --studio-surface-color: green;
}`
},
{ elem: '#style-attribute-html', language: 'html',
code: 
`<studio-led style="--studio-surface-color: green">
</studio-led>`
},

];
