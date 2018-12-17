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
import Bar from './bar';
import MultiBar from './multiBar/MultiBar';

@inject('sportStore')
@observer
export default class SportGraph extends Component {
  // componentDidMount() {
  //   const {
  //     sportStore: {
  //       getDataForPeriod,
  //     },
  //   } = this.props;
  //   // getDataForPeriod();
  // }

  render() {
    const {
      sportStore: {
        distanceForPeriod, stepsForPeriod, energyForPeriod, data,
      },
    } = this.props;
    // const max = data.reduce((prev, curr) => {
    //   const types = ['steps', 'distance', 'energy'];
    //   // types.forEach((type) => {
    //   //   if (prev[`${type}Max`] < curr[type]) {
    //   //     prev[`${type}Max`] = curr[type];
    //   //   }
    //   // });
    //   return prev;
    // }, {
    //   stepsMax: 0, distanceMax: 0, energyMax: 0,
    // });

    return (
      <View key="bars" style={styles.container}>
        {data.map((period, index) => (
          <MultiBar
            key={index}
            {...period}

            // {...max}
          />
        ))}
      </View>
    );
  }
}
