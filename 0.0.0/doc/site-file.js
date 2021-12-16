class SiteFile{
    baseHref = '';

    loadFile(fileName) {
        const absolute = fileName.indexOf('/') == 0;
        const filePath = absolute ? fileName : `${this.baseHref}${fileName}`;
        return new Promise((resolve, reject) => {
            const responseText = fetch(filePath).then((response) => {
                if (!response.ok) {
                    reject(`HTTP error ${response.status} while loading ${filePath}`);
                }
                return response.text();
            });
            responseText.then((html) => {
                resolve(html);
            }).catch(reject);
        });
    }
}

export const siteFile = new SiteFile();