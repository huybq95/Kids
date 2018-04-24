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
  Modal,
  Alert,
  ActivityIndicator
} from 'react-native'
import { Card, CardItem, Body } from 'native-base'
import Toast, { DURATION } from 'react-native-easy-toast'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import ActionButton from 'react-native-action-button'
import { TabNavigator } from 'react-navigation'
import * as db from '../../db/db'
import TopicItem from './topic.item'
import Constants from '../../constants/Constants'
import NewWordDialog from '../../components/NewWordDialog'

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
      textColor: 'black',
      isUpperCase: false,
      listTopic: [],
      newTopic: '',
      visibleModal: false,
      loading: false
    }
  }

  componentWillMount() {
    this.setState({ loading: true })
    this.loadData()
    if (this.props.setting)
      this.setState({
        textColor: this.props.setting.textColor,
        isUpperCase: this.props.setting.isUpper
      })
  }

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
      this.setState({ loading: false })
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

  closeModal = () => {
    this.setState({ visibleModal: false })
  }

  showToast() {
    this.refs.toast.show('Cant add topic !')
  }

  createTopic = async () => {
    let { newTopic } = this.state
    if (newTopic && newTopic !== '') {
      //check exist
      let data = await db.getTopicList()
      if (data && data.list) {
        if (data.list.includes(newTopic)) {
          Alert.alert('Lỗi', 'Chủ đề này đã tồn tại!')
          return
        } else {
          await db.createTopic(newTopic)
          this.loadData()
          this.closeModal()
        }
      }
    } else {
      Alert.alert('Lỗi', 'Vui lòng nhập tên chủ đề mới!')
    }
  }

  render() {
    let { listTopic, visibleModal } = this.state
    return (
      <View style={styles.container}>
        {this.state.loading ? (
          <ActivityIndicator />
        ) : (
          listTopic.length > 0 && (
            <FlatList
              keyExtractor={(item, index) => index.toString()}
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
          )
        )}
        <NewWordDialog
          visible={this.state.visibleModal}
          title="Thêm chủ đề"
          caption="Tên chủ đề:"
          rightText="Lưu"
          onPressRight={this.createTopic}
          onChangeText={text => this.setState({ newTopic: text })}
          onPressLeft={this.closeModal}
        />
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
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
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
