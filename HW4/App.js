import React from 'react';
import LoginScreen from './components/LoginScreen.js'; 
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MainPage from './components/mainpage.js';
import signup from './components/signup.js';
import addSongPage from './components/addSong.js';
import DeletePage from './components/deletepage.js';
import { UserProvider } from './UserContext.js'; 

const Stack = createNativeStackNavigator();

function App() {
  return (
    <UserProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Login">
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Main" component={MainPage} />
          <Stack.Screen name="addSong" component={addSongPage} />
          <Stack.Screen name="signup" component={signup} />
          <Stack.Screen name="deletepage" component={DeletePage} />
        </Stack.Navigator>
      </NavigationContainer>
    </UserProvider>
  );
}

export default App;