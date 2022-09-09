import Modal from './Modal';

const modals_on_page = {}

const modalize = (content_selector) => {

    // if a modal for this selector already exists,
    // just return it
    // this is so that we can have multiple triggers
    // for the same content and they don't "steal"
    // it from each other
    if (modals_on_page[content_selector] || false) {
        return modals_on_page[content_selector];
    }

    const content_element = document.querySelector(content_selector);

    const modal = new Modal(content_element);

    modals_on_page[content_selector] = modal;

    return modal;

}

/**
 * realizing that all API AJAX calls are similar,
 * it seems practical to create a custom function
 * that would do the stuff that is repeated
 */
const fetchFromAPI = (relative_url, parameters) => {

    // get the API key from the HTML of the page
    // it is there, because it is easier to change
    // it in the HTML code than in the JavaScript
    const meta_tag = document.querySelector('meta[name="api-key"]');
    if (!meta_tag) {
        throw 'The script expects an element <meta name="api-key" content="YOUR_API_KEY"> to be present in the <head> of the document';
    }

    // fix the relative URL, adding / in the front
    // if it is missing
    if (relative_url.substr(0, 1) !== '/') {
        relative_url = `/${relative_url}`;
    }

    // get the api key from the meta tag
    const api_key = meta_tag.getAttribute('content');

    // formulate the entire URL
    const url = `https://test-api.codingbootcamp.cz/api/${api_key}${relative_url}`;

    return fetch(url, parameters);
}

/**
 * a simple utility function that takes in HTML code
 * and returns a corresponding DOM element
 *
 * it will not work correctly if given code for multiple
 * elements (without a single parent) and when being given
 * code for an element that cannot exist within a simple
 * <div> (for example <td>)
 */
const makeElementFromHTML = (html) => {
    const div = document.createElement('div');
    div.innerHTML = html.trim(); // notice the usage of .trim() which makes
                                 // it work correctly even if the HTML code
                                 // string begins with whitespace
    return div.firstChild;
}

export {
    modals_on_page,
    modalize,
    fetchFromAPI,
    makeElementFromHTML
}