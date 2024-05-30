import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Button, FlatList } from 'react-native';
import ToggleButton from '../components/ToggleButton';
import wifiService from '../services/wifiService';

const MasterScreen = ({ toggleScreen }) => {
  const [devices, setDevices] = useState([]);

  useEffect(() => {
    // Initialize WiFi P2P
    wifiService.initialize();
    return () => {
      // Cleanup if needed
    };
  }, []);

  const searchDevices = () => {
    wifiService.discoverPeers()
      .then(() => {
        console.log('Discovery started');
      })
      .catch(err => console.error('Error discovering peers:', err));
  };

  const getAvailableDevices = () => {
    wifiService.getAvailablePeers()
      .then(peers => {
        console.log('Available peers:', peers);
        setDevices(peers);
      })
      .catch(err => console.error('Error getting available peers:', err));
  };

  return (
    <View style={styles.screen}>
      <Text>Master Screen</Text>
      <Button title="Search for Devices" onPress={searchDevices} />
      <Button title="Get Available Devices" onPress={getAvailableDevices} />
      <FlatList
        data={devices}
        keyExtractor={item => item.deviceAddress}
        renderItem={({ item }) => (
          <View style={styles.device}>
            <Text>{item.deviceName}</Text>
            <Text>{item.deviceAddress}</Text>
          </View>
        )}
      />
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
  device: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
});

export default MasterScreen;
