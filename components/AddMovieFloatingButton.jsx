import { StyleSheet, Text, View } from 'react-native';
import React from 'react';

const AddMovieFloatingButton = ({ onPress, style }) => {
  return (
    <View style={[styles.container, style]}>
      <Text style={styles.buttonText} onPress={onPress}>
        +
      </Text>
    </View>
  );
};

export default AddMovieFloatingButton;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f4511e',
    borderRadius: 50,
    elevation: 5,
    alignItems: 'center',
    justifyContent: 'center',
    width: 60,
    height: 60,
  },
  buttonText: {
    color: 'white',
    fontSize: 24,
  },
});
