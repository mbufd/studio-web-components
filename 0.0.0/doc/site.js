import { siteTheme, siteScale } from './site-theming.js';
import { siteSection } from './site-section.js';
import { SiteCodeHighlight } from './site-code-highlight.js';
import { siteFile } from './site-file.js';
import { baseHref } from './site-base-href.js';
import './studio.js';

window.siteIntro = {
    navigate: (src) => {
        window.location = src;
    }
}

/* Some sections use feature icons (https://github.com/feathericons/feather) */
class FeaterIcons {
    static replace() {
        if (feather) {
            feather.replace();
        }
    }
}

export {
    siteTheme,
    siteScale,
    SiteCodeHighlight,
    siteFile
};


window.addEventListener('load', (event) => {
    /**
     * index.html needs <base href="...path to doc/">
     * site-base-href.js must have the same href value
     * siteSection, siteFile and libraryLoader need to be given the href
     * 
    */
    siteSection.baseHref = baseHref;
    siteFile.baseHref = baseHref;
    const bodyElement = document.querySelector('body');
    bodyElement.style.visibility = 'visible';
    siteTheme.apply();
    siteScale.apply();
    siteSection.loadSections().then(() => {
        FeaterIcons.replace();
        console.log('** all sections loaded **')
        const siteLoadedEvent = new Event('site-loaded', { bubbles: true, composed: true });
        document.dispatchEvent(siteLoadedEvent);
    });
});