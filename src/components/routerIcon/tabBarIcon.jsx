import {StyleSheet} from 'react-native';
import React from 'react';
import {CONTACTS, FAVORITES, RESENTS} from '../../utils/routes';
import {Clock, Profile, Star1} from 'iconsax-react-native';

const TabBarIcon = ({name, focused, size, color}) => {
  switch (name) {
    case RESENTS:
      return <Clock size={size} color={color} variant="Bold" />;
    case FAVORITES:
      return <Star1 size={size} color={color} variant="Bold" />;
    case CONTACTS:
      return <Profile size={size} color={color} variant="Bold" />;
  }
};

export default TabBarIcon;

const styles = StyleSheet.create({});
