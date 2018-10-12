import { StyleSheet } from 'react-native';
import { Colors, ApplicationStyles, Metrics } from '../../../global/themes';

export default StyleSheet.create({
  container: {
    backgroundColor: Colors.appColors.dark.k,
    marginTop: 8,
    marginHorizontal: 5,
    borderRadius: 8,
    borderColor: Colors.appColors.dark.k,
    borderWidth: 1,
    // padding: 4,
    borderBottomWidth: 0,
    overflow: 'hidden',
    // flex: 1,
  },
  rowContainer: {
    flexDirection: 'row',
    flex: 1,
  },
  labelColumnContainer: {
    flex: 1,
  },
  valueColumnContainer: {
    flex: 2,
  },
  text: {
    color: Colors.appColors.light.a,
    fontSize: 14,
    textAlign: 'left',
  },
});
