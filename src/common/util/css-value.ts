/**
 * Brute force parser for values such as 10px or 10%
 * Note: unfortunately the CSS Typed OM is not adopted across browsers...
 *   https://developer.mozilla.org/en-US/docs/Web/API/CSSNumericValue/parse
 */
 export class CSSValue {
    private constructor(public value: number, public unit: string) {}
    static readonly suffixes = ['px', '%']; // First one (px) is default
    /**
     * Returns a new CSSValue object matching the specified string.
     * @param cssValueString String to parse
     * @returns { value: number, unit: string } where unit is 'px' or '%'.
     * Or returns null if the string is invalid.
     */
    static fromCSSString(cssValueString: string) {
        cssValueString = cssValueString.toLowerCase().trim();
        for(let s=0; s<=CSSValue.suffixes.length; s++) {
           const suffix = CSSValue.suffixes[s];
           const value = CSSValue.extractSuffixedValue(cssValueString, suffix);
           if(value !== null) {
               return new CSSValue(value, suffix);
           }
        };
        // Set default if plain number
        const value = parseFloat(cssValueString);
        if(value.toString() == cssValueString) {
            return new CSSValue(value, CSSValue.suffixes[0]);
        }
        return null;
    }
    private static extractSuffixedValue(content: string, suffix: string) {
        let index = content.indexOf(suffix);
        if(index > 0) {
            const value = parseFloat(content.slice(0, index));
            if(!Number.isNaN(value) && content.slice(index, content.length) == suffix) {
                return value;
            }
        }
        return null;
    }
}