import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Button, FlatList, Alert } from 'react-native';
import wifiService from '../services/wifiService'; // Adjust the path as necessary

const MasterScreen = () => {
  const [devices, setDevices] = useState([]);

  useEffect(() => {
    wifiService.initialize()
      .then(() => Alert.alert("WiFi Direct Initialized", "WiFi Direct has been successfully initialized."))
      .catch(err => Alert.alert("Initialization Failed", `Error initializing WiFi Direct: ${err.message}`));
  }, []);

  const discoverPeers = () => {
    wifiService.discoverPeers()
      .then(() => {
        Alert.alert("Discovery Started", "Searching for devices...");
        wifiService.getAvailablePeers()
          .then(peers => setDevices(peers))
          .catch(err => Alert.alert("Fetching Peers Failed", err.message));
      })
      .catch(err => Alert.alert("Discovery Failed", err.message));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Master Screen</Text>
      <Button title="Discover Devices" onPress={discoverPeers} />
      <FlatList
        data={devices}
        keyExtractor={item => item}
        renderItem={({ item }) => (
          <View style={styles.deviceItem}>
            <Text>{item}</Text>
          </View>
        )}
      />
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
  },
  deviceItem: {
    padding: 10,
    marginTop: 10,
    backgroundColor: '#f0f0f0',
    width: '100%',
  }
});

export default MasterScreen;
