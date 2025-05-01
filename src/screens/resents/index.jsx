import {FlatList, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {defaultScreenStyle} from '../../styles/defaultScreenStyle';
import SQLite from 'react-native-sqlite-storage';
import ResentItem from '../../components/resents/resentItem';

const db = SQLite.openDatabase({
  name: 'ContactsDatabase',
});

const Resents = () => {
  const [resents, setResents] = useState([]);
  const getResents = () => {
    db.transaction(txn => {
      txn.executeSql(
        'SELECT * FROM calls',
        [],
        (sqlTxn, res) => {
          if (res.rows.length > 0) {
            let resents = [];
            for (let i = 0; i < res.rows.length; i++) {
              let item = res.rows.item(i);
              resents.push(item);
            }
            setResents(resents);
          }
        },
        error => console.log('hata', error.message),
      );
    });
  };
  useEffect(() => {
    getResents();
  }, []);

  return (
    <View style={defaultScreenStyle.container}>
      <FlatList
        data={resents}
        renderItem={({item}) => <ResentItem item={item} />}
      />
    </View>
  );
};

export default Resents;

const styles = StyleSheet.create({});
