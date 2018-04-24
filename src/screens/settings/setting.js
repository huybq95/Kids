import React from 'react'
import {
  Text,
  View,
  StyleSheet,
  Platform,
  Switch,
  TouchableOpacity,
  Picker,
  PickerIOS,
  Vibration,
  TimePickerAndroid,
  ScrollView
} from 'react-native'
import { TabNavigator } from 'react-navigation'
import ModalDropdown from 'react-native-modal-dropdown'
import { Ionicons } from '@expo/vector-icons'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as SettingActions from '../../stores/setting/actions'
import * as AppStateActions from '../../stores/appState/actions'
import moment from 'moment'
import { initialState } from '../../stores/setting/reducer'

const NUMBERS_LIST = [1, 2, 3, 4, 5, 10, 15, 20, 25]
const NEW_LIST = [1, 2, 3, 4, 5]

import * as db from './../../db/db'

class Setting extends React.PureComponent {
  static navigationOptions = {
    title: 'Cài đặt',
    headerTitle: 'CÀI ĐẶT',
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
      setting: initialState
    }
  }

  async componentWillMount() {
    this.setState({ setting: this.props.setting })
  }

  async loadData() {
    let data = await db.getSetting()
    console.log('load data', data)
    //set to redux store
    this.props.saveSetting(data)
    //set to state
    const curSetting = this.state.setting
    let objSetting = {}
    objSetting.isUpperCase = data.isUpperCase || curSetting.isUpperCase
    objSetting.textColor = data.textColor || curSetting.textColor
    objSetting.wordCount = data.wordCount || curSetting.wordCount
    objSetting.newCount = data.newCount || curSetting.newCount
    objSetting.isAlert = data.isAlert || curSetting.isAlert
    objSetting.alerts = data.alerts || curSetting.alerts
    objSetting.isManual = data.isManual || curSetting.isManual
    this.setState({ setting: objSetting })
    this.props.showHideLoading(false)
  }

  async saveSettingsToDB(data) {
    const curSetting = this.state.setting
    let objSetting = {}
    objSetting.isUpperCase = data.isUpperCase || curSetting.isUpperCase
    objSetting.textColor = data.textColor || curSetting.textColor
    objSetting.wordCount = data.wordCount || curSetting.wordCount
    objSetting.newCount = data.newCount || curSetting.newCount
    objSetting.isAlert = data.isAlert || curSetting.isAlert
    objSetting.alerts = data.alerts || curSetting.alerts
    objSetting.isManual = data.isManual || curSetting.isManual
    await db.saveSetting(objSetting)
    await this.loadData()
  }

  changeTextType(value) {
    this.props.showHideLoading(true, 'Cập nhật cài đặt...')
    this.setState(
      { setting: { ...this.state.setting, isUpperCase: value } },
      async () => {
        await this.saveSettingsToDB(this.state.setting)
      }
    )
  }

  changeManual(value) {
    this.props.showHideLoading(true, 'Cập nhật cài đặt...')
    this.setState(
      { setting: { ...this.state.setting, isManual: value } },
      async () => {
        await this.saveSettingsToDB(this.state.setting)
      }
    )
  }

  changeTime(data, position) {
    this.props.showHideLoading(true, 'Cập nhật cài đặt...')
    let { setting } = this.state
    let _alerts = setting.alerts
    _alerts[position] = data
    this.setState(
      {
        setting: { ...setting, alert: _alerts }
      },
      async () => {
        await this.saveSettingsToDB(this.state.setting)
      }
    )
  }

  changeAlert() {
    this.props.showHideLoading(true, 'Cập nhật cài đặt...')
    // Vibration.vibrate()
    this.setState({ setting: { ...this.state.setting } }, async () => {
      await this.saveSettingsToDB(this.state.setting)
    })
  }

  changeTextColor(color) {
    this.props.showHideLoading(true, 'Cập nhật cài đặt...')
    this.setState(
      { setting: { ...this.state.setting, textColor: color } },
      async () => {
        await this.saveSettingsToDB(this.state.setting)
      }
    )
  }

  changeWordCount(index) {
    this.props.showHideLoading(true, 'Cập nhật cài đặt...')
    let wordCount = NUMBERS_LIST[index]
    let newCount = parseInt((wordCount - 1) / 5) + 1
    this.setState(
      { setting: { ...this.state.setting, wordCount, newCount } },
      async () => {
        await this.saveSettingsToDB(this.state.setting)
      }
    )
  }

  changeNewCount(index) {
    this.props.showHideLoading(true, 'Cập nhật cài đặt...')
    let value = NEW_LIST[index] + ''
    this.setState(
      { setting: { ...this.state.setting, newCount: value } },
      async () => {
        await this.saveSettingsToDB(this.state.setting)
      }
    )
  }

  convertTime(time) {
    let _time = {}
    let string = time.split(':')
    _time.hour = string[0]
    _time.minute = string[1]
    return _time
  }

  async openTimePickerAndroid(alert) {
    let timeSet = this.convertTime(alert.time)

    try {
      const { action, hour, minute } = await TimePickerAndroid.open({
        hour: parseFloat(timeSet.hour),
        minute: parseFloat(timeSet.minute),
        is24Hour: true,
        mode: 'spinner'
      })
      if (action !== TimePickerAndroid.dismissedAction) {
        let newTimeSet = this.convertNewTimeSet(hour, minute)
        let _alert = alert
        _alert.time = newTimeSet
        this.changeAlert(_alert)
      }
    } catch ({ code, message }) {
      console.warn('Cannot open time picker', message)
    }
  }

  convertNewTimeSet(hour, minute) {
    let newTime = ''
    if (hour < 10) {
      newTime = `0${hour}`
    } else {
      newTime = `${hour}`
    }
    if (minute < 10) {
      newTime = `${newTime}:0${minute}`
    } else {
      newTime = `${newTime}:${minute}`
    }
    return newTime
  }

  toggleAlert(value) {
    this.setState(
      { setting: { ...this.state.setting, isAlert: value } },
      () => {
        this.saveSettingsToDB(this.state.setting)
      }
    )
  }

  render() {
    return (
      <ScrollView style={styles.container}>
        <View
          style={{ paddingVertical: 8, paddingHorizontal: 16, width: '100%' }}
        >
          <Text style={styles.title}>Chung</Text>
        </View>
        <View style={styles.settingsContainer}>
          <View style={styles.rowContainer}>
            <Text style={styles.textLeft}>Chữ hoa</Text>
            <View style={styles.rightContainer}>
              <Switch
                thumbTintColor={Platform.OS === 'ios' ? null : 'red'}
                onTintColor="red"
                onValueChange={value => this.changeTextType(value)}
                value={this.state.setting.isUpperCase}
              />
            </View>
          </View>
          <View style={styles.rowContainer}>
            <Text style={styles.textLeft}>Thủ công</Text>
            <View style={styles.rightContainer}>
              <Switch
                thumbTintColor={Platform.OS === 'ios' ? null : 'red'}
                onTintColor="red"
                onValueChange={value => this.changeManual(value)}
                value={this.state.setting.isManual}
              />
            </View>
          </View>
          <View style={styles.seperate} />
          <View style={styles.rowContainer}>
            <Text
              style={[styles.textLeft, { color: this.state.setting.textColor }]}
            >
              Màu chữ
            </Text>
            <View style={styles.colorContainer}>
              <TouchableOpacity
                style={[
                  styles.circle,
                  {
                    backgroundColor: 'black',
                    justifyContent: 'center',
                    alignItems: 'center'
                  }
                ]}
                onPress={() => this.changeTextColor('black')}
              >
                {this.state.setting.textColor === 'black' ? (
                  <Ionicons name="ios-checkmark" size={32} color="white" />
                ) : null}
              </TouchableOpacity>
              <View style={{ width: 12 }} />
              <TouchableOpacity
                style={[
                  styles.circle,
                  {
                    backgroundColor: 'red',
                    justifyContent: 'center',
                    alignItems: 'center'
                  }
                ]}
                onPress={() => this.changeTextColor('red')}
              >
                {this.state.setting.textColor === 'red' ? (
                  <Ionicons name="ios-checkmark" size={32} color="white" />
                ) : null}
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.seperate} />
          <View style={styles.rowContainer}>
            <Text style={styles.textLeft}>Số từ học mỗi ngày</Text>
            <View style={styles.rightContainer}>
              <ModalDropdown
                style={{ justifyContent: 'center', alignItems: 'center' }}
                textStyle={styles.textStyleModalDropdown}
                dropdownStyle={{ width: 80 }}
                dropdownTextStyle={styles.textStyleModalDropdown}
                dropdownTextHighlightStyle={[
                  styles.textStyleModalDropdown,
                  [{ color: 'red' }]
                ]}
                defaultIndex={0}
                defaultValue={this.state.setting.wordCount.toString()}
                onSelect={index => this.changeWordCount(index)}
                options={NUMBERS_LIST}
              >
                <View
                  style={{
                    width: '100%',
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center'
                  }}
                >
                  <Text style={styles.textStyleModalDropdown}>
                    {this.state.setting.wordCount}
                  </Text>
                  <Ionicons
                    name="md-arrow-dropdown"
                    size={24}
                    color="black"
                    style={{ top: 2, marginLeft: 8 }}
                  />
                </View>
              </ModalDropdown>
            </View>
          </View>
          <View style={styles.seperate} />
          {/* <View style={styles.rowContainer}>
            <Text style={styles.textLeft}>Số từ mới/ ngày</Text>
            <View style={styles.rightContainer}>
              <ModalDropdown
                style={{ justifyContent: 'center', alignItems: 'center' }}
                textStyle={styles.textStyleModalDropdown}
                dropdownStyle={{ width: 80 }}
                dropdownTextStyle={styles.textStyleModalDropdown}
                dropdownTextHighlightStyle={[
                  styles.textStyleModalDropdown,
                  [{ color: 'red' }]
                ]}
                defaultIndex={0}
                defaultValue={this.state.setting.wordCount.toString()}
                onSelect={index => this.changeNewCount(index)}
                options={NEW_LIST}
              >
                <View
                  style={{
                    width: '100%',
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center'
                  }}
                >
                  <Text style={styles.textStyleModalDropdown}>
                    {this.state.setting.newCount}
                  </Text>
                  <Ionicons
                    name="md-arrow-dropdown"
                    size={24}
                    color="black"
                    style={{ top: 2, marginLeft: 8 }}
                  />
                </View>
              </ModalDropdown>
            </View>
          </View> */}
        </View>
        <View
          style={{
            paddingVertical: 8,
            paddingHorizontal: 16,
            width: '100%',
            flexDirection: 'row',
            alignItems: 'center'
          }}
        >
          <Text style={[styles.title, { width: '60%' }]}>
            Nhắc nhở hàng ngày
          </Text>
          <View style={styles.rightContainer}>
            <Switch
              thumbTintColor={Platform.OS === 'ios' ? null : 'red'}
              onTintColor="red"
              onValueChange={value => this.toggleAlert(value)}
              value={this.state.setting.isAlert}
            />
          </View>
        </View>
        {this.state.setting.alerts.map((e, i) => {
          return (
            <TouchableOpacity
              onPress={() => this.openTimePickerAndroid(e)}
              key={i}
            >
              <View style={styles.settingsContainer}>
                <View style={styles.rowContainer}>
                  <Text style={styles.textLeft}>{`Lần ${i + 1}`}</Text>
                  <Text style={styles.textRight}>{e.time}</Text>
                </View>
              </View>
              <View style={styles.seperate} />
            </TouchableOpacity>
          )
        })}
      </ScrollView>
    )
  }
}

function mapStateToProps(state, ownProps) {
  return {
    setting: state.setting
  }
}

function mapDispatchToProps(dispatch) {
  return {
    saveSetting: payload => dispatch(SettingActions.saveSetting(payload)),
    showHideLoading: (visible, message) =>
      dispatch(AppStateActions.showHideLoading(visible, message))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Setting)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // alignItems: 'center',
    backgroundColor: '#07000013'
  },
  title: {
    width: '100%',
    color: 'black',
    opacity: 0.54,
    fontSize: 24
  },
  seperate: {
    width: '100%',
    height: 1,
    backgroundColor: '#0000001e'
  },
  textLeft: {
    color: 'black',
    opacity: 0.87,
    fontSize: 20,
    fontWeight: '400',
    width: '60%'
  },
  textRight: {
    color: 'black',
    opacity: 0.87,
    fontSize: 20,
    fontWeight: '400',
    textAlign: 'right',
    width: '40%'
  },
  textStyleModalDropdown: {
    color: 'black',
    opacity: 0.87,
    fontSize: 20,
    fontWeight: '400'
  },
  rightContainer: {
    width: '40%',
    alignItems: 'flex-end'
  },
  colorContainer: {
    width: '40%',
    flexDirection: 'row',
    justifyContent: 'flex-end'
  },
  circle: {
    width: 32,
    height: 32,
    borderRadius: 16
  },
  settingsContainer: {
    width: '100%',
    backgroundColor: '#FFF'
  },
  rowContainer: {
    flexDirection: 'row',
    width: '100%',
    paddingHorizontal: 16,
    paddingVertical: 8,
    alignItems: 'center',
    backgroundColor: '#FFF'
  }
})
