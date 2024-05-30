// src/screens/SlaveScreen.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import ToggleButton from '../components/ToggleButton';

const SlaveScreen = ({ toggleScreen }) => {
  return (
    <View style={styles.screen}>
      <Text>Slave Screen</Text>
      <ToggleButton isMaster={true} toggleScreen={toggleScreen} />
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f39c12',
  },
});

export default SlaveScreen;
