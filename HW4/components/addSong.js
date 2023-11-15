import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useApi } from '../APIContext.js'; // Import the useApi hook

const AddSongScreen = () => {
  const [username, setUsername] = useState('');
  const [artist, setArtist] = useState('');
  const [song, setSong] = useState('');
  const [rating, setRating] = useState('');
  const navigation = useNavigation();
  const { ipAddress } = useApi();

  const handleAddSong = async () => {
    try {
      // Construct the API endpoint with query parameters
      const query = `username=${encodeURIComponent(username)}&artist=${encodeURIComponent(artist)}&song=${encodeURIComponent(song)}&rating=${encodeURIComponent(rating)}`;
      const url = `http://${ipAddress}/index.php/song/create?${query}`;

      // Make the POST request to the API
      const response = await fetch(url, {
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
        navigation.navigate('Main');
      } else {
        Alert.alert('Error', jsonResponse.message);
      }
    } catch (error) {
      console.error("Error:", error);
      Alert.alert("Error", error.toString());
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Add a New Song</Text>
      <TextInput
        style={styles.input}
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        style={styles.input}
        placeholder="Artist"
        value={artist}
        onChangeText={setArtist}
      />
      <TextInput
        style={styles.input}
        placeholder="Song"
        value={song}
        onChangeText={setSong}
      />
      <TextInput
        style={styles.input}
        placeholder="Rating"
        value={rating}
        onChangeText={setRating}
        keyboardType="numeric"
      />
      <Button title="Add Song" onPress={handleAddSong} />
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

export default AddSongScreen;