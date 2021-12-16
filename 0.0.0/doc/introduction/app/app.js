export class App {
    static leds = [];
    static async load() {
        App.loadLEDs();
        App.animateLEDs();    
    }

    static animateLEDs() {
        let ledIndex = 0;
        setInterval(() => {
            if(App.leds.length == 0) {
                App.loadLEDs();
            }
            App.leds[ledIndex].on = false;
            ledIndex = (ledIndex + 1) % App.leds.length;
            App.leds[ledIndex].on = true;
        }, 200);
    }

    static loadLEDs() {
        App.leds = [];
        const ledElements = document.querySelectorAll('.site-intro-led');
        ledElements.forEach((ledElement) => {
            App.leds.push(ledElement);
        });
    }
}