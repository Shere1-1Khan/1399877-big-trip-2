import { render, RenderPosition } from '../framework/render';
import EventPresenter from './event-presenter';
import FiltersView from '../view/filters-view';
import SortListView from '../view/sort-list-view';
import EventsListView from '../view/event/events-list-view';
import { BLANK_POINT } from '../const';
import TripInfoView from '../view/header/trip-info-view';
import NewEventPresenter from './new-event-presenter';

export default class AppPresenter {
  #headerContainer = null;
  #filtersContainer = null;
  #mainContainer = null;
  #tripInfo = null;
  #eventListContainer = null;
  #pointModel = [];
  #offerModel = {};
  #destinationModel = {};
  #points = [];
  #addButton = null;
  #isCreatingPoint = false;
  #activeEventPresenter = null
  #newEventPresenter = null;

  constructor({ headerContainer,filtersContainer, mainContainer, pointModel, destinationModel, offerModel }) {
    this.#headerContainer = headerContainer;
    this.#filtersContainer = filtersContainer;
    this.#mainContainer = mainContainer;
    this.#tripInfo = new TripInfoView();
    this.#eventListContainer = new EventsListView();
    this.#pointModel = pointModel;
    this.#offerModel = offerModel;
    this.#destinationModel = destinationModel;

    this.#points = this.#pointModel.get();
  }

  #handleEventFormOpen = (eventPresenter) => {
    if (this.#isCreatingPoint) {
      return;
    }

    if (this.#activeEventPresenter && this.#activeEventPresenter !== eventPresenter) {
      this.#activeEventPresenter.resetForm();
    }
    this.#activeEventPresenter = eventPresenter;
  }

  #getFormData(point) {
    const pointDestination = point.destination ? this.#destinationModel.getById(point.destination) : null;
    const pointOffer = this.#offerModel.getByType(point.type) ?? null;
    return { point, pointDestination, pointOffer };
  }

  #renderEvent (event) {

    const eventPresenter = new EventPresenter({
      eventListContainer: this.#eventListContainer.element,
      onFormOpen: this.#handleEventFormOpen,
      isEditBlocked: () => this.#isCreatingPoint,
      onTypeChange: (point) => this.#getFormData(point)
    })

    eventPresenter.init(event);
  }

  #openNewEvent() {
    this.#isCreatingPoint = true;
    this.#addButton.disabled = true;
  }

  #closeNewEvent() {
    this.#isCreatingPoint = false;
    this.#addButton.disabled = false;
  }

  #handleNewEventDestroy = () => {
  this.#closeNewEvent();
  this.#newEventPresenter = null;
  };

  #makeEventDataByType = (prevEventData, nextType) => {
    const nextPoint = {
      ...prevEventData.point,
      type: nextType,
      offers: []
  };

  const nextPointOffer = this.#offerModel.getByType(nextType) ?? null;

  return {
    point: nextPoint,
    pointOffer: nextPointOffer,
    pointDestination: prevEventData.pointDestination
  };
};



  #createNewEvent () {
    this.#activeEventPresenter?.resetForm();
    this.#newEventPresenter?.destroy();
    this.#openNewEvent();

    this.#newEventPresenter = new NewEventPresenter({
      eventListContainer: this.#eventListContainer,
      onDestroy: this.#handleNewEventDestroy,
      onTypeChange: this.#makeEventDataByType
    });

    const newEvent = { ...BLANK_POINT };
    const eventData = this.#getFormData(newEvent);

    this.#newEventPresenter.init(eventData);
  }

  #handleCreateButtonClick = (evt) => {
    evt.preventDefault();
    this.#createNewEvent()
  };

  init() {
    this.#addButton = document.querySelector('.trip-main__event-add-btn');
    this.#addButton.addEventListener('click', this.#handleCreateButtonClick);
    render(this.#tripInfo, this.#headerContainer, RenderPosition.AFTERBEGIN);
    render(new FiltersView(), this.#filtersContainer);
    render(new SortListView(), this.#mainContainer);
    render(this.#eventListContainer, this.#mainContainer);

    this.#points.forEach((point) => {
      this.#renderEvent(this.#getFormData(point));
    });
  }
}
