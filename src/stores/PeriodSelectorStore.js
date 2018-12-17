import { action, computed, observable } from 'mobx';
import moment from 'moment';


export default class PeriodSelectorStore {
  constructor(getStores) {
    this.getStores = getStores;
  }

@observable selectedYear = moment().year();

@observable selectedMonth = moment().month();

@observable selectedWeek = moment().week();

@observable selectedDay = moment().day();

@observable selectionType = 'day';

@computed
get startOfSelectedPeriod() {
  const tmp = moment().year(this.selectedYear);

  if (this.selectedMonth) {
    tmp.month(this.selectedMonth);
  }
  if (this.selectedWeek) {
    tmp.week(this.selectedWeek);
  }
  if (this.selectedDay) {
    tmp.day(this.selectedDay);
  }
  return moment(tmp).startOf(this.selectionType);
}

@observable
monthsChips = []

@observable
weeksChips = [];

@observable
dayChips = [];

@action
selectPeriod = ({
  type, date,
}) => {
  this.selectionType = type;
  if (type === 'day') {
    this.selectedDay = moment(date).day();
  } else {
    this.selectedDay = null;
    if (type === 'week') {
      this.selectedWeek = moment(date).week();
    } else {
      this.selectedWeek = null;
      this.selectedMonth = moment(date).month();
      this.selectedYear = moment(date).year();
      this.loadWeeks();
    }
    this.loadDays();
  }
  const {
    sportStore: { getDataForPeriod },
  } = this.getStores();
  getDataForPeriod(this.startOfSelectedPeriod, this.selectionType);
}

@action
loadMoreMonths = () => {
  const newChips = [];
  const lastKnownDate = (this.monthsChips.length && moment(this.monthsChips[this.monthsChips.length - 1].date))
  || moment().add(1, 'month')
    .startOf('month');
  for (let i = 0; i < 12; i++) {
    const startOfThePeriod = moment(lastKnownDate).subtract(i + 1, 'month');
    const text = `${startOfThePeriod.format('MMMM YYYY')}`;
    newChips.push({
      date: moment(startOfThePeriod),
      text,
      type: 'month',
    });
  }
  this.monthsChips = this.monthsChips.concat(newChips);
}

@action
loadWeeks = () => {
  const newChips = [];
  const iterator = moment().year(this.selectedYear).month(this.selectedMonth).startOf('month');

  while (
    (moment(iterator).startOf('week').month() <= this.selectedMonth)
    && moment(iterator).startOf('week').year() <= this.selectedYear) {
    const now = moment(iterator);

    const startOfTheWeek = moment(now).startOf('week');
    const endOfTheWeek = moment(now).endOf('week');
    const text = `${
      startOfTheWeek.format('D')
    }${
      startOfTheWeek.month() < this.selectedMonth
        ? startOfTheWeek.format('.M')
        : ''
    }${
      !startOfTheWeek.isSame(endOfTheWeek, 'year')
        ? startOfTheWeek.format('.YY') : ''
    }${
      endOfTheWeek.format(' - D')
    }${
      endOfTheWeek.month() > this.selectedMonth
        ? endOfTheWeek.format('.M')
        : ''
    }`;
    newChips.push({
      date: moment(startOfTheWeek),
      text,
      type: 'week',
    });
    iterator.add(1, 'week');
  }
  this.weeksChips = newChips;
}

@action
loadDays = () => {
  const newChips = [];
  const iterator = moment().year(this.selectedYear).month(this.selectedMonth);
  if (this.selectedWeek) {
    iterator.week(this.selectedWeek).startOf('week');
  } else {
    iterator.startOf('month').startOf('week');
  }
  for (let index = 0; index < 7; index++) {
    iterator.add(1, 'day');
    newChips.push({
      date: moment(iterator),
      text: moment(iterator).format('dd'),
      type: 'day',
    });
  }

  this.dayChips = newChips;
}
}
