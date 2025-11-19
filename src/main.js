import AppPresenter from './presenter/app-presenter';
import Service from './service/service';
import PointModel from './model/point-model';
import OfferModel from './model/offer-model';
import DestinationModel from './model/destination-model';

const tripHeaderContainer = document.querySelector('.trip-main');
const tripMainContainer = document.querySelector('.trip-events');

const service = new Service();
const pointModel = new PointModel(service);
const offerModel = new OfferModel(service);
const destinationModel = new DestinationModel(service);

const appPresenter = new AppPresenter({
  headerContainer: tripHeaderContainer,
  mainContainer: tripMainContainer,
  pointModel: pointModel,
  offerModel: offerModel,
  destinationModel: destinationModel
});

appPresenter.init();

