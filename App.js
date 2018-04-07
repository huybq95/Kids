import React from 'react'
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  AsyncStorage,
  VibrationIOS,
  BackHandler
} from 'react-native'
import { Permissions, Notifications } from 'expo'

import StackNavigator from './src/router'
import * as db from './src/db/db'
import { Provider } from 'react-redux'
import configureStore from './src/store/configureStore'

const store = configureStore()
console.disableYellowBox = true

// AsyncStorage.clear();
async function register() {
  const status = await Permissions.askAsync(Permissions.NOTIFICATIONS)
  // console.log(status)
}

export default class App extends React.Component {
  constructor(props) {
    super(props)
    db.getSetting().then(data => {
      if (!data) {
        console.log('no data')
        db.initData()
      } else {
        console.log('has data')
      }
    })
    register()
  }

  componentWillMount() {
    BackHandler.addEventListener('hardwareBackPress', () => {
      return true
    })
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', () => {
      return true
    })
  }

  render() {
    return (
      <Provider store={store}>
        <StackNavigator />
      </Provider>
    )
  }
}
