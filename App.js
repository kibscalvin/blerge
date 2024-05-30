import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { TabView, SceneMap } from 'react-native-tab-view';
import Icon from 'react-native-vector-icons/Ionicons';
import MasterScreen from './src/screens/MasterScreen';
import SlaveScreen from './src/screens/SlaveScreen';

const App = () => {
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: 'master', title: 'Master' },
    { key: 'slave', title: 'Slave' },
  ]);

  const renderScene = SceneMap({
    master: MasterScreen,
    slave: SlaveScreen,
  });

  const toggleScreen = () => {
    setIndex(prevIndex => (prevIndex === 0 ? 1 : 0));
  };

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Blerge</Text>
      </View>
      <View style={styles.container}>
        <TabView
          navigationState={{ index, routes }}
          renderScene={renderScene}
          onIndexChange={setIndex}
          swipeEnabled={false}
          tabBarPosition='bottom'
          renderTabBar={() => null}
          style={styles.tabView}
        />
        <TouchableOpacity
          style={styles.toggleButton}
          onPress={toggleScreen}
        >
          <Icon name={index === 0 ? 'link' : 'camera'} size={30} color="#FFF" />
          <Text style={styles.toggleButtonText}>{index === 0 ? 'M' : 'C'}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    height: 60,
    backgroundColor: '#3498db',
    alignItems: 'center',
    justifyContent: 'flex-start',
    flexDirection: 'row',
    paddingLeft: 20,
  },
  headerText: {
    color: '#FFF',
    fontSize: 20,
  },
  container: {
    flex: 1,
  },
  tabView: {
    flex: 1,
  },
  toggleButton: {
    position: 'absolute',
    top: 30, // Adjust based on the desired position
    left: Dimensions.get('window').width / 2 - 25, // Center horizontally
    width: 50,
    height: 50,
    backgroundColor: '#2980b9',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 25,
    elevation: 3,
    flexDirection: 'row',
  },
  toggleButtonText: {
    color: '#FFF',
    fontSize: 18,
    //marginLeft: 5,
  },
});

export default App;
