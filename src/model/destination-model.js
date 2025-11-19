export default class DestinationModel {
  constructor (service) {
    this.service = service;
    this.destinations = service.getDestination();
  }

  get () {
    return this.destinations;
  }

  getById (destinationsId) {
    return this.destinations.find((item) => {
      if (item.id === destinationsId) {
        return item;
      }
    });
  }
}
