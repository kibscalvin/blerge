import { NativeModules } from 'react-native';

const { DeviceInfoModule } = NativeModules;

export default {
    getDeviceName(callback) {
        DeviceInfoModule.getDeviceName(callback);
    },
    getOSVersion(callback) {
        DeviceInfoModule.getOSVersion(callback);
    }
};
