import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  View, Text,
} from 'react-native';
import { observer, inject } from 'mobx-react';
import DeviceInfo from 'react-native-device-info';
import { observable } from 'mobx';
import moment from 'moment';
import styles from './styles';

@inject('sportStore')
@observer
export default class BaseSportData extends Component {
  static propTypes = {
    sportStore: PropTypes.shape(),
  }

  baseInfo = ['Imie: ', 'Nazwisko: ', 'Data ur: ', 'Waga: ', 'Wzrost: ', 'Sex'];

  render() {
    const {
      sportStore: {
        name,
        surname,
        dateOfBirth,
        currentWeight,
        currentHeight,
        sex,
      },
    } = this.props;
    const values = [
      name, surname, moment(dateOfBirth).format('D M Y'), currentWeight, currentHeight, sex,
    ];
    return (
      <View style={styles.container}>
        {this.baseInfo.map((label, index) => (
          <View key={label} style={styles.rowContainer}>
            <Text style={styles.textLabel}>
              {label}
            </Text>
            <View style={styles.emptyFlex} />

            <Text style={styles.textValue}>
              {values[index]}
            </Text>
          </View>
        ))}
      </View>
    );
  }
}
