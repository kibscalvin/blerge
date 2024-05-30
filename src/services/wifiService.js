// src/services/wifiService.js
import WifiP2pManager from 'react-native-wifi-p2p';

const initialize = () => {
  WifiP2pManager.initialize();
};

const discoverPeers = () => {
  return WifiP2pManager.discoverPeers();
};

const getAvailablePeers = () => {
  return WifiP2pManager.getAvailablePeers();
};

export default {
  initialize,
  discoverPeers,
  getAvailablePeers,
};
