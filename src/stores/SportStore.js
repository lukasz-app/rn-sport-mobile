import { action, computed, observable } from 'mobx';
import moment from 'moment';
import Sport from 'react-native-sport';

export default class SportStore {
  constructor(getStores) {
    this.getStores = getStores;
  }

  @observable
  dateOfBirth = '';

  @observable
  age = '';

  @observable
  currentHeight = -1;

  @observable
  currentWeight = -1;

  @observable
  sex = -1;

  @observable
  distanceForPeriod = [];

  @observable
  stepsForPeriod = [];

  @observable
  energyForPeriod = [];

  @observable
  combinedData = [];

  @action
  initSport = () => {
    Sport.hello()
      .then((status) => {
        console.log('Sport connection status :', status);
        this.getBaseData();
      })
      .catch((err) => {
        console.log('error initializing ', err);
      });
  };

  @action
  removeSportListeners = () => Sport.removeAllListeners();

  @action
  getBaseData = () => {
    Sport.getBaseData().then((baseDataArray) => {
      console.log('Sport Stpre : after sport init');
      console.table(baseDataArray);
      const [
        { value: heightValue, ...otherHeightData },
        { value: weightValue, ...otherWeightData },
        { value: birthValue, age },
        { value: sexValue },
      ] = baseDataArray;
      this.dateOfBirth = moment(birthValue);
      this.currentHeight = heightValue;
      this.currentWeight = weightValue;
      this.sex = sexValue;
      this.age = age;
    });
  };

  @computed
  get data() {
    const tab = [];
    for (let i = 0; i < this.distanceForPeriod.length; i++) {
      tab.push({
        distance: this.distanceForPeriod[i],
        steps: this.stepsForPeriod[i],
        energy: this.energyForPeriod[i],
      });
    }
    return tab;
  }

  @action
  getDataForPeriod = (startOfPeriod, type) => {
    const garnularity = 'day';
    const newDataForPeriod = [];
    const start = moment(startOfPeriod).startOf(type);
    const end = moment(startOfPeriod).endOf(type);

    Sport.getData({
      types: [Sport.dataTypes.distance, Sport.dataTypes.steps, Sport.dataTypes.energy],
      startOfPeriod: start,
      endOfPeriod: end,
      garnularity,
    })
      .then((result) => {
        const [distanceArray, stepsArray, energyArray] = result;
        this.distanceForPeriod = distanceArray;
        this.stepsForPeriod = stepsArray;
        this.energyForPeriod = energyArray;
        const combinedData = [];
        for (let i = 0; i < distanceArray.length; i++) {
          combinedData.push({
            distance: distanceArray[i],
            steps: stepsArray[i],
            energy: energyArray[i],
            date: distanceArray[i].date,
          });
        }

        this.combinedData = combinedData;
      })
      .catch((err) => {
        console.log('get data for period ERROR:  ', err);
      });
  };
}
