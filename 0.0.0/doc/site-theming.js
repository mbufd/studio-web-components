/**
 * site-theming.js
 * 
 * Simple management of theme and scale for this site. In short:
 * - CSS classes site-theme and site-scale are target of tagging with theme and scale classes.
 * - An element with site-theme class gets tagged by apply() with either studio-theme-light or studio-theme-dark.
 * - An element with site-scale class gets tagged by apply() with either studio-scale-small or studio-scale-medium.
 * - Theme and scaled are memorized in localStorage under site.theme and site.scale, for use by apply()
 */

 class ThemingBase {
    _domain;
    _kind;
    _defaultValue;
    _value;

    get value() {
        return this._value;
    }
    set value(value) {
        this._value = value;
        this.writeToStorage(value);
        this.apply();
    }
    get domain() {
        return this._domain;
    }
    get kind() {
        return this._kind;
    }
    get storageKey() {
        return `site-${this.kind}`;
    }
    mapValue(useDefault) {
        return useDefault ? this._domain[0] : this._domain[1];
    }
    writeToStorage(value) {
        localStorage.setItem(this.storageKey, this.mapValue(value));
    }
    readFromStorage() {
        const value = localStorage.getItem(this.storageKey);
        return this.mapValue(value === null || value == this._defaultValue);
    }
    apply() {
        const value = this.readFromStorage();
        const themeElements = document.querySelectorAll(`.site-${this.kind}`);
        themeElements.forEach((themeElement) => {
            this.domain.forEach((domainValue) => {
                themeElement.classList.remove(`studio-${this.kind}-${domainValue}`);
            });
            themeElement.classList.add(`studio-${this.kind}-${value}`);
        });
    }
}

class ColorTheming extends ThemingBase {
    constructor() {
        super();
        this._kind = 'theme';
        this._defaultValue = 'dark';
        this._domain = [this._defaultValue, 'light'];
        this._value = this._defaultValue;
    }
}

class ScaleTheming extends ThemingBase {
    constructor() {
        super();
        this._kind = 'scale';
        this._defaultValue = '100';
        this._domain = [this._defaultValue, '125'];
        this._value = this._defaultValue;
    }
}

/* Expose globally to click handlers to apply theme and scale */
window.studioSite = {
    setToDark: (dark) => {
        siteTheme.value = dark;
        closeSettings();
    },
    setToSmall: (small) => {
        siteScale.value = small;
        closeSettings();
    }
}
function closeSettings() {
    const dropDownElements = document.querySelectorAll('.settings-dropdown');
    dropDownElements.forEach((dropDownElement) => {
        UIkit.dropdown(dropDownElement).hide();
    });
}

export const siteTheme = new ColorTheming();
export const siteScale = new ScaleTheming();
