import { FORMAT_DATE } from '../../const';
import { createElement } from '../../render';
import { formatStringToShortDate, callcDate } from '../../utils';

function isFavoriteClass(isFavorite) {
  return isFavorite ? 'event__favorite-btn--active' : '';
}

function createOffersList ({offers}) {
  return offers.map((item) => (
    `
    <li class="event__offer">
      <span class="event__offer-title">${item.title}</span>
        &plus;&euro;&nbsp;
      <span class="event__offer-price">${item.price}</span>
    </li>
    `
  )).join('');
}

function createEventItemTemplate (data) {
  const {point, destination, offers} = data;

  const dateFrom = (formatDate) => formatStringToShortDate(point.dateFrom,formatDate);
  const dateTo = (formatDate) => formatStringToShortDate(point.dateTo, formatDate);

  return (
    `<li class="trip-events__item">
      <div class="event">
        <time class="event__date" datetime="${dateFrom(FORMAT_DATE.DATE_ONLY)}">${dateFrom(FORMAT_DATE.DATE)}</time>
        <div class="event__type">
          <img class="event__type-icon" width="42" height="42" src="img/icons/${point.type}.png" alt="Event type icon">
        </div>
        <h3 class="event__title">${point.type} ${destination.name}</h3>
        <div class="event__schedule">
          <p class="event__time">
            <time class="event__start-time" datetime="${dateFrom(FORMAT_DATE.FULL_DATE_TIME)}">${dateFrom(FORMAT_DATE.TIME)}</time>
              &mdash;
            <time class="event__end-time" datetime="${dateTo(FORMAT_DATE.FULL_DATE_TIME)}">${dateTo(FORMAT_DATE.TIME)}</time>
          </p>
          <p class="event__duration">${callcDate(point.dateFrom, point.dateTo)}</p>
        </div>
        <p class="event__price">
          &euro;&nbsp;<span class="event__price-value"> ${point.basePrice}</span>
        </p>
        <h4 class="visually-hidden">Offers:</h4>
        <ul class="event__selected-offers">
          ${createOffersList(offers)}
        </ul>
        <button class="event__favorite-btn  ${isFavoriteClass(point.isFavorite)}" type="button">
          <span class="visually-hidden">Add to favorite</span>
          <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">
            <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z"/>
          </svg>
        </button>
        <button class="event__rollup-btn" type="button">
          <span class="visually-hidden">Open event</span>
        </button>
      </div>
    </li>`
  );
}

export default class EventItemView {
  constructor (data) {
    this.data = data;
  }

  getTemplate () {
    return createEventItemTemplate(this.data);
  }

  getElement () {
    if(!this.element) {
      this.element = createElement(this.getTemplate());
    }

    return this.element;
  }

  removeElement () {
    this.element = null;
  }
}
