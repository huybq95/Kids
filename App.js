import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

import StackNavigator from './src/router';
import * as db from './src/db/db';
import { Provider } from 'react-redux';
import configureStore from './src/store/configureStore';

const store = configureStore();

console.disableYellowBox = true;

export default class App extends React.Component {
  constructor(props) {
    super(props);
    db.initData();
  }

  render() {
    return (
      <Provider store={store}>
        <StackNavigator />
      </Provider>
    );
  }
}