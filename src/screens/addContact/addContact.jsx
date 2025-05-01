import {ScrollView, StyleSheet, View} from 'react-native';
import React, {useEffect} from 'react';
import {Formik} from 'formik';
import {Input, Button} from '@ui-kitten/components';
import {defaultScreenStyle} from '../../styles/defaultScreenStyle';
import {newContactSchema} from '../../utils/schemas';
import SQLite from 'react-native-sqlite-storage';
import {setContacts, setPending} from '../../store/slice/contactSlice';
import {useDispatch} from 'react-redux';

const db = SQLite.openDatabase({
  name: 'ContactsDatabase',
});

const AddContact = () => {
  const dispatch = useDispatch();

  const getContacts = () => {
    dispatch(setPending(false));
    db.transaction(txn => {
      txn.executeSql(
        'SELECT * FROM users',
        [],
        (sqlTxn, res) => {
          console.log('gelen veri', res.rows.length);
          if (res.rows.length > 0) {
            let users = [];
            for (let i = 0; i < res.rows.length; i++) {
              let item = res.rows.item(i);
              users.push(item);
            }
            dispatch(setContacts(users));
          }
        },
        error => console.log('hata', error.message),
        dispatch(setPending(false)),
      );
    });
  };

  const addNewContact = values => {
    db.transaction(txn => {
      txn.executeSql(
        'INSERT INTO users (name,surname,phone,email,adress,job) VALUES (?,?,?,?,?,?)',
        [
          values.name,
          values.surname,
          values.phone,
          values.email,
          values.adress,
          values.job,
        ],
        (sqlTxn, res) => console.log('Kişi Eklendi'),
        error => console.log('Hata', error.message),
      );
    });
  };

  useEffect(() => {
    return () => {
      getContacts();
    };
  }, []);

  return (
    <View style={defaultScreenStyle.container}>
      <ScrollView>
        <Formik
          initialValues={{
            name: 'FERHAT',
            surname: 'YILMAZ',
            email: 'lazziya@gmail.com',
            phone: '05446543245',
            adress: 'İSTANBUL',
            job: 'RAPER',
          }}
          validationSchema={newContactSchema}
          onSubmit={values => addNewContact(values)}>
          {({handleChange, handleBlur, handleSubmit, values, errors}) => (
            <View>
              <Input
                style={styles.input}
                size="medium"
                placeholder="Name"
                label="Name"
                onChangeText={handleChange('name')}
                onBlur={handleBlur('name')}
                value={values.name}
                caption={errors.name}
                status={errors.name ? 'danger' : 'basic'}
              />
              <Input
                style={styles.input}
                size="medium"
                placeholder="surname"
                label="surname"
                onChangeText={handleChange('surname')}
                onBlur={handleBlur('surname')}
                value={values.surname}
                caption={errors.surname}
                status={errors.surname ? 'danger' : 'basic'}
              />
              <Input
                style={styles.input}
                size="medium"
                placeholder="email"
                label="email"
                onChangeText={handleChange('email')}
                onBlur={handleBlur('email')}
                value={values.email}
                caption={errors.email}
                status={errors.email ? 'danger' : 'basic'}
              />
              <Input
                style={styles.input}
                size="medium"
                placeholder="phone"
                label="phone"
                onChangeText={handleChange('phone')}
                onBlur={handleBlur('phone')}
                value={values.phone}
                caption={errors.phone}
                status={errors.phone ? 'danger' : 'basic'}
              />
              <Input
                style={styles.input}
                size="medium"
                placeholder="adress"
                label="adress"
                onChangeText={handleChange('adress')}
                onBlur={handleBlur('adress')}
                value={values.adress}
                caption={errors.adress}
                status={errors.adress ? 'danger' : 'basic'}
              />
              <Input
                style={styles.input}
                size="medium"
                placeholder="job"
                label="job"
                onChangeText={handleChange('job')}
                onBlur={handleBlur('job')}
                value={values.job}
                caption={errors.job}
                status={errors.job ? 'danger' : 'basic'}
              />
              <Button
                onPress={handleSubmit}
                style={styles.button}
                title="Submit">
                SAVE
              </Button>
            </View>
          )}
        </Formik>
      </ScrollView>
    </View>
  );
};

export default AddContact;

const styles = StyleSheet.create({
  input: {
    marginVertical: 10,
  },
  button: {
    marginVertical: 30,
  },
});
