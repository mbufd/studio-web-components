import { LitElement } from 'lit';

/**
 * Super-class for the Studio Web Components.
 * Provides common plumbing
 */
export class StudioLitElement extends LitElement {
    // For setter of an attribute / property
    protected setPropertyValue(propertyName: string, attributeName: string, newValue: any): any {
        const thisObject = (this as any);
        const oldValue = thisObject[propertyName];
        thisObject[propertyName] = newValue;
        this.requestUpdate(attributeName, oldValue);
    }
    // For setter of an attribute / property of type number
    protected setPropertyNumberValue(propertyName: string, attributeName: string, newValue: number): any {
        if(typeof newValue == 'string') { // runtime type casting 
            newValue = parseInt(newValue);
        }
        this.setPropertyValue(propertyName, attributeName, newValue);
    }
    
    // Event handler to dismiss the event
    preventAndStop(event: any) {
        event.preventDefault();
        event.stopPropagation();
    }
}