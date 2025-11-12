import FiltersView from '../view/filters-view';
import SortListView from '../view/sort-list-view';
import EventsListView from '../view/event/events-list-view';
import EventItemView from '../view/event/event-item-view';
import EventItemEdit from '../view/event/event-item-edit';

import { render } from '../render';

export default class AppPresenter {
  constructor({ headerContainer, mainContainer }) {
    this.headerContainer = headerContainer;
    this.mainContainer = mainContainer;
    this.eventListContainer = new EventsListView();
  }

  init() {
    render(new FiltersView(), this.headerContainer);
    render(new SortListView(), this.mainContainer);
    render(this.eventListContainer, this.mainContainer);
    render(new EventItemEdit(), this.eventListContainer.getElement());

    for (let i = 0; i < 3; i++) {
      render(new EventItemView(), this.eventListContainer.getElement());
    }
  }
}
