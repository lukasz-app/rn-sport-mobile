import { Dimensions, Platform, PixelRatio } from 'react-native';

const { width, height } = Dimensions.get('window');

const screen = {
  screenWidth: width < height ? width : height,
  screenHeight: width < height ? height : width,
};

const scale = screen.screenWidth / 375;

const normalize = size => PixelRatio.roundToNearestPixel(size * scale);

const metrics = {
  normalize,
  marginHorizontal: 10,
  marginVertical: 10,
  screenWidth: screen.screenWidth,
  screenHeight: screen.screenHeight,
};

export default metrics;
