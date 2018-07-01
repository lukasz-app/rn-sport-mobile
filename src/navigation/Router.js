import { createSwitchNavigator, createStackNavigator } from 'react-navigation';
import { Home, Splash,Auth } from './../containers';

export default createSwitchNavigator({
  Splash,
  Auth,
  Home,
});