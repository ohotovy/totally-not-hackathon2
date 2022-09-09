import { makeElementFromHTML } from './functions';

export default class Event {

    constructor(data) {

        this.id = data.id;
        this.name = data.name;
        this.description = data.description;
        this.date = data.date;
        this.image_url = data.image_url;

        // this property expects a callback function
        // (Ha! Higher-order functions!)
        // it is set to this object from the outside,
        // in our case by the EventPage, look there
        this.onRegister = null;

        this.element = this.createElement();
        this.activate();
    }

    // puts the event into the document
    createElement() {
        const element = makeElementFromHTML(
            `<div class="events-container__event">
                <h2 class="events-container__event-name">${this.name}</h2>
                <button class="events-container__event-button register-button button">More</button>
            </div>`
        );

        return element;
    }

    activate() {
        const register_button = this.element.querySelector('.register-button');
        register_button.addEventListener('click', event => {
            event.preventDefault();

            // if this object was given a function to run when its register
            // button is clicked, let's call it!
            if (this.onRegister) {
                this.onRegister(event);
            }
        })
    }

    getElement() {
        return this.element;
    }
}