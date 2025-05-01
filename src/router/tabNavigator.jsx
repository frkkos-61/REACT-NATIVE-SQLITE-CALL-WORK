import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {ADDNEWCONTACT, CONTACTS, FAVORITES, RESENTS} from '../utils/routes';
import Resents from '../screens/resents';
import Contacts from '../screens/contacts';
import Favorites from '../screens/favorites';
import TabBarIcon from '../components/routerIcon/tabBarIcon';
import {Add} from 'iconsax-react-native';
import {Colors} from '../theme/color';
import {Pressable} from 'react-native';

const Tab = createBottomTabNavigator();

export default function TabNavigator() {
  return (
    <Tab.Navigator
    initialRouteName={CONTACTS}
      screenOptions={({route}) => ({
        tabBarIcon: ({focused, size, color}) => (
          <TabBarIcon name={route.name} color={color} size={size} />
        ),
        tabBarActiveTintColor: '#344CB7',
        tabBarInactiveTintColor: '#7E99A3',
      })}>
      <Tab.Screen name={RESENTS} component={Resents} />
      <Tab.Screen
        options={({navigation}) => ({
          headerRight: () => (
            <Pressable
              onPress={() => navigation.navigate(ADDNEWCONTACT)}
              style={{marginRight: 15}}>
              <Add size={36} color={Colors.GREEN} />
            </Pressable>
          ),
        })}
        name={CONTACTS}
        component={Contacts}
      />
      <Tab.Screen name={FAVORITES} component={Favorites} />
    </Tab.Navigator>
  );
}
