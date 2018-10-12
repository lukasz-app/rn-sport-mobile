import React, { Component } from 'react';
import { YellowBox, View, StatusBar } from 'react-native';
import { observer, inject } from 'mobx-react';
import PropTypes from 'prop-types';
import Router from './navigation/Router';
import RootStore from './stores/RootStore';
import withStoreProvider from './enhancers/withStoreProvider';
import withDevMenuTrigger from './enhancers/withDevMenuTrigger';

@withDevMenuTrigger
@withStoreProvider(RootStore)
@inject('navigationStore', 'appStore')
@observer
export default class App extends Component {
  static propTypes = {
    navigationStore: PropTypes.shape(),
    appStore: PropTypes.shape(),
  }


  componentDidMount() {
    const {
      appStore: { initApp },
    } = this.props;
    initApp();
  }


  render() {
    const {
      navigationStore: {
        setNavigator, onNavigationStateChange,
      },
    } = this.props;
    return (
      <View style={{
        flex: 1,
      }}
      >
        <StatusBar />
        <Router
          ref={setNavigator}
          onNavigationStateChange={onNavigationStateChange}
        />
      </View>
    );
  }
}
