import { action, computed, observable } from 'mobx';

export default class AppStore {
  constructor(getStores) {
    this.getStores = getStores;
  }

  @action
  appDidMount = () => {
    const {
      sportStore: { initSport },
    } = this.getStores();
    initSport();
  };

  @action
  appWillUnmount = () => {
    const {
      sportStore: { removeSportListeners },
    } = this.getStores();
    removeSportListeners();
  };
}
