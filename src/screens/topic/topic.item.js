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
  Alert
} from 'react-native'
import { Card, CardItem, Body } from 'native-base'
import Modal from 'react-native-modal'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { TabNavigator } from 'react-navigation'
import * as db from '../../db/db'
import Fab from '../../components/fab'
import Ionicons from '@expo/vector-icons/Ionicons'
// import Toast, { DURATION } from 'react-native-easy-toast';

const TOPIC_TYPE = 'topic'

export class TopicItem extends React.PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      textColor: this.props.setting.textColor || 'black',
      isUpperCase: this.props.setting.isUpperCase || false,
      data: this.props.data
    }
  }

  componentWillMount() {
    this.setState({
      textColor: this.props.setting.textColor,
      isUpperCase: this.props.setting.isUpper
    })
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      textColor: nextProps.setting.textColor,
      isUpperCase: nextProps.setting.isUpperCase,
      data: nextProps.data
    })
  }

  showTopicDetails(data) {
    this.props.navigation.navigate('TopicDetails', {
      title: data.title,
      reloadData: this.props.loadData
    })
  }

  removeTopic(title) {
    Alert.alert(
      'Bạn có muốn xóa chủ đề này ?',
      '',
      [
        {
          text: 'Có',
          onPress: () => {
            db
              .removeTopic(title)
              .then(() => {
                // this.showToast();
                this.props.loadData()
              })
              .catch(err => {})
          }
        },
        {
          text: 'Không',
          style: 'cancel'
        }
      ],
      { cancelable: false }
    )
  }

  render() {
    let { data } = this.state
    return (
      <View style={styles.topicItem}>
        <Card>
          <View style={{ flexDirection: 'row' }}>
            <TouchableOpacity
              style={{ flex: 5 }}
              onPress={() => this.showTopicDetails(data)}
            >
              <CardItem header>
                <Text style={{ fontSize: 24 }}>
                  {data.title ? data.title : ''}
                </Text>
              </CardItem>
            </TouchableOpacity>
            <TouchableOpacity
              style={{ flex: 1 }}
              onPress={() => this.removeTopic(data.title)}
            >
              <CardItem header>
                <Ionicons name="ios-trash" size={32} color="red" />
              </CardItem>
            </TouchableOpacity>
          </View>
          <FlatList
            keyExtractor={(item, index) => index.toString()}
            extraData={this.state}
            horizontal={true}
            data={data.words}
            renderItem={({ item }) => (
              <View style={styles.wordItem}>
                <Card
                  style={{ justifyContent: 'center', alignItems: 'center' }}
                >
                  <Text style={{ fontSize: 24, color: this.state.textColor }}>
                    {this.state.isUpperCase
                      ? item.text.toUpperCase()
                      : item.text}
                  </Text>
                </Card>
              </View>
            )}
          />
        </Card>
        {/* <Toast
                    ref="toast"
                    style={{ backgroundColor: 'red' }}
                    position='bottom'
                    positionValue={200}
                    fadeInDuration={500}
                    fadeOutDuration={500}
                    opacity={0.8}
                    textStyle={{ color: 'white' }}
                /> */}
      </View>
    )
  }
}

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
    width: Dimensions.get('window').width - 32,
    // backgroundColor: 'red',
    borderRadius: 20
  }
})

function mapStateToProps(state, ownProps) {
  return {
    setting: state.setting
  }
}

function mapDispatchToProps(dispatch) {
  return null
}

export default connect(mapStateToProps)(TopicItem)
