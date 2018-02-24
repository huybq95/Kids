import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { TabNavigator } from 'react-navigation';

import Fab from '../../components/fab';

export default class Lesson extends React.PureComponent {
  static navigationOptions = {
    headerTitle: 'Bài học',
    headerStyle: {
      backgroundColor: 'tomato',
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontSize: 24,
      fontWeight: 'bold',
    },
  }
  render() {
    return (
      <View style={styles.container}>
        <Fab/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: 'center', alignItems: 'center' }
})