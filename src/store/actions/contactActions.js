import {createAsyncThunk} from '@reduxjs/toolkit';
import SQLite from 'react-native-sqlite-storage';

const db = SQLite.openDatabase({
  name: 'ContactsDatabase',
});

const deleteContact = createAsyncThunk(
  'contact/deleContact',
  async contact_id => {
    try {
      db.transaction(txn => {
        txn.executeSql(
          `DELETE FROM users WHERE id=${contact_id}`,
          [],
          (sqlTxn, res) => {
            console.log('gelen veri', res.rows.length);
            if (res.rows.length > 0) {
              for (let i = 0; i < res.rows.length; i++) {
                let item = res.rows.item(i);
              }
            }
          },
          error => console.log('hata', error.message),
        );
      });
    } catch (error) {}
  },
);

export {deleteContact};
