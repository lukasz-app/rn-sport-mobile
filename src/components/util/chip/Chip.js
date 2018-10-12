import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';
import { View, Text, TouchableOpacity } from 'react-native';
import styles from './styles';
import { Colors } from '../../../global/themes/index';

const Chip = ({
  text, active, onPress, style,
}) => (

  <TouchableOpacity
    style={[
      styles.container,
      style,
      active
        ? {
          // borderTopLeftRadius: 8,
          // borderTopRightRadius: 8,
          backgroundColor: Colors.appColors.dark.k,
          // borderColor: Colors.appColors.dark.k,
          // backgroundColor: Colors.baseColors.white,
        } : {
          backgroundColor: `${Colors.appColors.light.j}66`,

        },
    ]}
    onPress={onPress}
  >
    <Text style={[
      styles.label,
      active ? styles.labelActive : styles.labelNotActive,
    ]}
    >
      {text}
    </Text>
  </TouchableOpacity>
);
export default observer(Chip);

Chip.propTypes = {
  text: PropTypes.string,
  active: PropTypes.bool,
  onPress: PropTypes.func,
};
