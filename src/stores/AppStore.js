import remotedev from 'mobx-remotedev/lib/dev';
import { action, computed, observable } from 'mobx';


export default class AppStore {
  constructor(getStores) {
    this.getStores = getStores;
  }

  // @remotedev({ name: 'Count' })
  @observable count = 1;

  @action
  initApp = () => {
    const {
      sportStore: {
        initSport,
      },
    } = this.getStores();
    initSport();
  }
}
