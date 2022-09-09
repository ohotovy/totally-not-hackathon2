import { modalize, fetchFromAPI } from "./functions";

/**
 * yet another part of the page represented as a class
 * and an object
 */
export default class RegistrationForm {

    constructor() {

        // find the actual element
        this.container = document.querySelector('#registration-form');

        // let's use all that modal functionality to put the form
        // into a modal window
        this.modal = modalize('#registration-form');

        // id of the event
        // we will use it to formulate the correct URL to submit the form to
        // right now it is null, but will be set later (see updateFromEvent method)
        this.event_id = null;

        // activate the form so that it does the right thing when being submitted
        this.activate();
    }

    updateFromEvent(event) {

        // set the id of the event
        this.event_id = event.id;

        // set the name of the event
        const event_name_element = this.container.querySelector('.registration-form__event-name');
        event_name_element.innerHTML = event.name;
    }

    /**
     * shows the form (the modal in which we put it before)
     */
    show() {
        this.modal.open();
    }

    /**
     * activates the elements of the form that require
     * some special functionality
     */
    activate() {
        this.container.addEventListener('submit', event => {
            event.preventDefault();

            // submit ourselves
            this.submit();
        })
    }

    /**
     * actual submission of the form
     *
     * is separated into a separate function to be able to use
     * the async-await goodness
     */
    async submit() {

        // gather data from the form input fields
        const form_data = this.gatherData();

        // send the request
        const response = await fetchFromAPI(this.getSubmitUrl(), {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(form_data)
        })

        const data = await response.json();

        console.log(data);
    }

    /**
     * formulate the URL to submit, using the this.event_id property
     */
    getSubmitUrl() {
        return `/events/${this.event_id}/registrations`;
    }

    /**
     * gathers data currently in the input fields of the form
     * and returns it as a nice JS object
     */
    gatherData() {

        const inputs = this.container.querySelectorAll('.registration-form__input');

        const data = {};

        inputs.forEach(input => {
            const name = input.getAttribute('name');
            const value = input.value;

            data[name] = value;
        })

        return data;
    }
}