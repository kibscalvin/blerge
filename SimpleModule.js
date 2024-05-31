import { NativeModules } from 'react-native';

const { SimpleModule } = NativeModules;

export default {
    getGreeting(name, callback) {
        SimpleModule.getGreeting(name, callback);
    }
};
