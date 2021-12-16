export const sampleCode = [
{ elem: '#npm-install', language: 'html',
  code:`npm install studio-web-components`},

{ elem: '#custom-elements-schema-ts', language: 'js',
code:`// Use CUSTOM_ELEMENTS_SCHEMA for integration of Web Components
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
@NgModule({
  declarations: [ AppComponent ],
  imports: [ BrowserModule ],
  schemas: [ 
    // Use CUSTOM_ELEMENTS_SCHEMA for integration of Web Components
    CUSTOM_ELEMENTS_SCHEMA 
  ], 
  bootstrap: [ AppComponent ]
})
export class AppModule { }`},

{ elem: '#fonts-css', language: 'css',
code:`/* Load the prefered font for the Studiö Web Components */
@import url('https://fonts.googleapis.com/css2?family=Bai+Jamjuree&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Bai+Jamjuree:wght@600&display=swap');`},

{ elem: '#angular-json', language: 'js',
code:`"styles": [
  "src/styles.css",
  { "input": "node_modules/studio-web-components/css/studio-css.css", 
             "bundleName": "studio-web-components" },
  { "input": "node_modules/studio-web-components/css/studio-scale-125.css", 
             "bundleName": "studio-web-components" },
  { "input": "node_modules/studio-web-components/css/studio-scale-100.css", 
             "bundleName": "studio-web-components" },
  { "input": "node_modules/studio-web-components/css/studio-light.css", 
             "bundleName": "studio-web-components" },
  { "input": "node_modules/studio-web-components/css/studio-dark.css", 
             "bundleName": "studio-web-components" }
],`},

{ elem: '#app-module-ts', language: 'js',
code:`// Import the Studiö Web Components
import 'studio-web-components';`},

{ elem: '#body-style-css', language: 'css',
code:`body {
  /* Use Studiö paper and ink */
  background-color: var(--studio-paper-30);
  color: var(--studio-ink-30);
}`},

{ elem: '#theming-from-component-html', language: 'html',
code:`<!-- Toggle theme -->
<button (click)="theming.toggleTheme()">Toggle theme</button>
<!-- Toggle scale -->
<button (click)="theming.toggleScale()">Toggle scale</button>`},

{ elem: '#theming-from-component-ts', language: 'js',
code:`import { Theming } from "studio-web-components/helpers/theming";

@Component({
  selector: 'my-component',
  templateUrl: './my-component.component.html',
  styleUrls: ['./my-component.component.css']
})
export class MyComponent {
  theming = new Theming();
}`},

{ elem: '#binding-html', language: 'html',
code:`<div class="studio-row">
<!-- Using *ngFor to display 4 studio-slider elements -->
<div *ngFor="let slider of sliders; let sliderIndex = index;">
  <studio-slider [value]="slider.value" end-value="100" step="1"
                 (studio-slider-value)="onSliderValue($event, sliderIndex)">
    <!-- Display the slider value using studio-label -->
    <studio-label slot="label-start" class="slider-label">{{slider.value}}</studio-label>
    <!-- Some tick marks using studio-axis-->
    <studio-axis slot="cursor-range" fit></studio-axis>
  </studio-slider>
</div>
</div>`},

{ elem: '#binding-ts', language: 'js',
code:`import { Component } from '@angular/core';
import { StudioSliderValueEvent } from 'studio-web-components/slider/slider-events';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  // Data for studio-slider elements using *ngFor
  sliders: any[] = [
    { value: 0 },
    { value: 25 },
    { value: 50 },
    { value: 75 }
  ];
  // Update the slider data when the slider value changes
  onSliderValue(event: Event, sliderIndex: any) {
    const value: number = (event as StudioSliderValueEvent).studio.value;
    this.sliders[sliderIndex].value = value;
  }
}`},

];


