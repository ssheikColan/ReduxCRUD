import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import RegisterScreen from '../screens/RegisterScreen'
import LoginScreen from '../screens/LoginScreen'
import ProfileScreen from '../screens/ProfileScreen'
import { NavigationContainer } from '@react-navigation/native'
import { Provider } from 'react-redux'
import { Store } from '../redux/Store'
import FlashMessage from "react-native-flash-message";


const stack = createNativeStackNavigator();

const Routes = () => {
  return (
    <Provider store={Store}>
  <NavigationContainer>
    <stack.Navigator initialRouteName='RegisterScreen'
    screenOptions={{headerShown:false,}}>
        <stack.Screen name='RegisterScreen' component={RegisterScreen}/>
        <stack.Screen name='LoginScreen' component={LoginScreen}/>
        <stack.Screen name='ProfileScreen' component={ProfileScreen}/>
    </stack.Navigator>
  </NavigationContainer>
  <FlashMessage position="top" />
  </Provider>
  )
}

export default Routes