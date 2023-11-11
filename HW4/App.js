import React from 'react';
import LoginScreen from './components/LoginScreen.js'; 
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MainPage from './components/mainpage.js';

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Main" component={MainPage} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;