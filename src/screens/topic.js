import React from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import { TabNavigator } from 'react-navigation';
import * as db from '../db/db';

const topicObj = {
  title: 'Topic title',
  words: [{text: 'text', isCompleted: false, isLearning: false}]
}

export default class Topic extends React.PureComponent {
  static navigationOptions = {
    title: 'Topic',
    headerStyle: {
      backgroundColor: '#f4511e',
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'bold',
    },
  }
  render() {
    return (
      <View style={styles.container}>
          <TouchableOpacity onPress={() => db.setObj()}> 
            <Text>Create topic</Text>
          </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' }
})