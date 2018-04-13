import React from 'react'
import { Text, View, StyleSheet, Dimensions, AsyncStorage } from 'react-native'
import { TabNavigator } from 'react-navigation'
import * as AppStateActions from '../../stores/appState/actions'
import { connect } from 'react-redux'
import { DeckSwiper, Card, Container } from 'native-base'
import { Speech, ScreenOrientation, Audio } from 'expo'
import Ionicons from '@expo/vector-icons/Ionicons'
import * as db from '../../db/db'
import Constants from '../../constants/Constants'
import ActionButton from 'react-native-action-button'

var autoSwipe

export class LessonDetails extends React.PureComponent {
  static navigationOptions = {
    header: null
  }

  constructor(props) {
    super(props)
    this.state = {
      textColor: this.props.setting.textColor || 'red',
      isUpperCase: this.props.setting.isUpperCase || 'black',
      index: 0,
      mute: false
    }
    this.numsWord = this.props.navigation
      ? this.props.navigation.state.params.data.length
      : 0
    this.numsNewWord = 1
  }

  componentDidMount() {
    let { setting } = this.props
    this.setState({
      textColor: this.props.setting.textColor,
      isUpperCase: this.props.setting.isUpperCase
    })
    setTimeout(() => this.speech(), 500)
    db.getSetting().then(data => {
      if (!data.isManual) {
        autoSwipe = setInterval(() => {
          this._deckSwiper._root.swipeRight()
          this.nextWord()
        }, setting.timeShow)
      }
    })

    ScreenOrientation.allow(ScreenOrientation.Orientation.LANDSCAPE)
  }

  componentWillUnmount() {
    ScreenOrientation.allow(ScreenOrientation.Orientation.PORTRAIT_UP)
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps && nextProps.setting) {
      this.setState({
        textColor: nextProps.setting.textColor,
        isUpperCase: nextProps.setting.isUpperCase,
        isManual: nextProps.isManual
      })
      this.numsNewWord = nextProps.setting.numsNewWord
    }
  }

  async speech() {
    let item = this.props.navigation.state.params.data[this.state.index]

    console.log('speech item ', item, this.state.index)
    if (item && item.recordingPath && item.recordingDuration) {
      this.sound = new Audio.Sound()
      this.setState({ recordingDuration: item.recordingDuration })
      try {
        await this.sound.loadAsync({ uri: item.recordingPath })
        this.sound.playAsync()
      } catch (e) {
        Alert.alert('ERROR Loading Audio', e.message)
      }
    } else {
      Speech.stop()
      Speech.speak(item.text, { language: 'vi-VN' })
    }
  }

  nextWord() {
    this.setState({ index: this.state.index + 1 }, () => {
      if (this.state.index === this.numsWord) {
        this.isCompleted()
        clearInterval(autoSwipe)
        setTimeout(() => this.props.navigation.goBack(), 1000)
      } else {
        if (!this.state.mute) this.speech()
      }
    })
  }

  async isCompleted() {
    if (!this.props.learnedToday) {
      let { data } = this.props.navigation.state.params
      console.log('save history', data)
      db.saveHistory(data, this.numsNewWord)
      await AsyncStorage.setItem(Constants.StorageKey.LEARNED, 'true')
      this.props.checkLearnedToday()
    }
  }

  render() {
    let { data } = this.props.navigation.state.params

    db.getSetting().then(data => {
      this.numsNewWord = data.numsNewWord
    })
    let { width, height } = Constants.screen
    // let marginTop = width < height ? (height - width) / 2 : height / 6
    let marginTop = width / 12
    width = (width < height ? width : height) * 5 / 6
    return (
      <View style={{ flex: 1 }}>
        <DeckSwiper
          ref={c => (this._deckSwiper = c)}
          onSwipeRight={() => this.nextWord()}
          onSwipeLeft={() => this.nextWord()}
          looping={false}
          dataSource={data}
          renderItem={item => (
            <Card
              style={[
                styles.container,
                {
                  width,
                  height: width,
                  alignSelf: 'center',
                  marginTop
                }
              ]}
            >
              <Text style={{ color: this.state.textColor, fontSize: 56 }}>
                {this.state.isUpperCase
                  ? `${item.text}`.toUpperCase()
                  : `${item.text}`}
              </Text>
            </Card>
          )}
        />
        <ActionButton
          buttonColor="red"
          renderIcon={() => (
            <Ionicons
              name={this.state.mute ? 'md-volume-mute' : 'md-volume-up'}
              color="white"
              size={30}
            />
          )}
          onPress={() => this.setState({ mute: !this.state.mute })}
        />
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
    checkLearnedToday: () => dispatch(AppStateActions.checkLearnedToday())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LessonDetails)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white'
  }
})
