import React, { Component } from 'react'
import {
  AppState,
  BackHandler,
  NetInfo,
  Dimensions,
  Platform,
  StatusBar,
  Alert,
  Animated,
  View,
  Text
} from 'react-native'
import { connect } from 'react-redux'
import {
  addNavigationHelpers,
  NavigationActions,
  StackNavigator
} from 'react-navigation'
import LessonDetails from '../screens/lesson/lesson_details'
import LessonEdit from '../screens/lesson/lesson_edit'
import TopicDetails from '../screens/topic/topic.details'
import TabHome from './TabHome'
import * as AppStateActions from '../stores/appState/actions'
import * as SettingActions from '../stores/setting/actions'
import { ScreenOrientation, Updates } from 'expo'
import * as db from '../../src/db/db'
import Constants from '../constants/Constants'

export const RootNavigator = StackNavigator(
  {
    Home: TabHome,
    TopicDetails: { screen: TopicDetails },
    LessonDetails: { screen: LessonDetails },
    LessonEdit: { screen: LessonEdit }
  },
  {
    navigationOptions: {
      gesturesEnabled: false
    },
    initialRouteName: 'Home'
  }
)

class RootWithNavigationState extends Component {
  static navigationOptions = {
    header: null
  }
  constructor(props) {
    super(props)
    ScreenOrientation.allow(ScreenOrientation.Orientation.PORTRAIT_UP)
    this.state = {
      updateMessage: null,
      translateY: new Animated.Value(50)
    }
  }

  async componentWillMount() {
    let data = await db.getAllWords()
    if (!data || data.length === 0) {
      console.log('no data')
      await db.initData()
    } else {
      console.log('has data')
      this.props.saveSetting(data)
      this.props.checkLearnedToday()
    }
  }

  async componentDidMount() {
    //show snackbar
    Animated.timing(this.state.translateY, {
      toValue: 0,
      duration: 2000
    }).start()

    this.setState({ updateMessage: 'Đang kiểm tra phiên bản mới...' })

    try {
      const update = await Updates.checkForUpdateAsync()
      if (update.isAvailable) {
        this.setState({ updateMessage: 'Đang cập nhật phiên bản mới...' })
        await Updates.fetchUpdateAsync()
        Alert.alert(
          'Cập nhật',
          'Vui lòng khởi động lại app để cập nhật phiên bản mới',
          [
            {
              text: 'Khởi động lại',
              onPress: () => Updates.reload()
            }
          ]
        )
      } else {
        this.setState({
          updateMessage: 'Bạn đang sử dụng phiên bản mới nhất'
        })

        setTimeout(() => {
          this.state.translateY.setValue(0)
          Animated.timing(this.state.translateY, {
            toValue: 50,
            duration: 2000
          }).start(() => this.setState({ updateMessage: null }))
        }, 5000)
      }
    } catch (e) {
      this.setState({ updateMessage: e.message })

      setTimeout(() => {
        this.state.translateY.setValue(0)
        Animated.timing(this.state.translateY, {
          toValue: 50,
          duration: 2000
        }).start(() => this.setState({ updateMessage: null }))
      }, 5000)
    }
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <RootNavigator />
        {this.state.updateMessage ? (
          <Animated.View
            style={{
              position: 'absolute',
              bottom: 0,
              backgroundColor: '#FFFF0089',
              width: Constants.screen.width,
              alignItems: 'center',
              flexDirection: 'row',
              transform: [{ translateY: this.state.translateY }]
            }}
          >
            <Text style={{ flex: 1, textAlign: 'center', margin: 7 }}>
              {this.state.updateMessage}
            </Text>
          </Animated.View>
        ) : null}
      </View>
    )
  }
}

function mapDispatchToProps(dispatch) {
  return {
    checkLearnedToday: () => dispatch(AppStateActions.checkLearnedToday()),
    saveSetting: payload => dispatch(SettingActions.saveSetting(payload))
  }
}

const mapStateToProps = state => ({
  navigatorRoot: state.navigatorRoot
})

export default connect(mapStateToProps, mapDispatchToProps)(
  RootWithNavigationState
)
