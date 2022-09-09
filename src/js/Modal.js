import { makeElementFromHTML } from './functions';

export default class Modal {

    constructor(content_element) {

        // the element that should be displayed in the center of the modal
        this.content_element = content_element;

        // the outmost wrapper of the modal window
        // (will be created and initialized in the building phase)
        this.container = null;

        this.build();
    }

    /**
     * builds the modal markup around an element with the modal's content
     *
     *  <div class="my-modal" style="display: none">
     *    <div class="my-modal__backdrop">
     *        <div class="my-modal__content">
     *            <div class="my-modal__close-button">&times;</div>
     *
     *            // content goes here
     *
     *         </div>
     *     </div>
     *  </div>
     */
    build() {

        // create the container element
        this.container = makeElementFromHTML(
            `<div class="my-modal" style="display: none">
                <div class="my-modal__backdrop">
                    <div class="my-modal__content">
                        <div class="my-modal__close-button">&times;</div>
                    </div>
                </div>
            </div>`
        );

        // find the central part of the modal
        const content_element = this.container.querySelector('.my-modal__content');

        // insert the intended content element into the center
        // of the modal
        content_element.appendChild(this.content_element);

        // remove the element's "display: none" property
        // (which is the preferrable way to hide the element
        // before JavaScript is initialized)
        this.content_element.style.removeProperty('display');

        // activate all of the modals buttons
        this.activate();

        // put the modal into the page
        this.mountToPage();
    }

    /**
     * makes the elements of the modal do what they should
     */
    activate() {
        const close_button = this.container.querySelector('.my-modal__close-button');
        close_button.addEventListener('click', () => {
            this.close();
        })

        // stop clicking into the modal from propagating to the backdrop
        const content = this.container.querySelector('.my-modal__content');
        content.addEventListener('click', event => {
            event.stopPropagation();
        })

        const backdrop = this.container.querySelector('.my-modal__backdrop');
        backdrop.addEventListener('click', () => {
            this.close();
        })
    }

    // puts the modal into the document
    mountToPage() {
        document.body.appendChild(this.container);
    }

    open() {
        this.container.style.removeProperty('display');
    }

    close() {
        this.container.style.display = 'none';
    }



}