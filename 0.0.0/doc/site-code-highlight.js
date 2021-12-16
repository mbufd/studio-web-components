/**
 * Manages code highlights on this site, based on prism.js (https://prismjs.com/)
 */
 export class SiteCodeHighlight {
    /**
     * Injects sample code into multiple <pre> elements.
     * @param sampleCode Array of objects with elem, code and language properties,
     * where elem is either a # query selector or the element
     */
    static setCodeSamples(sampleCode) {
        if(sampleCode) {
            sampleCode.forEach((sample) => {
                SiteCodeHighlight.setCode(sample.elem, sample.code, sample.language);
            });    
        }
    }
    static setCode(inElement, code, language) {
        const elem = typeof inElement == 'string' ? document.querySelector(inElement) : inElement;
        if (elem) {
            // For html, replace the '<' and '>' characters by '&lt;' and '&gt;'
            language == 'html' ? code = code.split('<').join('&lt;').split('>').join('&gt;') : code;
            var preElement = document.createElement('pre');
            var codeElement = document.createElement('code');
            codeElement.className = `language-${language}`;
            codeElement.innerHTML = code;
            preElement.appendChild(codeElement);
            elem.appendChild(preElement);
            Prism.highlightElement(codeElement);
        }
    }
}