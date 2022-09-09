import { modalize } from './functions';
import EventPage from './EventPage';

// initialize the entire page as an object
// all the rest happens starting from the
// EventPage object's constructor function
new EventPage;

// sample implementation of the modal, just to test it before
// making it part of the entire EventPage functionality
// with this implementation, the script is looking for any elements
// with attribute data-open-modal="" and uses them as triggers
// to create a modal around elements specified by the selector
// in the attribute's value
// e.g. clicking <button data-open-modal=".my-element"></button>
// opens a modal and shows the element with class my-element inside
document.querySelectorAll('[data-open-modal]').forEach(trigger => {

    const content_selector = trigger.getAttribute('data-open-modal');

    const content_element = document.querySelector(content_selector);

    if (content_element) {

        const modal = modalize(content_selector);

        trigger.addEventListener('click', event => {

            event.preventDefault();

            modal.open();

        })

    }

})