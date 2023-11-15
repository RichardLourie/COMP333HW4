import React, { useState, useEffect, useContext } from 'react';
import { View, Text, FlatList, StyleSheet, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { UserContext } from '../UserContext';
import { useApi } from '../APIContext.js'; // Import the useApi hook

const MainPage = () => {
  const [ratings, setRatings] = useState([]);
  const [statsData, setStatsData] = useState(null); // Added state for stats data
  const navigation = useNavigation();
  const { username } = useContext(UserContext);
  const { ipAddress } = useApi();

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch ratings data
        const responseRatings = await fetch(`http://${ipAddress}/index.php/song/list`);
        const dataRatings = await responseRatings.json();
        setRatings(dataRatings);

        // Fetch stats data
        const responseStats = await fetch(`http://${ipAddress}/index.php/song/stats`);
        const dataStats = await responseStats.json();
        setStatsData(dataStats);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [ipAddress]); // Include ipAddress as a dependency for useEffect

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
      {username === item.username && (
        <Button
          title="Edit"
          onPress={() => navigation.navigate('editpage', { itemId: item.id, itemArtist: item.artist, itemSong: item.song, itemRating: item.rating })}
        />
      )}
      <Button
        title="View"
        onPress={() => navigation.navigate('viewpage', { itemId: item.id, itemArtist: item.artist, itemSong: item.song, itemRating: item.rating })}
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
      {statsData && (
        <View style={styles.statsContainer}>
          <Text style={styles.statsTitle}>Artist Statistics</Text>
          <View style={styles.stats}>
            <FlatList
              data={statsData.artists}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item }) => (
                <Text>
                  Artist: {item.artist}, Entry Count: {item.entry_count}, Average Rating: {item.average_rating}
                </Text>
              )}
            />
          </View>
          <Text style={styles.statsTitle}>Song Statistics</Text>
          <View style={styles.stats}>
            <FlatList
              data={statsData.songs}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item }) => (
                <Text>
                  Song: {item.song}, Entry Count: {item.entry_count}, Average Rating: {item.average_rating}
                </Text>
              )}
            />
          </View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
    marginBottom: 20,
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
  statsTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
    textAlign: 'center',
  },
  statsContainer: {
    alignItems: 'center',
  },
  stats: {
    width: '80%', // Adjust the width as needed
  },
});

export default MainPage;
