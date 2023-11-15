import React from 'react';
import { View, Text, StyleSheet, Button, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const DeletePage = ({ route }) => {
  const { itemId } = route.params;
  const navigation = useNavigation();

  const confirmDeletion = () => {
    Alert.alert(
      "Confirm Deletion",
      "Are you sure you want to delete this rating?",
      [
        {
          text: "Cancel",
          style: "cancel"
        },
        { text: "Yes", onPress: () => deleteRating() }
      ]
    );
  };

  const deleteRating = async () => {
    try {
      const response = await fetch(`http://10.0.2.2/index.php/song/delete?ratingid=${itemId}`);
      const data = await response.json();
      if (data.success) {
        navigation.navigate('Main');
      } else {
        alert("Error deleting rating.");
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Are you sure you want to delete this rating?</Text>
      <Button title="Delete Rating" onPress={confirmDeletion} />
      <Button title="Nevermind" onPress={() => navigation.goBack()} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 18,
    marginBottom: 10,
  },
});

export default DeletePage;