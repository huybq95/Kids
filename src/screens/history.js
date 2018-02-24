import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { TabNavigator } from 'react-navigation';

export default class History extends React.PureComponent {
  render() {
    return (
      <View style={styles.container}>
        <Text>History!</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: 'center', alignItems: 'center' }
})