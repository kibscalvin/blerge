import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Button, Alert } from 'react-native';
import wifiService from '../services/wifiService'; // Adjust the path as necessary

const SlaveScreen = () => {
  const [status, setStatus] = useState("Waiting to connect...");

  useEffect(() => {
    wifiService.onConnectionInfoAvailable((info) => {
      setStatus(`Connected to ${info.groupOwnerAddress}`);
    });
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Slave Screen</Text>
      <Text>{status}</Text>
      <Button title="Connect to Network" onPress={() => setStatus("Trying to connect...")} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  }
});

export default SlaveScreen;
