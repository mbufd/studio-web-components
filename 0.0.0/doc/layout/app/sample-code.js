const blockCss = `.block {
    width: var(--studio-size-1b);
    height: var(--studio-size-3u);
    background: var(--studio-azure);
}`;

export const sampleCode = [
    { elem: '#studio-column-row-html', language: 'html',
code: `<div class="studio-column">
<div class="studio-row">
    <div class="block"></div>
    <div class="block"></div>
</div>
<div>
    <div class="block" style="width: var(--studio-size-2b);"></div>
</div>
</div>`},
{ elem: '#block-css', language: 'css', code: blockCss},

{ elem: '#studio-row-html', language: 'html',
code: `<div class="studio-row">
  <div class="block"></div>
  <div class="block"></div>
</div>`},
{ elem: '#row-block-css', language: 'css', code: blockCss},


{ elem: '#studio-column-html', language: 'html',
code: `<div class="studio-row">
  <div class="block"></div>
  <div class="block"></div>
</div>`},
{ elem: '#column-block-css', language: 'css', code: blockCss},

{ elem: '#grid-html', language: 'html',
code: `<div class="studio-column">
  <div class="studio-row">
    <div class="block" style="height: var(--studio-size-7u); 
                              width: var(--studio-size-2b);">
    </div>
    <div class="block" style="height: var(--studio-size-7u); 
                              width: var(--studio-size-2b);">
    </div>
  </div>
  <div class="studio-row">
    <div class="block" style="height: var(--studio-size-7u); 
                              width: var(--studio-size-3b);">
    </div>
    <div class="studio-column">
        <div class="block"></div>
        <div class="block"></div>
    </div>
  </div>
</div>`},
{ elem: '#grid-css', language: 'css', code: blockCss},
];

