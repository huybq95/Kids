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
import Toast, { DURATION } from 'react-native-easy-toast';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as topicActions from './topic.actions';

import { TabNavigator } from 'react-navigation';
import * as db from '../../db/db';
import Fab from '../../components/fab';
import TopicItem from './topic.item';

const TOPIC_TYPE = 'topic';

export default class Topic extends React.PureComponent {
  static navigationOptions = {
    // title: 'Topic',
    headerTitle: 'Chủ đề',
    headerStyle: {
      backgroundColor: 'tomato',
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontSize: 24,
      fontWeight: 'bold',
    },
  }

  constructor(props) {
    super(props)
    this.state = {
      // textColor: this.props.settings.textColor || 'black',
      // isUpperCase: this.props.settings.isUpperCase || false,
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

  // componentDidMount() {
  //   this.setState({
  //     textColor: this.props.settings.textColor,
  //     isUpperCase: this.props.settings.isUpperCase
  //   });
  // }

  // componentWillReceiveProps(nextProps) {
  //   if (nextProps && nextProps.settings) {
  //     this.setState({
  //       textColor: nextProps.settings.textColor,
  //       isUpperCase: nextProps.settings.isUpperCase,
  //     });
  //   }
  // }

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
    db.createTopic(topic, this.showToast.bind(this));
    this.closeModal();
    this.loadData();
  }

  openModal() {
    this.setState({ visibleModal: true })
  }

  closeModal() {
    this.setState({ visibleModal: false })
  }

  showToast() {
    this.refs.toast.show('Cant add topic !')
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
                    <Text style={{ fontSize: 24, fontWeight: 'bold' }}>Thêm chủ đề</Text>
                  </CardItem>
                  <View style={{ flex: 2.5, padding: 16 }}>
                    <Text style={{ marginRight: 10, fontSize: 20, marginBottom: 20 }}>Tên chủ đề: </Text>
                    <TextInput
                      style={{ width: 300, fontSize: 20 }}
                      placeholder='Nhập tên chủ đề'
                      underlineColorAndroid='transparent'
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
        <Toast
          ref="toast"
          style={{ backgroundColor: 'tomato' }}
          position='bottom'
          positionValue={200}
          fadeInDuration={500}
          fadeOutDuration={500}
          opacity={0.8}
          textStyle={{ color: 'white' }}
        />
      </View>
    );
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