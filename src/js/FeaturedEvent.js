import { makeElementFromHTML } from './functions';
import Event from './Event';

/**
 * a representation of the featured event
 *
 * it *inherits* everything from a basic Event, only modifying
 * what is different (and that is just the HTML that represents it)
 *
 * for all others bits of its behavior, just see Event.js
 */
export default class FeaturedEvent extends Event {

    // puts the event into the document
    createElement() {
        const element = makeElementFromHTML(
            `<div class="featured-event">
                <div class="featured-event__image-wrap">
                    <h2 class="featured-event__tag">Featured&nbsp;event</h2>
                    <img class="featured-event__image" src="${this.image_url}"
                        alt="Event picture">
                </div>
                <div class="featured-event__description">
                    <div class="featured-event__info-wrap">
                        <h2 class="featured-event__name">${this.name}</h2>
                        <div class="featured-event__description-text">${this.description}</div>
                    </div>
                    <button class="featured-event__button button register-button">Register</button>
                </div>
            </div>`
        );

        return element;
    }

}