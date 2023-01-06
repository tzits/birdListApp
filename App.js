import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

import Map from './screens/Map';
import SeenBirdsScreen from './screens/SeenBirdsScreen';
import FindBirdsScreen from './screens/FindBirdsScreen';
import DisplayBirds from './screens/DisplayBirds';
import BirdDetails from './screens/BirdDetails';
import WelcomeScreen from './screens/WelcomeScreen';
import News from './screens/News';
import SubmitBirdsScreen from './screens/SubmitBirdsScreen';
import { useEffect, useState} from 'react';
import { init } from './utils/database';


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

  const BottomNav = () => {
    return (
    <BottomTab.Navigator 
      screenOptions={{
              headerStyle: { backgroundColor: 'darkgreen'},
              headerTintColor: 'white',
              contentStyle: { backgroundColor: 'darkgreen'}
            }}
    >
      <BottomTab.Screen name="Home" component={WelcomeScreen} />
      {/* <BottomTab.Screen name='News' component={News} /> */}
      <BottomTab.Screen name="Find Birds" component={FindBirdsScreen} />
      <BottomTab.Screen name="Submit Bird" component={SubmitBirdsScreen} />
      <BottomTab.Screen name="Bird List" component={SeenBirdsScreen} />
    </BottomTab.Navigator>)
  }


  return (
    <>
      <StatusBar  style='light' />
      <NavigationContainer>
        <Stack.Navigator
            screenOptions={{
              headerStyle: { backgroundColor: 'darkgreen'},
              headerTintColor: 'white',
              contentStyle: { backgroundColor: 'darkgreen'}
            }}
        >
          <Stack.Screen name='Nav' component={BottomNav} options={{headerShown: false}} />
          <Stack.Screen name="DisplayBirds" component={DisplayBirds} />
          <Stack.Screen name="Map" component={Map} />
          <Stack.Screen name="BirdDetails" component={BirdDetails} options={{presentation: 'modal'}} />
        </Stack.Navigator>
      </NavigationContainer>
    </>


  );
}
