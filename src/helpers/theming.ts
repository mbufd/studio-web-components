/**
 * Helper to set theme and scale classes on <body>
 */
export class Theming {
  // Domain and value for theme and scale
  private _kinds: { [key: string]: { domain: string[], value: number } } = {
    'theme': { domain: ['light', 'dark'], value: 0 },
    'scale': { domain: ['100', '125'], value: 0 }
  };

  toggleTheme() {
    this.cycle('theme');
  }
  setTheme(value: string) {
    this.set('theme', value);
  }
  toggleScale() {
    this.cycle('scale');
  }
  setScale(value: string) {
    this.set('scale', value);
  }

  // Sets a theme or scale directly by value
  private set(kindName: string, value: string) {
    const kind = this._kinds[kindName];
    const domain = kind.domain;
    const valueIndex = kind.domain.indexOf(value);
    if (valueIndex != -1) {
      // Determine old and new class names
      const oldValue = kind.value;
      kind.value = valueIndex;
      const newValue = kind.value;
      // Apply the appropriate class to the <body>
      document.body.classList.add(`studio-${kindName}-${domain[newValue]}`);
      document.body.classList.remove(`studio-${kindName}-${domain[oldValue]}`);
    }
  }

  // Cycle to next theme or scale value in the domain and apply classes to <body>
  private cycle(kindName: string) {
    const kind = this._kinds[kindName];
    const newValueIndex = (kind.value + 1) % kind.domain.length;
    this.set(kindName, kind.domain[newValueIndex]);
  }
}