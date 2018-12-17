import React, { Component } from 'react';
import {
  ScrollView, View, Text,
} from 'react-native';
import { observer, inject } from 'mobx-react';
import styles from './styles';
import DeviceData from '../../../components/home/deviceData/DeviceData';
import BaseSportData from '../../../components/home/baseSportData/BaseSportData';
import PeriodSelector from '../../../components/home/periodSelector/PeriodSelector';
import { Colors } from '../../../global/themes/index';


@inject('navigationStore', 'appStore')
@observer
export default class Home extends Component {
  static propTypes = {
    // navigationStore: PropTypes.shape(NavigationStore),
  }

  static navigationOptions = {
    header: () => (
      <View
        style={{
          backgroundColor: Colors.appColors.dark.k,
          paddingTop: 25,
          paddingBottom: 10,
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Text
          style={{
            fontSize: 18,
            color: Colors.appColors.light.a,
          }}
        >
          {'Sport dev'}
        </Text>
      </View>
    ),
  };


  render() {
    return (
      <ScrollView style={styles.container}>
        <DeviceData />
        <BaseSportData />
        <PeriodSelector />
      </ScrollView>
    );
  }
}
