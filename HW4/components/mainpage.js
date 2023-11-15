import React, { useState, useEffect, useContext } from 'react';
import { View, Text, FlatList, StyleSheet, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { UserContext } from '../UserContext';
import { useApi } from '../APIContext.js'; // Import the useApi hook

const MainPage = () => {
  const [ratings, setRatings] = useState([]);
  const navigation = useNavigation();
  const { username } = useContext(UserContext);
  const { ipAddress } = useApi();

  useEffect(() => {
    const fetchRatings = async () => {
      try {
        const response = await fetch(`http://${ipAddress}/index.php/song/list`);
        const data = await response.json();
        setRatings(data);
      } catch (error) {
        console.error('Error fetching ratings:', error);
      }
    };

    fetchRatings();
  }, []);

  const renderItem = ({ item }) => (
  <View style={styles.item}>
    <Text style={styles.cell}>{item.username}</Text>
    <Text style={styles.cell}>{item.artist}</Text>
    <Text style={styles.cell}>{item.song}</Text>
    <Text style={styles.cell}>{item.rating}</Text>
    {username === item.username && (
      <Button
        title="Delete"
        onPress={() => navigation.navigate('deletepage', { itemId: item.id })}
      />  
      
    )}
    <Button
        title="View"
        onPress={() => navigation.navigate('ViewPage', { itemId: item.id, itemArtist: item.artist, itemSong: item.song, itemRating: item.rating})}
      />  
  </View>
);

  return (
    <View style={styles.container}>
      <Text style={styles.username}>Welcome, {username}!</Text>
      <Button
        title="Add Rating"
        onPress={() => navigation.navigate('addSong')}
      />
      <FlatList
        data={ratings}
        keyExtractor={item => item.id.toString()}
        renderItem={renderItem}
        ListHeaderComponent={
          <View style={styles.item}>
            <Text style={styles.cell}>Username</Text>
            <Text style={styles.cell}>Artist</Text>
            <Text style={styles.cell}>Song</Text>
            <Text style={styles.cell}>Rating</Text>
          </View>
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
  },
  item: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    padding: 10,
  },
  cell: {
    marginRight: 10,
    flex: 1,
  },
  username: {
  fontSize: 18,
  fontWeight: 'bold',
  padding: 10,
  textAlign: 'center',
},
});

export default MainPage;
