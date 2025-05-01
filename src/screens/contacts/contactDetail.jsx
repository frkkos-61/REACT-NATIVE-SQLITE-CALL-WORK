import {ScrollView, StyleSheet, Text, View} from 'react-native';
import React, {useEffect} from 'react';
import {defaultScreenStyle} from '../../styles/defaultScreenStyle';
import Avatar from '../../components/contacts/avatar';
import {convertFulName} from '../../utils/functions';
import {height, sizes, width} from '../../utils/constants';
import {Colors} from '../../theme/color';
import CircleIconButton from '../../components/ui/circleIconButton';
import {Call, Message, Messages2} from 'iconsax-react-native';
import {CALLING} from '../../utils/routes';
import SQLite from 'react-native-sqlite-storage';
import {setContacts, setPending} from '../../store/slice/contactSlice';
import {useDispatch} from 'react-redux';

const db = SQLite.openDatabase({
  name: 'ContactsDatabase',
});

const ContactDetail = ({route, navigation}) => {
  const {contact} = route.params;
  const dispatch = useDispatch();
  const addNewCall = (date, resent_id, callType) => {
    db.transaction(txn => {
      txn.executeSql(
        'INSERT INTO calls (date,resent_id, callType ) VALUES (?,?,?)',
        [date, resent_id, callType],
        (sqlTxn, res) => console.log('ARAMA Eklendi'),
        error => console.log('ARAMA HATASI', error.message),
      );
    });
  };

  const handleCall = () => {
    const now = new Date();
    const date = now.toDateString();
    addNewCall(date, contact.id, 'outcoming');
    navigation.navigate(CALLING, {contact: contact});
  };

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

  useEffect(() => {
    return () => {
      getContacts();
    };
  }, []);

  return (
    <View style={defaultScreenStyle.container}>
      <ScrollView>
        <View style={styles.userContainer}>
          <Avatar
            name={contact?.name}
            surname={contact?.surname}
            size={sizes.LARGE}
          />

          <Text style={styles.fulName}>
            {convertFulName(contact?.name, contact?.surname)}{' '}
          </Text>

          <Text style={styles.job}>{contact?.job} </Text>
        </View>
        <View style={styles.buttonContainer}>
          <CircleIconButton
            onPress={() => handleCall()}
            icon={<Call size="32" color={Colors.WHITE} />}
            color={Colors.BLUE}
          />
          <CircleIconButton
            icon={<Messages2 size="32" color={Colors.WHITE} />}
            color={Colors.PURPLE}
          />
          <CircleIconButton
            icon={<Message size="32" color={Colors.WHITE} />}
            color={Colors.GREEN}
          />
        </View>
        <View>
          <View style={styles.infoContainer}>
            <Text style={styles.infoTitle}>Name</Text>
            <Text style={styles.info}>{contact?.name} </Text>
          </View>
          <View style={styles.infoContainer}>
            <Text style={styles.infoTitle}>Surname</Text>
            <Text style={styles.info}>{contact?.surname} </Text>
          </View>
          <View style={styles.infoContainer}>
            <Text style={styles.infoTitle}>Phone</Text>
            <Text style={styles.info}>{contact?.phone} </Text>
          </View>
          <View style={styles.infoContainer}>
            <Text style={styles.infoTitle}>Email</Text>
            <Text style={styles.info}>{contact?.email} </Text>
          </View>
          <View style={styles.infoContainer}>
            <Text style={styles.infoTitle}>Adress</Text>
            <Text style={styles.info}>{contact?.adress} </Text>
          </View>
          <View style={styles.infoContainer}>
            <Text style={styles.infoTitle}>Job</Text>
            <Text style={styles.info}>{contact?.job} </Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default ContactDetail;

const styles = StyleSheet.create({
  userContainer: {
    alignItems: 'center',
    height: height * 0.2,
    justifyContent: 'center',
  },
  buttonContainer: {
    alignItems: 'center',
    height: height * 0.1,
    justifyContent: 'space-evenly',
    flexDirection: 'row-reverse',
  },
  fulName: {
    fontSize: 18,
    fontWeight: '700',
  },
  job: {
    color: Colors.GRAY,
    fontSize: 16,
  },
  infoContainer: {
    backgroundColor: Colors.SOFTGRAY,
    borderRadius: 8,
    margin: 5,
    height: height * 0.08,
    justifyContent: 'center',
    padding: 10,
  },
  infoTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: Colors.GRAY,
  },
  info: {
    color: Colors.BLACK,
    fontSize: 16,
    marginTop: 5,
  },
});
