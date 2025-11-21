import FiltersView from '../view/filters-view';
import SortListView from '../view/sort-list-view';
import EventsListView from '../view/event/events-list-view';
import EventItemView from '../view/event/event-item-view';
import EventItemEditView from '../view/event/event-item-edit-view';

import { render } from '../render';

export default class AppPresenter {
  constructor({ headerContainer, mainContainer, pointModel, destinationModel, offerModel }) {
    this.headerContainer = headerContainer;
    this.mainContainer = mainContainer;
    this.eventListContainer = new EventsListView();

    this.pointModel = pointModel;
    this.offerModel = offerModel;
    this.destinationModel = destinationModel;

    this.points = this.pointModel.get();
  }

  init() {
    render(new FiltersView(), this.headerContainer);
    render(new SortListView(), this.mainContainer);
    render(this.eventListContainer, this.mainContainer);

    render(new EventItemEditView({
      point: this.points[0],
      destination: this.destinationModel.getById(this.points[0].destination),
      offers: this.offerModel.getByType(this.points[0].type)
    }), this.eventListContainer.getElement());

    this.points.forEach((point) => {
      render(new EventItemView({
        point: point,
        destination: this.destinationModel.getById(point.destination),
        offers: this.offerModel.getByType(point.type)
      }), this.eventListContainer.getElement());
    });
  }
}
