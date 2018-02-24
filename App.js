import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Speech } from 'expo';
import TabNavigator from './src/router';

export default class App extends React.Component {
  
  render() {
    return (
      <TabNavigator/>
    );
  }
}