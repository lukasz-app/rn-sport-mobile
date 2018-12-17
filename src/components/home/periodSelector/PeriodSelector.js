
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

@inject('periodSelectorStore', 'sportStore')
@observer
export default class PeriodSelector extends Component {
  componentDidMount() {
    moment.locale('pl');
    const {
      periodSelectorStore: {
        loadMoreMonths, loadWeeks, loadDays,
      },
      sportStore: { getDataForPeriod },
    } = this.props;
    loadMoreMonths();
    loadWeeks();
    loadDays();
  }


renderItem = ({ item: { text, date, type }, index }) => {
  const {
    periodSelectorStore: {
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
        type, date,
      })}

      {
        ...otherProps
      }
    />
  );
}


render() {
  const {
    periodSelectorStore: {
      selectedMonth, selectionType, loadMoreMonths, monthsChips, weeksChips, dayChips,
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
        data={monthsChips}
        horizontal
        renderItem={this.renderItem}
        onEndReached={loadMoreMonths}
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
          { weeksChips.map(({ date, text, type }, index) => (
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
          && dayChips.map(({ date, text, type }) => (
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
