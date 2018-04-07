import React from 'react'
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
  TextInput,
  Modal
} from 'react-native'
import { Card, CardItem, Body } from 'native-base'
import Toast, { DURATION } from 'react-native-easy-toast'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as topicActions from './topic.actions'
import ActionButton from 'react-native-action-button'
import { TabNavigator } from 'react-navigation'
import * as db from '../../db/db'
import TopicItem from './topic.item'
import Constants from '../../constants/Constants'

const TOPIC_TYPE = 'topic'

class Topic extends React.PureComponent {
  static navigationOptions = {
    title: 'Chủ đề',
    headerTitle: 'CHỦ ĐỀ',
    headerStyle: {
      backgroundColor: 'red'
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontSize: 24,
      fontWeight: 'bold'
    }
  }

  constructor(props) {
    super(props)
    this.state = {
      // textColor: this.props.settings.textColor || 'black',
      // isUpperCase: this.props.settings.isUpperCase || false,
      listTopic: [],
      newTopic: ''
    }
    this.loadData()
  }

  // componentWillMount() {

  // }

  // componentDidMount() {
  //   this.setState({
  //     textColor: this.props.settings.textColor,
  //     isUpperCase: this.props.settings.isUpperCase
  //   });
  // }

  // componentWillReceiveProps(nextProps, nextState) {
  //   this.setState({
  //     textColor: nextProps.settings.textColor,
  //     isUpperCase: nextProps.settings.isUpperCase,
  //   });
  // }

  loadData() {
    db.getAllTopic().then(data => {
      this.setState({ listTopic: data })
    })
    // db.getSetting().then(data => {
    //   this.setState({
    //     textColor: data.textColor,
    //     isUpperCase: data.isUpper
    //   });
    // })
  }

  openModal = () => {
    this.setState({ visibleModal: true })
  }

  closeModal() {
    this.setState({ visibleModal: false })
  }

  showToast() {
    this.refs.toast.show('Cant add topic !')
  }

  createTopic() {
    let title = this.state.newTopic ? this.state.newTopic : ''
    db
      .createTopic(title)
      .then(() => {
        this.loadData()
        this.closeModal()
      })
      .catch(err => {})
  }

  render() {
    let { listTopic, visibleModal } = this.state
    return (
      <View style={styles.container}>
        {listTopic.length > 0 ? (
          <FlatList
            data={listTopic}
            extraData={this.state}
            renderItem={({ item }) => (
              <TopicItem
                loadData={this.loadData.bind(this)}
                navigation={this.props.navigation}
                key={item._id}
                data={item}
              />
            )}
          />
        ) : null}
        <Modal
          visible={visibleModal}
          onRequestClose={() => {}}
          animationType="slide"
          transparent={true}
        >
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              flex: 1,
              backgroundColor: '#69696969'
            }}
          >
            <View
              style={{
                maxHeight: 3 * Constants.screen.height / 4,
                backgroundColor: 'white'
              }}
            >
              <KeyboardAvoidingView behavior="position">
                <View
                  style={{
                    width: Constants.screen.width * 3 / 4,
                    height: 300,
                    borderRadius: 5
                  }}
                >
                  <CardItem style={{ backgroundColor: 'red' }} header>
                    <Text
                      style={{
                        fontSize: 24,
                        fontWeight: 'bold',
                        color: 'white'
                      }}
                    >
                      Thêm chủ đề
                    </Text>
                  </CardItem>
                  <View style={{ flex: 2.5, padding: 16 }}>
                    <Text
                      style={{
                        marginRight: 10,
                        fontSize: 20,
                        marginBottom: 20
                      }}
                    >
                      Tên chủ đề:{' '}
                    </Text>
                    <TextInput
                      style={{ width: 300, fontSize: 20 }}
                      placeholder="Nhập tên chủ đề"
                      underlineColorAndroid="transparent"
                      onChangeText={text => this.setState({ newTopic: text })}
                    />
                    <View
                      style={{
                        borderBottomColor: 'black',
                        opacity: 0.2,
                        borderBottomWidth: 1,
                        padding: 5
                      }}
                    />
                  </View>
                  <View style={{ flexDirection: 'row', flex: 1 }}>
                    <TouchableOpacity
                      onPress={() => this.closeModal()}
                      style={{
                        flex: 1,
                        justifyContent: 'center',
                        alignItems: 'center',
                        backgroundColor: '#3e82ff'
                      }}
                    >
                      <Text style={{ fontSize: 20, color: 'white' }}>Hủy</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => this.createTopic()}
                      style={{
                        flex: 1,
                        justifyContent: 'center',
                        alignItems: 'center',
                        backgroundColor: '#3e82ff'
                      }}
                    >
                      <Text style={{ fontSize: 20, color: 'white' }}>Lưu</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </KeyboardAvoidingView>
            </View>
          </View>
        </Modal>
        {/* <Fab openModal={this.openModal.bind(this)} /> */}
        <ActionButton
          buttonColor="red"
          buttonText="+"
          onPress={this.openModal}
        />
        <Toast
          ref="toast"
          style={{ backgroundColor: 'red' }}
          position="bottom"
          positionValue={200}
          fadeInDuration={500}
          fadeOutDuration={500}
          opacity={0.8}
          textStyle={{ color: 'white' }}
        />
      </View>
    )
  }
}

// function mapStateToProps(state, ownProps) {
//   return {
//     settings: state.settings
//   };
// }

export default connect()(Topic)

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  topicItem: {},
  wordItem: {
    height: 150,
    width: 150,
    padding: 10
  },
  modal: {
    height: 300,
    // backgroundColor: 'red',
    borderRadius: 20
  }
})
