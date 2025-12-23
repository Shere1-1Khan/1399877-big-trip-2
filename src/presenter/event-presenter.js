import { render, replace } from '../framework/render';
import EventItemView from '../view/event/event-item-view';
import EventFormView from '../view/event/event-form-view';

export default class EventPresenter {
  #eventData = null;
  #onTypeChange = null;

  #isFormOpen = false;
  #onFormOpen = null;
  #eventListContainer = null;

  #escKeyDownHandler = null;
  #eventComponent = null;
  #eventFormComponent = null;
  #isEditBlocked = null;

  constructor({ eventListContainer, onFormOpen, isEditBlocked, onTypeChange }) {
    this.#eventListContainer = eventListContainer;
    this.#onFormOpen = onFormOpen;
    this.#isEditBlocked = isEditBlocked;
    this.#onTypeChange = onTypeChange;
  }

  #replaceEvent(oldComponent, newComponent) {
    replace(newComponent, oldComponent);

    this.#isFormOpen = newComponent === this.#eventFormComponent;

    if (this.#isFormOpen) {
      document.addEventListener('keydown', this.#escKeyDownHandler);
    } else {
      document.removeEventListener('keydown', this.#escKeyDownHandler);
    }
  }

  #handleTypeChange(newType) {
    const nextPoint = {
      ...this.#eventData.point,
      type: newType,
      offers: []
    };

    const nextEventData = this.#onTypeChange(nextPoint);

    const prevForm = this.#eventFormComponent;

    this.#eventData = nextEventData;
    this.#eventFormComponent = this.#createEventForm();

    replace(this.#eventFormComponent, prevForm);
  }

  #createEventForm() {
    return new EventFormView({
      point: this.#eventData.point,
      pointDestination: this.#eventData.pointDestination,
      pointOffer: this.#eventData.pointOffer,

      onTypeChange: (newType) => this.#handleTypeChange(newType),

      onSubmit: (evt) => {
        evt.preventDefault();
        this.#replaceEvent(this.#eventFormComponent, this.#eventComponent);
      },
      onClose: () => {
        this.#replaceEvent(this.#eventFormComponent, this.#eventComponent);
      }
    });
  }

  init(eventData) {
    this.#eventData = eventData;

    this.#escKeyDownHandler = (evt) => {
      if (evt.key === 'Escape') {
        evt.preventDefault();
        this.#replaceEvent(this.#eventFormComponent, this.#eventComponent);
      }
    };

    this.#eventComponent = new EventItemView({
      point: eventData.point,
      pointDestination: eventData.pointDestination,
      pointOffer: eventData.pointOffer,
      onEditClick: () => {
        if (this.#isEditBlocked?.()) {
          return;
        }

        this.#onFormOpen?.(this);
        this.#replaceEvent(this.#eventComponent, this.#eventFormComponent);
      }
    });

    this.#eventFormComponent = this.#createEventForm();

    render(this.#eventComponent, this.#eventListContainer);
  }

  resetForm() {
    if (!this.#isFormOpen) {
      return;
    }

    replace(this.#eventComponent, this.#eventFormComponent);

    this.#isFormOpen = false;
    document.removeEventListener('keydown', this.#escKeyDownHandler);
  }
}
