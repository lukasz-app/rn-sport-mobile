import { action, computed, observable } from 'mobx';
import moment from 'moment';


export default class SportStore {
  constructor(getStores) {
    this.getStores = getStores;
  }

  @observable selectedYear = moment().year();

@observable selectedMonth = moment().month();

@observable selectedWeek = moment().week();

@observable selectedDay = moment().day();

@observable selectionType = 'day';


  @observable count = 1;

  @action
  selectPeriod = ({
    type, date, loadDays, loadWeeks,
  }) => {
    if (type === 'day') {
      this.selectionType = 'day';
      this.selectedDay = moment(date).day();
    } else if (type === 'week') {
      this.selectionType = 'week';
      this.selectedWeek = moment(date).week();
      this.selectedDay = null;
      if (loadDays) {
        loadDays();
      }
    } else if (type === 'month') {
      this.selectionType = 'month';
      this.selectedDay = null;
      this.selectedWeek = null;
      this.selectedMonth = moment(date).month();
      this.selectedYear = moment(date).year();
      if (loadWeeks) {
        loadWeeks();
      }
      if (loadDays) {
        loadDays();
      }
    }
  }

  @computed
  get dataForPeriod() {
    const newDataForPeriod = [];
    let itemCount = 0;
    if (this.selectionType === 'day') {
      itemCount = 1;
    } else if (this.selectionType === 'week') {
      itemCount = 7;
    } else {
      const proper = moment().month(this.selectedMonth).year(this.selectedYear);
      const startOfPeriod = moment(proper).startOf('month').startOf('week');
      const endOfPeriod = moment(proper).endOf('month').endOf('week');
      itemCount = endOfPeriod.diff(startOfPeriod, 'week') + 1;
      console.log('get d f  count', itemCount);
    }
    for (let i = 0; i < itemCount; i++) {
      newDataForPeriod.push({
        steps: Math.round(Math.random() * 14000 * itemCount),
        distance: Math.round(Math.random() * 10 * itemCount),
        energy: Math.round(Math.random() * 3000 * itemCount),
        key: i,
        itemCount,
        selectedDay: this.selectedDay,
        selectedMonth: this.selectedMonth,
        selectedWeek: this.selectedWeek,
        selectedYear: this.selectedYear,
        selectionType: this.selectionType,
      });
    }
    // console.table(this.dataForPeriod);
    console.log('get d f  ', newDataForPeriod);
    return newDataForPeriod;
  }

  @action
  subtract = ({ value = 1 }) => {
    if (this.count === 1) return;
    this.count = this.count - value;
  }
}
