import React from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import { TabNavigator } from 'react-navigation';

import * as db from '../db/db';

export default class Setting extends React.PureComponent {
  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={() => db.saveSetting()}>
          <Text>Save</Text>
        </TouchableOpacity>
        <Text>Setting!</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: 'center', alignItems: 'center' }
})