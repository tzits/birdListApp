import { StatusBar } from 'expo-status-bar';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

import Map from './screens/Map';
import SeenBirdsScreen from './screens/SeenBirdsScreen';
import FindBirdsScreen from './screens/FindBirdsScreen';
import DisplayBirds from './screens/DisplayBirds';
import BirdDetails from './screens/BirdDetails';
import WelcomeScreen from './screens/WelcomeScreen';
import SubmitBirdsScreen from './screens/SubmitBirdsScreen';
import { useEffect, useState} from 'react';
import { init } from './utils/database';
import { Ionicons } from '@expo/vector-icons'



export default function App() {
  const [dbInit, setdbInit] = useState(false)

  useEffect(() => {
    const loadApp = async () => {
      await init()
      setdbInit(true)
    }
  }, []);

  const Stack = createNativeStackNavigator()
  const BottomTab = createBottomTabNavigator()

  const homeButton = ({ navigation, route}) => ({
    headerRight: () => 
      <Ionicons 
        style={{paddingRight: 8}}
        name={'home'} 
        size={24} 
        color={'white'} 
        onPress={() => {navigation.navigate('Home')}}
        />
  })
  

  const BottomNav = () => {
    return (
    <BottomTab.Navigator 
      screenOptions={{
              headerStyle: { backgroundColor: 'darkgreen'},
              headerTintColor: 'white',
              contentStyle: { backgroundColor: 'darkgreen'}
            }}

    >
      <BottomTab.Screen 
        name="Home" 
        component={WelcomeScreen}
      />
      <BottomTab.Screen name="Submit Birds" component={SubmitBirdsScreen} options={homeButton} />
      <BottomTab.Screen 
        name="Find Birds" component={FindBirdsScreen} options={homeButton} />
      <BottomTab.Screen name="Bird List" component={SeenBirdsScreen} options={homeButton} />
    </BottomTab.Navigator>)
  }

  return (
    <>
      <StatusBar  style='light' />
      <NavigationContainer>
        <Stack.Navigator
            screenOptions={ {
              headerStyle: { backgroundColor: 'darkgreen'},
              headerTintColor: 'white',
              contentStyle: { backgroundColor: 'darkgreen'},
            }}
        >
          <Stack.Screen 
            name='Nav' 
            component={BottomNav} 
            options={{headerShown: false}} />
          <Stack.Screen 
            name="DisplayBirds" 
            component={DisplayBirds} 
            options={homeButton}
          />
          <Stack.Screen name="Pick Location" component={Map} />
          <Stack.Screen name="Bird Details" component={BirdDetails} options={{presentation: 'modal'}} />
        </Stack.Navigator>
      </NavigationContainer>
    </>


  );
}
