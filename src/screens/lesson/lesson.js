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
import * as SettingActions from '../../stores/setting/actions'
import * as AppStateActions from '../../stores/appState/actions'
import Constants from '../../constants/Constants'
import * as utils from '../../utils/index'

const WIDTH = (Dimensions.get('window').width - 56) / 3
const HEIGHT = (Dimensions.get('window').height - 300) / 5

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
          color={params.learnedToday ? '#999999' : 'white'}
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
      textColor: 'red',
      isUpperCase: false,
      wordCount: 5,
      newCount: 1,
      loading: false
    }
  }

  async componentWillMount() {
    // this.setState({ loading: true })
    this.setState({
      textColor: this.props.setting.textColor,
      isUpperCase: this.props.setting.isUpper,
      wordCount: this.props.setting.numsWord,
      newCount: this.props.setting.newCount
    })
    // this.loadData()
    this.props.navigation.setParams({ onPressEdit: this.onPressEdit })
  }

  async loadData() {
    console.log('get today lesson')
    let data = await db.getTodayLesson1(
      parseInt(this.state.wordCount || 5),
      parseInt(this.state.newCount || 1)
    )
    console.log('get today lesson done', data)
    this.setState({ data, loading: false })
  }

  onPressEdit = () => {
    if (!this.props.learnedToday) this.props.navigation.navigate('LessonEdit')
  }

  convertTime(time) {
    let _time = {}
    let string = time.split(':')
    _time.hour = string[0]
    _time.minute = string[1]
    return _time
  }

  componentDidMount() {
    this.props.setting.alerts.map((e, i) => {
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

  componentWillReceiveProps(nextProps) {
    // if (this.props.setting !== nextProps.setting && !this.state.loading) {
    //   this.setState(
    //     {
    //       textColor: nextProps.setting.textColor,
    //       isUpperCase: nextProps.setting.isUpperCase,
    //       wordCount: nextProps.setting.wordCount,
    //       newCount: nextProps.setting.newCount
    //     },
    //     () => {
    //       this.loadData()
    //     }
    //   )
    // }
    if (this.props.learnedToday !== nextProps.learnedToday) {
      this.props.navigation.setParams({ learnedToday: nextProps.learnedToday })
    }
  }

  onPressLearn = async name => {
    this.props.showHideLoading(true, 'Đang tạo bài học...')
    await this.loadData()
    // db.resetStateIsLearning(this.state.data)
    let data = this.state.data.slice()
    data.sort(() => Math.random() - 0.5)
    this.props.navigation.navigate('LessonDetails', { data })
    this.props.showHideLoading(false)
    // let data = await db.getAllWords()
    // console.log('get all words ', data)
  }

  render() {
    let { data, wordCount } = this.state
    return (
      <View style={styles.container}>
        <Card style={{ flex: 1 }}>
          <CardItem header>
            <Text style={{ fontSize: 32, color: 'black' }}>
              {utils.getCurrentDate()}
            </Text>
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
                      fontSize: 24
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
          {!this.state.loading && (
            <ActionButton
              buttonColor="red"
              renderIcon={() => (
                <Ionicons name="ios-play" color="white" size={30} />
              )}
              onPress={this.onPressLearn}
            />
          )}
        </Card>
      </View>
    )
  }
}

function mapStateToProps(state, ownProps) {
  return {
    setting: state.setting,
    learnedToday: state.appState.learnedToday
  }
}

function mapDispatchToProps(dispatch) {
  return {
    saveSetting: payload => dispatch(SettingActions.saveSetting(payload)),
    showHideLoading: (visible, message) =>
      dispatch(AppStateActions.showHideLoading(visible, message))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Lesson)

const styles = StyleSheet.create({
  container: { flex: 1 }
})
