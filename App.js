import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

import TabNavigator from './src/router';
import * as db from './src/db/db';

console.disableYellowBox = true;

const objSetting = {
  id: 'setting',
  isUpper: false,
  textColor: 'red',
  numsWord: 5,
  numsNewWord: 1,
  notification: true
}

export default class App extends React.Component {
  constructor(props) {
    super(props);
    db.createSetting(objSetting);
  }

  render() {
    db.getSetting()
    return (
      <TabNavigator />
    );
  }
}