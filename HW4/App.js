import React from 'react';
import LoginScreen from './components/LoginScreen.js'; 
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MainPage from './components/mainpage.js';
import addSongPage from './components/addSong.js';
import UserProvider from './UserProvider';

const Stack = createNativeStackNavigator();

function App() {
  return (
    <UserProvider> {/* Wrap NavigationContainer with UserProvider */}
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Login">
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Main" component={MainPage} />
          <Stack.Screen name="AddSong" component={AddSongPage} />
        </Stack.Navigator>
      </NavigationContainer>
    </UserProvider>
  );
}

export default App;