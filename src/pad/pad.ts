import { html } from "lit";
import { customElement, property, state } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { StudioLitElement } from '../common/studio-lit-element';
import { styles } from './pad.css';
import { IGeometryPoint } from '../common/geometry/geometry';
import { SwipeInteractor } from '../common/util/interaction/swipe-interactor';
import { PadSwipeAnimator } from './pad-swipe-animator';
import { StudioPadEvent } from './events';

/**
 * A control pad with X-Y sensitivity
 */
@customElement('studio-pad')
export class StudioPadElement extends StudioLitElement {
  private _swipeInteractor: SwipeInteractor | null = null;
  private _padSwipeAnimator = new PadSwipeAnimator(this);

  /* Styles for the component */
  static styles = styles;

  // Bold main text or not
  @property({ type: Boolean, reflect: true })
  bold = false;

  // Uniform surface color when not highlighted and not active
  @property({ type: Boolean, reflect: true })
  uniform = false;

  // Inset the label(s) or not
  @property({ attribute: 'inset-label', type: Boolean, reflect: true })
  insetLabel = false;

  // Selected or not, shown as inner surface highlighted or not
  @property({ type: Boolean, reflect: true })
  selected = false;

  // Must enable to receive swipe events, xy-fx can be enabled independently
  @property({ type: Boolean, reflect: true })
  swipe = false;

  // Display XY feedback on tap as well as while swiping if swipe is enabled
  @property({ attribute: 'xy-fx', reflect: true })
  xyFx = ''; // x, y or xy (otherwise it's off)

  // Used instead of the CSS :active selector because it doens't work well on touch
  @state()
  private _active = false;

  firstUpdated() {
    const innerElement: HTMLDivElement = this.renderRoot.querySelector('#inner');
    this._swipeInteractor = new SwipeInteractor(innerElement);
  }

  render() {
    const classes = { active: this._active };
    return html`
        <div id="surface" part="outer-surface" class=${classMap(classes)}
         @pointerdown="${this.onPointerDown}" 
         @pointermove="${this.onPointerMove}" 
         @pointerup="${this.onPointerUp}" 
         @contextmenu="${this.preventAndStop}">

          <div id="inner" part="inner-surface" class=${classMap(classes)}>
            <div class="absolute">
              <div id="default-content" class="content"><slot></slot></div>
              <div id="secondary-content" class="content"><slot name="secondary"></slot></div>
            </div>
            <div id="inner-content">
              <slot name="inner-surface"></slot>
            </div>
          </div>

          <div id="label-top" class="label" part="label-top"><slot name="label-top"></slot></div>
          <div id="label-left" class="label" part="label-left"><slot name="label-left"></slot></div>
          <div id="label-right" class="label" part="label-right"><slot name="label-right"></slot></div>
          <div id="label-bottom" class="label" part="label-bottom"><slot name="label-bottom"></slot></div>

          <div id="fx-x" class="fx"></div>
          <div id="fx-y" class="fx"></div>
          <div id="fx-center" class="fx"></div>
        </div>`;
  }

  // Pointer down on pad, animate if necessary and emit event
  // Swipe interactor starts capture
  onPointerDown(pointerEvent: any) {
    this._swipeInteractor!.onPointerDown(pointerEvent).then((event) => {
      this.showAsActive(true);
      if (this.isXYFxOn()) {
        this._padSwipeAnimator.enable(true);
        this._padSwipeAnimator.moveAt(event.offset.x, event.offset.y);
      }
      this.emitAction('down', event.offset, pointerEvent);
    }).catch(() => { });
  }

  // Pointer move on pad, animate if needed and emit move or swipe event
  onPointerMove(pointerEvent: any) {
    this._swipeInteractor!.onPointerMove(pointerEvent).then((event) => {
      if (!this._swipeInteractor?.pointerIsDown) {
        // Just moving over the pad, emit a move event to indicate hovering
        this.emitAction('move', event.offset, pointerEvent);
      }
      else {
        // Show effect if swipeable
        if (this.isSwipeFxEnabled()) {
          // Animate
          const point = this.clipToBounds(event.offset.x, event.offset.y);
          this._padSwipeAnimator.moveAt(point.x, point.y);
        }
        // If swipe is enabled, emit an event regardless of whether the effect is on or off
        if (this.swipe) {
          this.emitAction('swipe', event.offset, pointerEvent);
        }
      }
    }).catch(() => { });
  }

  // Pointer up anywhere, teminate interaction and emit event
  // Swipe interactor ends capture
  onPointerUp(pointerEvent: any) {
    this._swipeInteractor!.onPointerUp(pointerEvent).then((event) => {
      this.showAsActive(false);
      const eventOffset = event !== null ? event.offset : { x: 0, y: 0 };
      this._padSwipeAnimator.enable(false);
      const point = this.clipToBounds(eventOffset.x, eventOffset.y);
      this.emitAction('up', point, event.originalPointerEvent);
    }).catch(() => { });
  }

  // Emits one of the pad events
  private emitAction(action: string, eventOffset: IGeometryPoint, pointerEvent: any) {
    const point = this.clipToBounds(eventOffset.x, eventOffset.y);
    const event = new StudioPadEvent(`studio-pad-${action}`, { bubbles: true, composed: true });
    const xPercent = point.x / this.clientWidth;
    const yPercent = (this.clientHeight - point.y) / this.clientHeight;
    event.studio = {
      offset: {
        x: xPercent,
        y: yPercent
      },
      pointerEvent: pointerEvent
    };
    this.dispatchEvent(event);
  }

  private clipToBounds(x: number, y: number) {
    const point: IGeometryPoint = {
      x: Math.min(Math.max(0, x), this.clientWidth),
      y: Math.min(Math.max(0, y), this.clientHeight)
    }
    return point;
  }

  private isXYFxOn() {
    return this.xyFx === 'x' || this.xyFx == 'y' || this.xyFx == 'xy';
  }

  private isSwipeFxEnabled() {
    return this.swipe;
  }

  /**
   * Using the active CSS class in replacement of the CSS :active selector because :active
   * does not work well on touch. Not ideal, but good enough until better support for styling 
   * on pointer-events is available in CSS.
   */
  private showAsActive(active: boolean) {
    this._active = active;
  }
}

// Make it easy to use from Typescript
declare global { interface HTMLElementTagNameMap { 'studio-pad': StudioPadElement } }