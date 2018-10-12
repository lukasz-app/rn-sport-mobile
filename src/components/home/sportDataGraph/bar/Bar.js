import React from 'react';
import PropTypes from 'prop-types';
import { View, Text } from 'react-native';
import { observer } from 'mobx-react';
import styles from './styles';
import { Metrics } from '../../../../global/themes/index';


const Bar = ({
  unit, value, item, color, itemCount, maxValue, maxHeight,
}) => {
  const iconSize = Metrics.screenWidth / (itemCount * 8);
  const textSize = itemCount === 1 ? Metrics.normalize(17) : Metrics.normalize(70 / itemCount);
  const greyBarHeight = Math.round((value * maxHeight) / maxValue);
  console.log('render BAR , item: ', maxValue, maxHeight, value, greyBarHeight);
  return (

    <View
      style={[
        styles.container,
        itemCount === 1 && { margin: 12 },
      ]}
    >
      {
              itemCount === 1 && [

                <Text
                  style={[styles.pointsText, { fontSize: textSize }]}
                  key="count"
                >
                  {value}
                </Text>,

                <Text
                  style={styles.pktText}
                  key="unit"
                >
                  {unit}
                </Text>,
              ]
    }


      {/* <View style={{
        backgroundColor: color, width: iconSize, height: iconSize, marginVertical: 10,
      }}
      /> */}
      <View
        key="inner"
        style={

          {
            height: maxHeight, alignSelf: 'stretch',
          }
        }
      >
        <View
          style={{
            flex: 1,
          }}
        />


        <View
          key="greybar"
          style={[
            styles.bar,
            {
              height: greyBarHeight,
              backgroundColor: color,
            },
          ]}
        />

      </View>

    </View>
  );
};
export default observer(Bar);

Bar.propTypes = {
  // progress: PropTypes.number,
  // dayName: PropTypes.string,
  // points: PropTypes.number,
  // record: PropTypes.number,
  // goal: PropTypes.number,
};

Bar.defaultProps = {
  // progress: 0,
  // dayName: '',
  // points: 0,
  // record: 0,
  // goal: 0,
};
