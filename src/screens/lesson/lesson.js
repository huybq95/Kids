import React from 'react'
import {
  Text,
  View,
  StyleSheet,
  Dimensions,
  ActivityIndicator,
  Modal
} from 'react-native'
import { TabNavigator } from 'react-navigation'
import { Card, CardItem } from 'native-base'
import moment from 'moment'
import { Ionicons, Entypo } from '@expo/vector-icons'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Notifications } from 'expo'
import ActionButton from 'react-native-action-button'
import Fab from '../../components/fab'
import * as db from '../../db/db'
import { FlatList } from 'react-native-gesture-handler'
import * as settingActions from '../settings/setting.actions'

const WIDTH = (Dimensions.get('window').width - 56) / 3
const HEIGHT = (Dimensions.get('window').height - 300) / 5
const actions = [
  {
    text: 'Học',
    icon: require('../../img/play.png'),
    name: 'bt_learn',
    position: 1,
    color: 'red'
  }
  // , {
  //   text: 'Sửa',
  //   icon: require('../../img/edit.png'),
  //   name: 'bt_edit',
  //   position: 2,
  //   color: 'red'
  // }
]

// action chỉ để Học còn Sửa để góc trên bên phải ngang với title
class Lesson extends React.PureComponent {
  static navigationOptions = ({ navigation }) => {
    const params = navigation.state.params || {}
    return {
      title: 'Bài học',
      headerTitle: 'BÀI HỌC HÔM NAY',
      headerRight: (
        <Entypo
          name="edit"
          color="white"
          size={30}
          style={{ paddingHorizontal: 20 }}
          onPress={params.onPressEdit}
        />
      ),
      headerStyle: {
        backgroundColor: 'red'
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontSize: 24,
        fontWeight: 'bold'
      }
    }
  }

  constructor(props) {
    super(props)
    this.state = {
      data: [],
      textColor: this.props.settings ? this.props.settings.textColor : 'red',
      isUpperCase: this.props.settings.isUpperCase || false,
      wordCount: this.props.settings.wordCount || '5',
      loading: false,
      loadingDialog: false
    }
  }

  componentWillMount() {
    this.setState({ loading: true })
    db.getSetting().then(data => {
      this.setState(
        {
          textColor: data.textColor,
          isUpperCase: data.isUpper,
          wordCount: data.numsWord
        },
        () => {
          this.loadData()
        }
      )
    })
    this.props.navigation.setParams({ onPressEdit: this.onPressEdit })
  }

  onPressEdit = () => {
    this.props.navigation.navigate('LessonEdit', {
      data: this.state.data,
      counter: this.state.wordCount,
      loadData: this.loadData.bind(this)
    })
  }

  convertTime(time) {
    let _time = {}
    let string = time.split(':')
    _time.hour = string[0]
    _time.minute = string[1]
    return _time
  }

  componentDidMount() {
    this.props.settings.alerts.map((e, i) => {
      let _time = this.convertTime(e.time)
      let date = new Date()
      date.setHours(_time.hour)
      date.setMinutes(_time.minute)
      Notifications.scheduleLocalNotificationAsync(
        {
          title: e.title,
          body: e.body,
          sound: true,
          vibrate: 500,
          priority: 'hight'
        },
        {
          time: date
        }
      )
    })
  }

  async loadData() {
    let data = await db.getTodayLesson(parseInt(this.state.wordCount)) //.then(data => {
    this.setState({ data: data, loading: false })
    //})
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps && nextProps.settings) {
      this.setState(
        {
          textColor: nextProps.settings.textColor,
          isUpperCase: nextProps.settings.isUpperCase,
          wordCount: nextProps.settings.wordCount
        },
        () => {
          this.loadData()
        }
      )
    }
  }

  onPressItem = async name => {
    this.setState({ loadingDialog: true })
    await this.loadData()
    db.resetStateIsLearning(this.state.data)
    let data = null //this.state.data.slice()
    data.sort(() => Math.random() - 0.5)
    this.props.navigation.navigate('LessonDetails', { data })
    this.setState({ loadingDialog: false })
  }

  render() {
    let { data, wordCount } = this.state
    return (
      <View style={styles.container}>
        <Card style={{ flex: 1 }}>
          <CardItem header>
            <Text style={{ fontSize: 32, color: 'black' }}>{`${moment(
              new Date().getTime()
            ).format('DD/MM/YYYY')}`}</Text>
          </CardItem>
          <View style={{ borderBottomColor: 'red', borderBottomWidth: 1 }} />
          <CardItem
            style={{
              flex: 1,
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            {this.state.loading ? (
              <ActivityIndicator />
            ) : (
              <FlatList
                style={{ marginBottom: 56 }}
                extraData={this.state}
                data={data}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item, index }) => (
                  <Text
                    numberOfLines={2}
                    ellipsizeMode="tail"
                    style={{
                      color: this.state.textColor,
                      width: WIDTH,
                      height: HEIGHT,
                      textAlign: 'left',
                      fontSize: 24,
                      paddingVertical: 16
                    }}
                  >
                    {this.state.isUpperCase
                      ? `${item.text}`.toUpperCase()
                      : `${item.text}`}
                  </Text>
                )}
              />
            )}
          </CardItem>
          <ActionButton
            buttonColor="red"
            // buttonText="Học"
            renderIcon={() => (
              <Ionicons name="ios-play" color="white" size={30} />
            )}
            onPress={this.onPressItem}
          />
          <Modal
            visible={this.state.loadingDialog}
            transparent={true}
            onRequestClose={() => {}}
          >
            <View
              style={{
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <ActivityIndicator />
            </View>
          </Modal>
        </Card>
      </View>
    )
  }
}

function mapStateToProps(state, ownProps) {
  return {
    settings: state.settings
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(settingActions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Lesson)

const styles = StyleSheet.create({
  container: { flex: 1 }
})
