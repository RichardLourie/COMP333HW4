// ViewPage.js
import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const ViewPage = ({ route }) => {
  const { itemId, itemArtist, itemSong, itemRating } = route.params;
  const navigation = useNavigation();

  const handleBack = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Song Information</Text>
      <Text>Artist: {itemArtist}</Text>
      <Text>Song: {itemSong}</Text>
      <Text>Rating: {itemRating}</Text>
      <Button title="Back" onPress={handleBack} />
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
});

export default ViewPage;
