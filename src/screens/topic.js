import React from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Dimensions,
  KeyboardAvoidingView
} from 'react-native';
import { Card, CardItem } from 'native-base';
import { FloatingAction } from 'react-native-floating-action';
import Modal from 'react-native-modal';

import { TabNavigator } from 'react-navigation';
import * as db from '../db/db';
import { TextInput } from 'react-native-gesture-handler';

const topicObj = {
  title: 'Topic title',
  words: [{ text: 'text', isCompleted: false, isLearning: false }]
}

export default class Topic extends React.PureComponent {
  static navigationOptions = {
    title: 'Topic',
    headerStyle: {
      backgroundColor: 'tomato',
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'bold',
    },
  }

  constructor(props) {
    super(props)
    this.state = {
      listTopic: [],
      visibleModal: false
    }
  }

  componentWillMount() {
    let listTopic = db.getListTopic(this.getListTopicCallback.bind(this));
  }

  getListTopicCallback(listTopic) {
    this.setState({ listTopic: listTopic })
  }

  openModal() {
    this.setState({ visibleModal: true })
  }

  closeModal() {
    this.setState({ visibleModal: false })
  }

  render() {
    let { listTopic, visibleModal } = this.state;
    return (
      <View style={styles.container}>
        <FlatList data={listTopic}
          renderItem={({ item }) => <TopicItem key={item._id} data={item} />}
        ></FlatList>
        <Modal style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
          onBackButtonPress={() => this.closeModal()}
          onBackdropPress={() => this.closeModal()}
          visible={visibleModal}>
          <KeyboardAvoidingView behavior='padding'>
            <View style={styles.modal}>
              <Card>
                <CardItem style={{ backgroundColor: 'tomato' }} header>
                  <Text style={{ fontSize: 24, fontWeight: 'bold' }}>Thêm chủ đề</Text>
                </CardItem>
                <CardItem>
                  <View>
                    <Text style={{ marginRight: 10, fontSize: 20, marginBottom: 10 }}>Tên chủ đề: </Text>
                    <TextInput
                      style={{ width: 300, fontSize: 20 }}
                      placeholder='Nhập tên chủ đề'
                    ></TextInput>
                  </View>
                </CardItem>
              </Card>
            </View>
          </KeyboardAvoidingView>
        </Modal>
        <FloatingAction
          // actions={actions}
          buttonColor='tomato'
          // color='tomato'
          showBackground={false}
          onPressMain={() => this.openModal()}
        />
      </View>
    );
  }
}

class TopicItem extends React.PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      data: this.props.data
    }
  }

  render() {
    let { data } = this.state;
    return (
      <View style={styles.topicItem}>
        <Card>
          <CardItem header>
            <Text style={{ fontSize: 24 }}>{data.title}</Text>
          </CardItem>
          <FlatList
            horizontal={true}
            data={data.words}
            renderItem={({ item }) =>
              <View style={styles.wordItem}>
                <Card style={{ justifyContent: 'center', alignItems: 'center' }}>
                  <Text style={{ fontSize: 24 }}>{item.text}</Text>
                </Card>
              </View>}
          ></FlatList>
        </Card>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  topicItem: {
  },
  wordItem: {
    height: 150,
    width: 150,
    padding: 10
  },
  modal: {
    height: 300,
    width: Dimensions.get('window').width - 32,
    // backgroundColor: 'tomato',
    borderRadius: 20
  }
})