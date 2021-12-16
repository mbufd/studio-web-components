import { html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { StudioLitElement } from '../common/studio-lit-element';
import { styles } from './led.css';

/**
 * Represents a LED which can be turned on or off.
 * The component has a surface part with is the actual LED,
 * and a border part, that represents the socket around the LED.
 */
@customElement('studio-led')
export class StudioLedElement extends StudioLitElement {
  /* Styles for the component */
  static styles = styles;

  /**
   * corners (corners)
   * 
   * 'angled' : 1px border radius
   * 'rounded' : rounded border radius
   */
  @property({ reflect: true })
  corners = 'rounded';

  /**
   * on (on)
   * 
   * Will light up when on
   */
  @property({ attribute: "on", type: Boolean, reflect: true })
  on = false;

  /**
   * normalized-intensity (normalizedIntensity)
   * 
   * Applied only when the LED is 'on', that is when the LED has
   * the on attribute. Ignored otherwise.
   */
  @property({ attribute: 'normalized-intensity', type: Number, reflect: true })
  normalizedIntensity = .5;

  /**
   * min-intensity (minIntensity)
   */
  @property({ attribute: 'min-intensity', type: Number, reflect: true })
  minIntensity = 100;

  /**
   * max-intensity (maxIntensity)
   */
  @property({ attribute: 'max-intensity', type: Number, reflect: true })
  maxIntensity = 150;

  /**
   * clickable
   */
  @property({ type: Boolean, reflect: true })
  clickable = false;

  /**
   * render
   */
  render() {
    let styles = '';
    if (this.on) {
      const normalizedIntensity = Math.min(1, Math.max(0, this.normalizedIntensity));
      const intensity = this.minIntensity + ((this.maxIntensity - this.minIntensity) * normalizedIntensity);
      const intensityStyle = `filter: brightness(${intensity}%);`;
      styles += intensityStyle;
    }
    return html`
      <div id="border" part="border">
        <div id="surface" part="surface" style="${styles}">
          <slot class="fit"></slot>
        </div>
      </div>
    `;
  }
}

// Make it easy to use from Typescript
declare global { interface HTMLElementTagNameMap { 'studio-led': StudioLedElement } }
