/**
 * site-section.js
 * 
 * Simple management of HTML snippet injection to help break down the static documentation
 * into small HTML files.
 * - A section must be a div with class site-section
 *   - The div must have a src attribute to refer to the HTML snippet to inject
 * - Example: <div class="site-section" src="common/logo.html"></div>
 */

class SiteSection {
    baseHref = '';

    loadSections(retries = 2) {
        return new Promise((resolve, reject) => {
            this.loadSectionsFromElement(document).then(resolve).catch(() => {
                if(retries > 0) {
                    retries--;
                    this.loadSections(retries).then(resolve).catch(reject);
                }
                else {
                    reject();
                }
            });
        });
    }

    // Recursively load sections
    loadSectionsFromElement(root) {
        return new Promise((resolve, reject) => {
            const sections = root.querySelectorAll('.site-section');
            if (sections && sections.length > 0) {
                let nLoaded = 0;
                for(let i=0; i<sections.length; i++) {
                    const section = sections[i];
                    const src = section.getAttribute('src');
                    if (src) {
                        this.loadInnerHTMLFromFile(section, src).then(() => {
                            this.loadSectionsFromElement(section).then(() => {
                                nLoaded++;
                                if(nLoaded == sections.length) {
                                    resolve();
                                }
                            }).catch(reject);
                        }).catch(reject);              
                    }
                    else {
                        reject();
                    }
                }
            }
            else {
                resolve();
            }
        });
    }

    /**
    * element: a HTMLDivElement
    * htmlFileName: name of the HTML file to load into the div
    */
    loadInnerHTMLFromFile(element, htmlFileName) {
        const absolute = htmlFileName.indexOf('/') == 0;
        const htmlFilePath = absolute ? htmlFileName : `${this.baseHref}${htmlFileName}`;
        return new Promise((resolve, reject) => {
            const responseText = fetch(htmlFilePath).then((response) => {
                if (!response.ok) {
                    reject(`HTTP error ${response.status} while loading ${htmlFilePath}`);
                }
                return response.text();
            });
            responseText.then((html) => {
                element.innerHTML = html;
                resolve(htmlFilePath);
            }).catch(reject);
        });
    }
}

export const siteSection = new SiteSection();

