import Presenter from './presenter/presenter';

const tripHeaderContainer = document.querySelector('.trip-main');
const tripMainContainer = document.querySelector('.trip-events');

const mainPresenter = new Presenter({
  headerContainer: tripHeaderContainer,
  mainContainer: tripMainContainer
});

mainPresenter.init();

