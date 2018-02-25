import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, AsyncStorage } from 'react-native';

import StackNavigator from './src/router';
import * as db from './src/db/db';
import { Provider } from 'react-redux';
import configureStore from './src/store/configureStore';

const store = configureStore();

console.disableYellowBox = true;
AsyncStorage.clear();
db.initData();

export default class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Provider store={store}>
        <StackNavigator />
      </Provider>
    );
  }
}