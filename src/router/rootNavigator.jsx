import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {
  ADDNEWCONTACT,
  CALLING,
  CONTACTDETAIL,
  TABNAVIGATOR,
} from '../utils/routes';
import TabNavigator from './tabNavigator';
import ContactDetail from '../screens/contacts/contactDetail';
import {Colors} from '../theme/color';
import Calling from '../screens/calling';
import AddContact from '../screens/addContact/addContact';
import {Pressable, View} from 'react-native';
import {Edit2, Trash} from 'iconsax-react-native';
import {useDispatch} from 'react-redux';
import {deleteContact} from '../store/actions/contactActions';

const Stack = createNativeStackNavigator();

export default function RootNavigator() {
  const dispatch = useDispatch();

  return (
    <Stack.Navigator
      screenOptions={{headerBackTitle: 'Geri', headerTintColor: Colors.BLACK}}>
      <Stack.Screen
        options={{headerShown: false}}
        name={TABNAVIGATOR}
        component={TabNavigator}
      />
      <Stack.Screen
        options={({navigation, route}) => ({
          headerRight: () => (
            <View style={{flexDirection: 'row'}}>
              <Pressable
                onPress={() => dispatch(deleteContact(route.params.contact.id))}
                style={{marginRight: 15}}>
                <Trash size={26} variant="Bold" color={Colors.RED} />
              </Pressable>
              <Pressable
                onPress={() => navigation.navigate(ADDNEWCONTACT)}
                style={{marginRight: 5}}>
                <Edit2 size={26} color="blue" variant="Bold" />
              </Pressable>
            </View>
          ),
        })}
        name={CONTACTDETAIL}
        component={ContactDetail}
      />
      <Stack.Screen
        options={{headerShown: false}}
        name={CALLING}
        component={Calling}
      />
      <Stack.Screen name={ADDNEWCONTACT} component={AddContact} />
    </Stack.Navigator>
  );
}
