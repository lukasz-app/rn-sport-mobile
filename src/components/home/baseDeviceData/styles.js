import { StyleSheet } from 'react-native';
import { Colors, ApplicationStyles, Metrics } from '../../../global/themes';

export default StyleSheet.create({
  container: {
    backgroundColor: Colors.appColors.dark.k,
    marginTop: 8,
    marginHorizontal: 5,
    paddingVertical: 4,
    borderRadius: 8,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  rowContainer: {
    flexDirection: 'row',
    paddingVertical: 2,
    paddingHorizontal: 10,
    width: Metrics.screenWidth / 2 - 5,
  },
  emptyFlex: {
    flex: 1,
  },
  textLabel: {
    color: Colors.appColors.light.a,
    fontSize: 14,
    textAlign: 'left',
  },
  textValue: {
    color: Colors.appColors.light.a,
    fontSize: 14,
    textAlign: 'right',
  },
});
