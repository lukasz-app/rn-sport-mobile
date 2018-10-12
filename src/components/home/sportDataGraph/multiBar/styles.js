import { StyleSheet } from 'react-native';
import { Colors, Metrics, Fonts } from '../../../../global/themes';

export default StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'stretch',
    alignSelf: 'stretch',
  },
  barsContainer: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    alignSelf: 'stretch',
    marginHorizontal: 4,
    flexDirection: 'row',
  },
  infoContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'stretch',
    alignSelf: 'stretch',
    flexDirection: 'row',
  },
});
