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
  componentDidMount() {
    const {
      sportStore: {
        getDataForPeriod,
      },
    } = this.props;
    console.log('CDM Sport Data Sport Graph');
    // getDataForPeriod();
  }

  render() {
    const {
      sportStore: {
        dataForPeriod,
      },
    } = this.props;
    const max = dataForPeriod.reduce((prev, curr) => {
      const types = ['steps', 'distance', 'energy'];
      types.forEach((type) => {
        if (prev[`${type}Max`] < curr[type]) {
          prev[`${type}Max`] = curr[type];
        }
      });
      return prev;
    }, {
      stepsMax: 0, distanceMax: 0, energyMax: 0,
    });

    console.log('RENDER Sport Data Sport Graph, props:', max);
    return (
      <View
        key="bars"
        style={styles.container}
      >
        {
          dataForPeriod.map((period, index) => (
            <MultiBar
              {...period}
              {...max}

            />
          ))
        }
      </View>
    );
  }
}
