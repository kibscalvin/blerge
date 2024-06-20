import React, { useState, useEffect } from 'react';
import { View, Button, StyleSheet, Alert, TextInput, FlatList, Text, Linking } from 'react-native';
import {
  initialize,
  startDiscoveringPeers,
  stopDiscoveringPeers,
  subscribeOnConnectionInfoUpdates,
  subscribeOnThisDeviceChanged,
  subscribeOnPeersUpdates,
  connect,
  cancelConnect,
  sendMessage,
  receiveMessage,
} from 'react-native-wifi-p2p';
import { PermissionsAndroid, Platform } from 'react-native';

const App = () => {
  const [devices, setDevices] = useState([]);
  const [message, setMessage] = useState('');
  const [chatMessages, setChatMessages] = useState([]);

  useEffect(() => {
    async function requestPermissions() {
      try {
        const requiredPermissions = Platform.Version >= 33 ? 
          [PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION, PermissionsAndroid.PERMISSIONS.NEARBY_WIFI_DEVICES] :
          [PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION, PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION];

        const granted = await PermissionsAndroid.requestMultiple(requiredPermissions);
        const permissionsGranted = Object.values(granted).every(status => status === PermissionsAndroid.RESULTS.GRANTED);

        if (permissionsGranted) {
          console.log("Permissions granted");
          initP2P();
        } else {
          console.log("Permissions denied");
          Alert.alert('Permissions Denied', 'The app needs location permissions to function correctly.');
        }
      } catch (err) {
        console.warn(err);
      }
    }

    async function initP2P() {
      try {
        await initialize();
        subscribeOnPeersUpdates(({ devices }) => setDevices(devices));
        subscribeOnConnectionInfoUpdates(info => console.log('Connection Info Updated:', info));
        subscribeOnThisDeviceChanged(groupInfo => console.log('Device Changed:', groupInfo));
        await startDiscoveringPeers();
      } catch (e) {
        console.error('Initialization failed:', e);
      }
    }

    async function checkLocationEnabled() {
      const locationEnabled = await PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION);
      if (!locationEnabled) {
        Alert.alert(
          'Location Services Disabled',
          'Please enable location services to use this app.',
          [
            { text: 'Cancel', style: 'cancel' },
            { text: 'Enable', onPress: () => Linking.openSettings() }
          ],
          { cancelable: false }
        );
      } else {
        requestPermissions();
      }
    }

    checkLocationEnabled();
  }, []);

  const handleConnect = async (deviceAddress) => {
    try {
      await connect(deviceAddress);
      Alert.alert('Connection', 'Successfully connected');
    } catch (err) {
      console.error('Connection failed:', err);
      Alert.alert('Connection failed', 'Unable to connect to the device');
    }
  };

  const handleDisconnect = async () => {
    try {
      await cancelConnect();
      Alert.alert('Connection', 'Disconnected');
    } catch (err) {
      console.error('Disconnect failed:', err);
      Alert.alert('Disconnect failed', 'Unable to disconnect');
    }
  };

  const handleSendMessage = async () => {
    try {
      await sendMessage(message);
      setChatMessages([...chatMessages, { msg: message, sender: 'me' }]);
      setMessage('');
    } catch (error) {
      console.error('Sending message failed:', error);
    }
  };

  const handleReceiveMessage = async () => {
    try {
      const msg = await receiveMessage();
      setChatMessages([...chatMessages, { msg, sender: 'them' }]);
    } catch (error) {
      console.error('Receiving message failed:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Button title="Start Discovering Peers" onPress={() => startDiscoveringPeers()} />
      <Button title="Stop Discovering Peers" onPress={() => stopDiscoveringPeers()} />
      <FlatList
        data={devices}
        keyExtractor={(item) => item.deviceAddress}
        renderItem={({ item }) => (
          <View style={styles.deviceContainer}>
            <Text style={{ color: 'blue' }}>{item.deviceName}</Text>
            <Button title="Connect" onPress={() => handleConnect(item.deviceAddress)} />
          </View>
        )}
      />
      <Button title="Disconnect" onPress={handleDisconnect} />
      <TextInput
        style={styles.input}
        placeholder="Type your message here"
        value={message}
        onChangeText={setMessage}
      />
      <Button title="Send Message" onPress={handleSendMessage} />
      <Button title="Receive Message" onPress={handleReceiveMessage} />
      <FlatList
        data={chatMessages}
        keyExtractor={(_, index) => String(index)}
        renderItem={({ item }) => (
          <Text style={item.sender === 'me' ? styles.myMessage : styles.theirMessage}>
            {item.msg}
          </Text>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#F5FCFF',
  },
  deviceContainer: {
    marginVertical: 5,
  },
  input: {
    height: 40,
    width: '100%',
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  myMessage: {
    alignSelf: 'flex-end',
    margin: 10,
    backgroundColor: '#DCF8C6',
    padding: 10,
    borderRadius: 5,
  },
  theirMessage: {
    alignSelf: 'flex-start',
    margin: 10,
    backgroundColor: '#34B7F1',
    padding: 10,
    borderRadius: 5,
  },
});

export default App;
