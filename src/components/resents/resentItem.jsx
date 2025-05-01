import {Pressable, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import SQLite from 'react-native-sqlite-storage';
import {Colors} from '../../theme/color';
import Avatar from '../contacts/avatar';
import {sizes} from '../../utils/constants';
import {convertFulName} from '../../utils/functions';
import {Add, CallIncoming, CallOutgoing} from 'iconsax-react-native';

const db = SQLite.openDatabase({
  name: 'ContactsDatabase',
});

const ResentItem = ({item}) => {
  const [user, setUser] = useState({});
  const getUser = () => {
    db.transaction(txn => {
      txn.executeSql(
        `SELECT * FROM users WHERE id=${item.resent_id}`,
        [],
        (sqlTxn, res) => {
          if (res.rows.length > 0) {
            for (let i = 0; i < res.rows.length; i++) {
              let item = res.rows.item(i);
              if (user) setUser(item);
            }
          }
        },
        error => console.log('hata', error.message),
      );
    });
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <Pressable style={styles.container}>
      <View style={styles.avatarContainer}>
        {user && (
          <Avatar
            name={user?.name}
            surname={user?.surname}
            size={sizes.SMALL}
          />
        )}
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.name}>
          {user ? convertFulName(user?.name, user?.surname) : null}
        </Text>
        <Text style={styles.job}>{item?.date} </Text>
      </View>
      <View style={styles.callTypeContainer}>
        {item?.callType == 'incoming' ? (
          <CallIncoming size={30} color={Colors.RED} />
        ) : (
          <CallOutgoing size={30} color={Colors.GREEN} />
        )}
      </View>
    </Pressable>
  );
};

export default ResentItem;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
  },
  name: {
    fontSize: 18,
    fontWeight: '700',
    margin: 5,
    color: Colors.BLACK,
  },
  job: {
    fontSize: 14,
    color: Colors.GRAY,
    margin: 5,
  },
  infoContainer: {
    flex: 4,
  },
  callTypeContainer: {
    marginHorizontal: 10,
  },
  avatarContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
