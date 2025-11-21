export default class OfferModel {
  constructor (service) {
    this.service = service;
    this.offers = this.service.getOffers();
  }

  get () {
    return this.offers;
  }

  getByType (offersType) {
    return this.offers.find((offer) => offer.type === offersType);
  }
}
