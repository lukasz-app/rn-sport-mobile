import React, { Component } from 'react';
import {
  View, Text,
} from 'react-native';
import { observer } from 'mobx-react';
import PropTypes from 'prop-types';
import DeviceInfo from 'react-native-device-info';
import { observable } from 'mobx';
import moment from 'moment';
import styles from './styles';

@observer
export default class BaseDeviceData extends Component {
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
    baseInfo.push({ label: 'Brand', value: getBrand() });
    baseInfo.push({ label: 'Manufacturer', value: getManufacturer() });
    baseInfo.push({ label: 'Model', value: getModel() });
    baseInfo.push({ label: 'SystemVersion', value: getSystemVersion() });
    baseInfo.push({ label: 'APILevel', value: getAPILevel() });
    baseInfo.push({ label: 'FirstInstall', value: getFirstInstallTime() });
    baseInfo.push({ label: 'Version', value: `${getVersion()} (${getReadableVersion()})` });
    baseInfo.push({ label: 'BuildNumber', value: getBuildNumber() });
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
            <View style={styles.emptyFlex} />
            <Text style={styles.textValue}>
              {value}
            </Text>
          </View>
        ))}
      </View>
    );
  }
}
