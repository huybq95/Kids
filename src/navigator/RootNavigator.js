import React, { Component } from 'react'
import {
  AppState,
  BackHandler,
  NetInfo,
  Dimensions,
  Platform,
  StatusBar,
  Alert
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
import { ScreenOrientation } from 'expo'
import * as db from '../../src/db/db'

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
  }

  async componentWillMount() {
    let data = await db.getSetting()
    if (!data) {
      console.log('no data')
      await db.initData()
    } else {
      console.log('has data')
      this.props.saveSetting(data)
      this.props.checkLearnedToday()
    }
  }

  render() {
    return <RootNavigator />
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
