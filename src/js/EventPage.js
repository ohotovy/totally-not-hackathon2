import { fetchFromAPI, makeElementFromHTML } from './functions';
import Event from './Event';
import FeaturedEvent from './FeaturedEvent';
import RegistrationForm from './RegistrationForm';

/**
 * anything can be expressed as an object...
 * ...including the entire page
 */

export default class EventPage {

    constructor() {

        this.container = document.querySelector('#events');

        // let's keep track of the modals that we create
        // that will help us to clean them up when we need to
        this.modals = {};

        this.initializeRegistrationForm();

        this.loadData();
    }

    /**
     * loads the event data from the API
     * and displays it
     */
    async loadData() {

        // display the "Loading..." message
        this.displayLoader();

        // use our custom-made function (see functions.js)
        // to fetch, needing to specify only the relative
        // path of the API endpoint
        const response = await fetchFromAPI('/events');

        // hide the "Loading..." message
        this.hideLoader();

        // parse the response data as JSON
        const data = await response.json();

        // use the data to display the events
        this.displayEvents(data);
    }

    displayEvents(events) {

        // clear the events previously there
        // it is always safer to build elements anew
        this.clearEvents();

        events.forEach((event_data, i) => {

            // declare the variable here, because we will want
            // to keep it after the following condition
            let event = null;

            // creare a FeatureEvent object for the first event
            // a common Event object for the rest
            if (i === 0) {
                event = this.displayFeaturedEvent(event_data);
            } else {
                event = this.addEvent(event_data);
            }

            // okay, we have an Event or FeaturedEvent object
            // let's tell it what to do when its "Register" or "More"
            // button is clicked
            event.onRegister = () => {
                // what will happen is that we will give the event
                // to the RegistrationForm object to use it as it
                // sees fit (update the form's contents)
                this.registration_form.updateFromEvent(event);

                // ...and display the form
                // (notice that we are not doing decisions on what
                // it means to display the form HERE. We leave it up
                // to the RegistrationForm to decide how to display
                // the form)
                this.registration_form.show();
            }
        })
    }

    /**
     * removes the featured event element and clears all content from
     * the events container
     */
    clearEvents() {
        const featured = this.container.querySelector('.featured-event');
        if (featured) {
            featured.remove();
        }

        this.container.querySelector('.events-container').innerHTML = '';
    }

    /**
     * displays HTML for a featured event
     */
    displayFeaturedEvent(data) {

        const event = new FeaturedEvent(data);

        // insert at the top of container
        this.container.insertBefore(event.getElement(), this.container.firstChild);

        return event;
    }

    /**
     * displays HTML for a common event
     */
    addEvent(data) {
        const event = new Event(data);

        // insert at the top of container
        this.container.querySelector('.events-container').appendChild(event.getElement());

        return event;
    }

    /**
     * gets the loader element in the page
     * if not found, it first creates it
     * like that we can be sure that we always get it
     */
    getLoader() {
        let loader = this.container.querySelector('.events__loader');
        if (!loader) {
            loader = document.createElement('div');
            loader.classList.add('events__loader', 'events__loader--hidden');
            loader.innerHTML = 'Loading...';
            this.container.appendChild(loader);
        }

        return loader;
    }

    /**
     * displays the element with the "Loading..." message
     */
    displayLoader() {
        this.getLoader().classList.remove('events__loader--hidden');
    }

    /**
     * hides the element with the "Loading..." message
     */
    hideLoader() {
        this.getLoader().classList.add('events__loader--hidden');
    }


    /**
     * prepares the registration form object that will take care
     * of the entire process or registering for an event
     */
    initializeRegistrationForm() {
        this.registration_form = new RegistrationForm;
    }
}