import React from 'react';
import { TouchableOpacity, View, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

const CustomButton = ({ name, onPress }) => {
  return (
    <TouchableOpacity style={styles.buttonContainer} onPress={onPress}>
      <View style={styles.buttonText}><MaterialIcons name={name} size={24} color="black" /></View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    backgroundColor: 'lightblue',
    padding: 10,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 5
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default CustomButton;
