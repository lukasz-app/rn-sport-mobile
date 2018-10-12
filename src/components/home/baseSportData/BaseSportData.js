import React, { Component } from 'react';
import {
  View, Text,
} from 'react-native';
import { observer, inject } from 'mobx-react';
import DeviceInfo from 'react-native-device-info';
import { observable } from 'mobx';
import styles from './styles';

@inject('sportStore')
@observer
export default class BaseSportData extends Component {
  @observable baseInfo = [];

  componentDidMount() {
    this.baseInfo = this.getBaseInfo();
  }

  getBaseInfo = () => [
    'Imie: ', 'Nazwisko: ', 'Data ur: ', 'Waga: ', 'Wzrost: ',
  ]


  render() {
    const {
      sportStore,
    } = this.props;
    const {
      name,
      surname,
      dateOfBirth,
      weight,
      height,
    } = sportStore;
    const values = [name, surname, dateOfBirth, weight, height];
    console.log(' WALUES :::::', sportStore);
    console.table(values);
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
