import FiltersView from '../view/filters-view';
import SortListView from '../view/sort-list-view';

import { render } from '../render';

export default class Presenter {
  filtersView = new FiltersView ();

  constructor ({headerContainer, mainContainer}) {
    this.headerContainer = headerContainer;
    this.mainContainer = mainContainer;
  }

  init () {
    render(new FiltersView(), this.headerContainer);
    render(new SortListView(), this.mainContainer);
  }
}
