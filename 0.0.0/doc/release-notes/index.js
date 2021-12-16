import '../site.js';
import { siteFile } from '../site-file.js';

window.addEventListener('site-loaded', (event) => {
    siteFile.loadFile('release-notes/RELEASE-NOTES.md').then((content) => {
        const releaseNotes = document.querySelector('#release-notes');
        releaseNotes.innerHTML = marked.parse(content);    
    });
});
