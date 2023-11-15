import React, { useState, useContext } from 'react';
import { StyleSheet, Text, View, TextInput, Button, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { UserContext } from '../UserContext.js';

const LoginScreen = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation();
  const { setUsername: setGlobalUsername } = useContext(UserContext);

  const navigateToSignup = () => {
    navigation.navigate('signup'); // Use the correct screen name as per your navigation setup
  };

  const handleLogin = async () => {
    try {
      
      const response = await fetch(`http://10.0.2.2/index.php/user/verify?username=${encodeURIComponent(username)}&password=${encodeURIComponent(password)}`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
      });
        
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const jsonResponse = await response.json();

      if (jsonResponse.success) {
        Alert.alert('Success', jsonResponse.message);
        setGlobalUsername(username);
        navigation.navigate('Main');
      } else {
        Alert.alert('Error', (jsonResponse.message) || 'Failed to login');
      }
    } catch (error) {
      console.error("Error:", error);
      Alert.alert("Error", error.toString());
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <TextInput
        style={styles.input}
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <Button title="Log In" onPress={handleLogin} />
      <Button title="No account? Sign Up!" onPress={navigateToSignup} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    marginBottom: 12,
    borderWidth: 1,
    borderColor: 'gray',
    padding: 10,
  },
});

export default LoginScreen;