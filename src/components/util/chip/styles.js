import { StyleSheet } from 'react-native';
import { Fonts, Metrics, Colors } from '../../../global/themes';

export default StyleSheet.create({
  container: {
    height: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },

  label: {
    fontSize: Metrics.normalize(13),
    fontFamily: Fonts.type.SFCompactTextSemibold,
  },
  labelActive: {
    color: Colors.appColors.light.a,
  },
  labelNotActive: {
    color: Colors.appColors.light.a,
  },
});
