
import React, { Component } from 'react';
import {
  View, Text, TouchableOpacity, FlatList,
} from 'react-native';
import { observer, inject } from 'mobx-react';
import PropTypes from 'prop-types';
import DeviceInfo from 'react-native-device-info';
import { observable, action } from 'mobx';
import moment from 'moment';
import styles from './styles';
import { Metrics, Colors } from '../../../global/themes';
import Chip from '../../util/chip';
import SportGraph from '../sportDataGraph/SportDataGraph';

@inject('sportStore')
@observer
export default class PeriodSelector extends Component {
@observable
monthsChips = []

@observable
weeksChips = [];

@observable
dayChips = [];

componentDidMount() {
  moment.locale('pl');
  this.loadMoreMonths();
  this.loadWeeks();
  this.loadDays();
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
  console.log('load weeks', this.props);
  const {
    sportStore: {
      selectedDay, selectedWeek, selectedMonth, selectedYear, selectionType,
    },
  } = this.props;
  const newChips = [];
  const iterator = moment().year(selectedYear).month(selectedMonth).startOf('month');

  while (
    (moment(iterator).startOf('week').month() <= selectedMonth)
    && moment(iterator).startOf('week').year() <= selectedYear) {
    const now = moment(iterator);

    const startOfTheWeek = moment(now).startOf('week');
    const endOfTheWeek = moment(now).endOf('week');
    const text = `${
      startOfTheWeek.format('D')
    }${
      startOfTheWeek.month() < selectedMonth
        ? startOfTheWeek.format('.M')
        : ''
    }${
      !startOfTheWeek.isSame(endOfTheWeek, 'year')
        ? startOfTheWeek.format('.YY') : ''
    }${
      endOfTheWeek.format(' - D')
    }${
      endOfTheWeek.month() > selectedMonth
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
  const {
    sportStore: {
      selectedDay, selectedWeek, selectedMonth, selectedYear, selectionType,
    },
  } = this.props;
  const newChips = [];
  const iterator = moment().year(selectedYear).month(selectedMonth);
  if (selectedWeek) {
    iterator.week(selectedWeek).startOf('week');
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

renderItem = ({ item: { text, date, type }, index }) => {
  const {
    sportStore: {
      selectedDay, selectedWeek, selectedMonth, selectedYear, selectPeriod, selectionType,
    },
  } = this.props;
  let otherProps = {};
  if (type === 'month') {
    if (
      moment(date).month() === selectedMonth && moment(date).year() === selectedYear
    ) {
      otherProps = {
        active: true,
        // activeColor: Colors.appColors.dark.a,
        style: { width: 160 },
      };
    } else {
      otherProps = {
        style: { paddingHorizontal: 5 },
      };
    }
  } else if (type === 'week') {
    if (moment(date).week() === selectedWeek || selectionType === 'month') {
      otherProps = {
        active: true,
        // activeColor: Colors.appColors.dark.c,
        style: selectionType === 'month' ? { flex: 2 } : {},
      };
    }
  } else if (type === 'day') {
    if (moment(date).day() === selectedDay || selectionType !== 'day') {
      otherProps = {
        active: true,
        // activeColor: Colors.appColors.dark.f,
      };
    }
  }

  return (
    <Chip
      key={`${moment(date).format('dd DD MM YY')}${type}`}
      id={index}
      text={text}
      onPress={() => selectPeriod({
        type, date, loadDays: this.loadDays, loadWeeks: this.loadWeeks,
      })}

      {
        ...otherProps
      }
    />
  );
}


render() {
  const {
    sportStore: {
      selectedDay, selectedWeek, selectedMonth, selectedYear, selectPeriod, selectionType,
    },
  } = this.props;
  return (
    <View style={styles.container}>
      <FlatList
        key="months"
        showsHorizontalScrollIndicator={false}
        inverted
        style={{
          borderTopLeftRadius: 8,
          borderTopRightRadius: 8,
          borderColor: Colors.appColors.dark.k,
          backgroundColor: Colors.appColors.dark.k,
          borderBottomWidth: 3,
        }}
        contentContainerStyle={{
          // backgroundColor: `${Colors.appColors.light.j}66`,
        }}
        data={this.monthsChips}
        horizontal
        renderItem={this.renderItem}
        onEndReached={this.loadMoreMonths}
        extraData={selectedMonth}
      />
      <View
        style={{}}
      >

        <View
          style={[styles.rowContainer,
            { borderColor: Colors.appColors.dark.k, borderBottomWidth: 3 },
          ]}
        >
          { this.weeksChips.map(({ date, text, type }, index) => (
            <View
              key={`${date.format('DD MM YY')}`}
              style={{
                flex:
                  selectionType !== 'month' && date.week() === selectedMonth
                    ? 2 : 1,
                // backgroundColor: `${Colors.appColors.light.j}66`,
              }}
            >
              { this.renderItem({ item: { date, text, type } }) }
            </View>
          ))
      }
        </View>
        <View
          style={[styles.rowContainer,
            selectionType === 'day' && { borderColor: Colors.appColors.dark.k, borderBottomWidth: 3 },

          ]}
        >
          {
          (selectionType === 'day' || selectionType === 'week')
          && this.dayChips.map(({ date, text, type }) => (
            <View
              key={`${date.format('dd')}`}
              style={{
                flex: 1,
              }}
            >
              { this.renderItem({ item: { date, text, type } }) }
            </View>
          ))
      }
        </View>
      </View>
      <SportGraph />
    </View>
  );
}
}
