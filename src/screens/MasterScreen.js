// src/screens/MasterScreen.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import ToggleButton from '../components/ToggleButton';

const MasterScreen = ({ toggleScreen }) => {
  return (
    <View style={styles.screen}>
      <Text>Master Screen</Text>
      <ToggleButton isMaster={true} toggleScreen={toggleScreen} />
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default MasterScreen;
