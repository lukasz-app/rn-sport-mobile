import { StyleSheet } from 'react-native';
import { Colors, Metrics, Fonts } from '../../../../global/themes';

export default StyleSheet.create({
  container: {
    flex: 1,
    alignSelf: 'stretch',
    justifyContent: 'flex-start',
    alignItems: 'center',
    minHeight: 5,
    minWidth: 5,
    margin: 1,
  },
  bar: {
    // width: Metrics.normalize(20),
    alignSelf: 'stretch',
  },
  pointsText: {
    fontSize: Metrics.normalize(12),
    color: 'black',
    fontFamily: Fonts.type.SFCompactTextMedium,
  },
  pktText: {
    fontSize: Metrics.normalize(12),
    color: 'black',
    fontFamily: Fonts.type.SFCompactTextLight,
  },
});
