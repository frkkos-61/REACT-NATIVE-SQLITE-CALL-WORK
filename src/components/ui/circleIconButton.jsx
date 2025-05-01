import {StyleSheet, Text, View, Pressable} from 'react-native';
import React from 'react';
import {height, width} from '../../utils/constants';
import {Colors} from '../../theme/color';

const CircleIconButton = (props) => {
    const {color = Colors.SOFTGRAY,icon} = props;
  return (
    <Pressable {...props} style={[styles.container, {backgroundColor: color}]}>
      {icon}
    </Pressable>
  );
};

export default CircleIconButton;

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    height: width * 0.14,
    width: width * 0.14,
    borderRadius: width,
  },
});
