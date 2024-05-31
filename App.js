import React, { useEffect, useState } from 'react';
import { View, Text, Button, Alert } from 'react-native';
import DeviceInfoModule from './DeviceInfoModule';

export default function App() {
    const [deviceName, setDeviceName] = useState('');
    const [osVersion, setOSVersion] = useState('');

    useEffect(() => {
        DeviceInfoModule.getDeviceName((name) => {
            setDeviceName(name);
        });
        DeviceInfoModule.getOSVersion((version) => {
            setOSVersion(version);
        });
    }, []);

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>Device Name: {deviceName}</Text>
            <Text>OS Version: {osVersion}</Text>
            <Button title="Show Device Info" onPress={() => Alert.alert(`Device: ${deviceName}\nOS: ${osVersion}`)} />
        </View>
    );
}
