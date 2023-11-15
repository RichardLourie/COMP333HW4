import React, { useState, useContext } from 'react';
import { StyleSheet, Text, View, TextInput, Button, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { UserContext } from '../UserContext.js';

const SignupScreen = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigation = useNavigation();
  const { setUsername: setGlobalUsername } = useContext(UserContext);

  const handleSignup = async () => {
    try {
      const response = await fetch(`http://172.21.51.242/index.php/user/create?username=${encodeURIComponent(username)}&password=${encodeURIComponent(password)}&confirmpassword=${encodeURIComponent(confirmPassword)}`, {
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
        Alert.alert('Success', 'You have successfully signed up!');
        setGlobalUsername(username);
        navigation.navigate('Login'); // Assuming you have a login screen to navigate to after signup
      } else {
        Alert.alert('Error', jsonResponse.message || 'Failed to sign up');
      }
    } catch (error) {
      console.error("Error:", error);
      Alert.alert("Error", error.toString());
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign Up</Text>
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
      <TextInput
        style={styles.input}
        placeholder="Confirm Password"
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        secureTextEntry
      />
      <Button title="Sign Up" onPress={handleSignup} />
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

export default SignupScreen;