import React from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Dimensions,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  TextInput
} from 'react-native';
import { Card, CardItem, Body } from 'native-base';
import Modal from 'react-native-modal';

import { TabNavigator } from 'react-navigation';
import * as db from '../../db/db';
import Fab from '../../components/fab';

const TOPIC_TYPE = 'topic';

export default class Topic extends React.PureComponent {
  static navigationOptions = {
    // title: 'Topic',
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
      visibleModal: false,
      newTopic: {
        type: TOPIC_TYPE,
        title: null,
        words: null
      }
    }
  }

  componentWillMount() {
    this.loadData();
  }

  loadData() {
    db.getListTopic(this.getListTopicCallback.bind(this));
  }

  getListTopicCallback(listTopic) {
    let _listTopic = listTopic.sort((a, b) => {
      if (a.title > b.title) return 1;
      if (a.title < b.title) return -1;
      return 0;
    })
    this.setState({ listTopic: _listTopic })
  }

  createTopic() {
    let topic = {};
    let { title, type, words } = this.state.newTopic;
    topic.type = type;
    topic.title = title;
    topic.words = [];
    db.createTopic(topic);
    this.closeModal();
    this.loadData();
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
        <FlatList data={listTopic} extraData={this.state}
          renderItem={({ item }) => <TopicItem loadData={this.loadData.bind(this)} navigation={this.props.navigation} key={item._id} data={item} />}
        ></FlatList>
        <Modal style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
          onBackButtonPress={() => this.closeModal()}
          onBackdropPress={() => this.closeModal()}
          visible={visibleModal}>
          <KeyboardAvoidingView behavior='position'>
            <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
              <View style={styles.modal}>
                <Card>
                  <CardItem style={{ backgroundColor: 'tomato' }} header>
                    <Text style={{ fontSize: 24, fontWeight: 'bold', color: 'white' }}>Thêm chủ đề</Text>
                  </CardItem>
                  <View style={{ flex: 2.5, padding: 16 }}>
                    <Text style={{ marginRight: 10, fontSize: 20, marginBottom: 20 }}>Tên chủ đề: </Text>
                    <TextInput
                      style={{ width: 300, fontSize: 20 }}
                      placeholder='Nhập tên chủ đề'
                      onChangeText={(text) => this.setState({ newTopic: { ...this.state.newTopic, title: text } })}
                    ></TextInput>
                    <View style={{ borderBottomColor: 'black', opacity: 0.2, borderBottomWidth: 1, padding: 5 }}></View>
                  </View>
                  <View style={{ flexDirection: 'row', flex: 1 }}>
                    <TouchableOpacity onPress={() => this.createTopic()}
                      style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                      <Text>Đồng ý</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => this.closeModal()}
                      style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                      <Text>Hủy</Text>
                    </TouchableOpacity>
                  </View>
                </Card>
              </View>
            </TouchableWithoutFeedback>
          </KeyboardAvoidingView>
        </Modal>
        <Fab openModal={this.openModal.bind(this)} />
      </View>
    );
  }
}

class TopicItem extends React.PureComponent {
  constructor(props) {
    super(props)
    this.state = {
    }
  }

  showTopicDetails(data) {
    this.props.navigation.navigate('TopicDetails', { title: data.title, reloadData: this.props.loadData })
  }

  render() {
    let { data } = this.props;
    return (
      <View style={styles.topicItem}>
        <Card>
          <TouchableOpacity onPress={() => this.showTopicDetails(data)}>
            <CardItem header>
              <Text style={{ fontSize: 24 }}>{data.title}</Text>
            </CardItem>
          </TouchableOpacity>
          <FlatList
            extraData={this.state}
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