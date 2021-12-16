import { LitElement } from 'lit';

enum ElementVisibility {
  Visible = 'visible',
  Hidden = 'hidden'
}

/**
 * Provides positioning of vertical and horizontal elements on swipe for the studio-pad
 */
export class PadSwipeAnimator {
  private _centerElement: HTMLElement | null = null;
  private _xElement: HTMLElement | null = null;
  private _yElement: HTMLElement | null = null;

  // Requires the studio-pad element
  constructor(private _element: LitElement) { }

  // True if need to render horizontally
  private get visibleHorizontally() {
    return (this._element as any).xyFx === 'xy' || (this._element as any).xyFx === 'x';
  }
  // True if need to render vertically
  private get visibleVertically() {
    return (this._element as any).xyFx === 'xy' || (this._element as any).xyFx === 'y';
  }

  // Make visible or not
  enable(enabled: boolean) {
      this.getElements();
      const visibility = enabled ? ElementVisibility.Visible : ElementVisibility.Hidden;
      if (this._centerElement) {
        this._centerElement.style.visibility = visibility;
        this._xElement.style.visibility = this.visibleHorizontally ? visibility : ElementVisibility.Hidden;
        this._yElement.style.visibility = this.visibleVertically ? visibility : ElementVisibility.Hidden;
      }  
  }

  // Move the lines to the specified position
  moveAt(offsetX: number, offsetY: number) {
    if (this._centerElement) {
      const centerOffset = -2;
      // Center point
      this._centerElement.style.top = `${offsetY + centerOffset}px`;
      this._centerElement.style.left = `${offsetX + centerOffset}px`;
      if(this.visibleHorizontally) {
        // Vertical line for X fx
        this._xElement.style.left = `${offsetX - 1}px`;
      }
      if(this.visibleVertically) {
        // Horizontal line for Y fx
        this._yElement.style.top = `${offsetY - 1}px`;
      }
    }
  }

  // Get elements of interest, assuming the folowing element ids
  private getElements() {
    if (this._centerElement === null) {
      this._centerElement = this._element.renderRoot.querySelector('#fx-center');
      this._xElement = this._element.renderRoot.querySelector('#fx-x');
      this._yElement = this._element.renderRoot.querySelector('#fx-y');
    }
  }
}