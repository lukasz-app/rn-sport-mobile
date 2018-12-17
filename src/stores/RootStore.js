import AppStore from './AppStore';
import AuthStore from './AuthStore';
import NavigationStore from './NavigationStore';
import SportStore from './SportStore';
import PeriodSelectorStore from './PeriodSelectorStore';

class RootStore {
  constructor() {
    this.stores = {
      appStore: new AppStore(this.getStores),
      authStore: new AuthStore(this.getStores),
      navigationStore: new NavigationStore(this.getStores),
      sportStore: new SportStore(this.getStores),
      periodSelectorStore: new PeriodSelectorStore(this.getStores),
    };
  }

  getStores = () => this.stores;
}

export default RootStore;
