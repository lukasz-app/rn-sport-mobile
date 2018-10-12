import React, { Component } from 'react';
import {
  View, Text,
} from 'react-native';
import { observer } from 'mobx-react';
import DeviceInfo from 'react-native-device-info';
import { observable } from 'mobx';
import styles from './styles';

@observer
export default class BaseSportData extends Component {
  @observable baseInfo = [];

  componentDidMount() {
    this.baseInfo = this.getBaseInfo();
  }

  getBaseInfo = () => {
    const {
      getAPILevel, // android only
      getBatteryLevel, // returns -1 on ios simulator
      getBrand,
      getBuildNumber,
      getFirstInstallTime,
      getManufacturer,
      getModel,
      getReadableVersion,
      getSystemVersion,
      getTimezone,
      getVersion,
    } = DeviceInfo;
    const baseInfo = [];
    baseInfo.push({ label: 'Imie: ', value: getBrand() });
    baseInfo.push({ label: 'Nazwisko: ', value: getManufacturer() });
    baseInfo.push({ label: 'Data ur: ', value: getModel() });
    baseInfo.push({ label: 'Waga: ', value: getSystemVersion() });
    baseInfo.push({ label: 'Wzrost: ', value: getAPILevel() });
    // baseInfo.push({ label: 'BatteryLevel: ', value: getBatteryLevel() });
    return baseInfo;
  }


  render() {
    return (
      <View style={styles.container}>
        {this.baseInfo.map(({ label, value }) => (
          <View key={label} style={styles.rowContainer}>
            <Text style={styles.textLabel}>
              {label}
            </Text>
            <Text style={styles.textValue}>
              {value}
            </Text>
          </View>
        ))}
      </View>
    );
  }
}
