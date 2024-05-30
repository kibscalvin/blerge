import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const ToggleButton = ({ isMaster, toggleScreen }) => {
  return (
    <TouchableOpacity style={styles.button} onPress={toggleScreen}>
      {/* Swap icons based on the state */}
      <Icon name={isMaster ? 'link' : 'camera'} size={30} color="#FFF" />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    width: 50,           // Set the width of the button
    height: 50,          // Set the height of the button
    backgroundColor: '#2980b9', // Set the background color
    justifyContent: 'center',   // Center the icon vertically
    alignItems: 'center',       // Center the icon horizontally
    borderRadius: 25,    // Make it round
    elevation: 3,        // Apply shadow for Android
    shadowOpacity: 0.3,  // Below properties are for iOS shadow
    shadowRadius: 3,
    shadowColor: '#000',
    shadowOffset: { height: 2, width: 0 },
  },
});

export default ToggleButton;
