import { html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { StudioLitElement } from '../common/studio-lit-element';
import { styles } from './label.css';

/**
 * A label which can be oriented horizontally or sideways.
 */
@customElement('studio-label')
export class StudioLabelElement extends StudioLitElement {
    /* Styles for the component */
    static styles = styles;

    // Orientation
    @property({ reflect: true })
    orientation = 'h'; // h, 90l or 90r

    // Accent
    @property({ reflect: true })
    accent = ''; // s, e, se

    /**
     * render
     */
    render() {
        return html`
        <div id="surface" part="surface">
            <div id="accent-start" class="accent"><slot name="accent-start"></slot></div>
            <div id="accent-end" class="accent"><slot name="accent-end"></slot></div>
            <div id="content">
               <slot id="default-slot"></slot>
            </div>
        </div>
        `;
    }
}

// Make it easy to use from Typescript
declare global { interface HTMLElementTagNameMap { 'studio-label': StudioLabelElement } }
