import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const LoginScreen = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation();

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

      const textResponse = await response.text();
      const isSuccess = textResponse.includes('true');

      if (isSuccess) {
        // Extract the message manually using a regular expression or string functions
        Alert.alert('Login Successful');
        navigation.navigate('Main');
      } else {
        Alert.alert('Login Failed');
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