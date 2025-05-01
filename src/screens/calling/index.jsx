import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Avatar from '../../components/contacts/avatar';
import {sizes} from '../../utils/constants';
import {Colors} from '../../theme/color';
import {convertFulName} from '../../utils/functions';
import CircleIconButton from '../../components/ui/circleIconButton';
import {Call, CallSlash} from 'iconsax-react-native';

const Calling = ({route, navigation}) => {
  const {contact} = route.params;
  return (
    <View style={styles.container}>
      <View style={styles.infoContainer}>
        <Avatar
          name={contact?.name}
          surname={contact?.surname}
          size={sizes.LARGE}
        />
        <Text style={styles.fullName}>
          {convertFulName(contact?.name, contact?.surname)}
        </Text>
      </View>
      <View style={styles.buttons}>
        <CircleIconButton
          onPress={() => navigation.goBack()}
          icon={<CallSlash size={32} color={Colors.WHITE} />}
          color={Colors.RED}
        />
        <CircleIconButton
          onPress={() => navigation.goBack()}
          icon={<Call size={32} color={Colors.WHITE} />}
          color={Colors.GREEN}
        />
      </View>
    </View>
  );
};

export default Calling;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.BLACK,
  },
  infoContainer: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  fullName: {
    fontSize: 24,
    fontWeight: '700',
    marginTop: 20,
    color: Colors.WHITE,
  },
  buttons: {
    flex: 1,
    justifyContent: 'space-evenly',
    flexDirection: 'row',
    alignItems: 'center',
  },
});
