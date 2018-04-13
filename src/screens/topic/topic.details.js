import React from 'react'
import {
  Text,
  View,
  StyleSheet,
  FlatList,
  Dimensions,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  TextInput,
  TouchableOpacity,
  Keyboard
} from 'react-native'
import { TabNavigator } from 'react-navigation'
import { Card, CardItem } from 'native-base'
import Fab from '../../components/fab'
import Modal from 'react-native-modal'
import { Ionicons } from '@expo/vector-icons'
import { Speech, Permissions, Asset, Audio, FileSystem } from 'expo'
import Toast, { DURATION } from 'react-native-easy-toast'
import { connect } from 'react-redux'
import ActionButton from 'react-native-action-button'
import * as db from '../../db/db'
import NewWordDialog from '../../components/NewWordDialog'

const widthItem = Dimensions.get('window').width / 3

class TopicDetails extends React.PureComponent {
  static navigationOptions = ({ navigation }) => {
    const { params } = navigation.state

    return {
      title: params ? params.title : 'Topic Details',
      headerStyle: {
        backgroundColor: 'red'
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold'
      },
      headerLeft: (
        <TouchableOpacity
          onPress={() => {
            navigation.goBack()
            params.reloadData()
          }}
        >
          <Ionicons
            name="ios-arrow-back"
            size={24}
            color="white"
            style={{ padding: 16 }}
          />
        </TouchableOpacity>
      )
    }
  }

  constructor(props) {
    super(props)
    this.state = {
      words: [],
      visibleModal: false,
      topicTitle: this.props.navigation.state.params.title || '',
      newWord: null,
      isEditing: false,
      selectItem: {},
      textColor: this.props.setting.textColor || 'black',
      isUpperCase: this.props.setting.isUpperCase || 'black',

      isLoading: false,
      recordingDuration: null,
      isRecording: false,
      haveRecordingPermissions: false,
      recordPath: null
    }
    this.recordingSettings = JSON.parse(
      JSON.stringify(Audio.RECORDING_OPTIONS_PRESET_LOW_QUALITY)
    )
    this.sound = null
  }

  componentWillMount() {
    db.getSetting().then(data => {
      this.setState({
        textColor: data.textColor,
        isUpperCase: data.isUpper
      })
    })
    this.loadData()
  }

  componentDidMount() {
    this.setState({
      textColor: this.props.setting.textColor,
      isUpperCase: this.props.setting.isUpperCase
    })
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps && nextProps.setting) {
      this.setState({
        textColor: nextProps.setting.textColor,
        isUpperCase: nextProps.setting.isUpperCase
      })
    }
  }

  speech = () => {
    Speech.stop()
    Speech.speak(this.state.newWord, { language: 'vi-VN' })
  }

  loadData() {
    db
      .getWordsOfTopic(this.state.topicTitle)
      .then(topic => {
        console.log('load data ', topic)
        this.setState({ words: topic })
      })
      .catch(err => {})
  }

  openModal = (isEditing = false) => {
    if (isEditing) {
      this.setState({ newWord: this.state.selectItem.text })
    } else {
      this.setState({ newWord: undefined })
    }
    this.setState({ visibleModal: true, isEditing: isEditing })
  }

  closeModal = () => {
    this.setState({
      visibleModal: false,
      recordingPath: null,
      recordingDuration: null
    })
  }

  async showWordDetails(item) {
    if (item.recordingDuration && item.recordingPath) {
      this.sound = new Audio.Sound()
      this.setState({ recordingDuration: item.recordingDuration })
      try {
        await this.sound.loadAsync({ uri: item.recordingPath })
      } catch (e) {
        Alert.alert('ERROR Loading Audio', e.message)
      }
    }
    this.setState({ selectItem: item }, () => {
      this.openModal(true)
    })
  }

  createNewWord = () => {
    let newWord = {
      type: 'word',
      topic: this.state.topicTitle,
      lesson: null,
      text: this.state.newWord,
      isCompleted: false,
      isLearning: false,
      updated: new Date().getTime(),
      recordingPath: this.state.recordingPath,
      recordingDuration: this.state.recordingDuration
    }
    // console.log('newWord', newWord)
    db
      .createNewWord(newWord)
      .then(() => {
        this.closeModal()
        this.loadData()
      })
      .catch(err => {
        this.refs.toast.show('Cant add new word !')
      })
  }

  updateWord = () => {
    let word = this.state.selectItem
    word.text = this.state.newWord
    word.recordingPath = this.state.recordingPath
    word.recordingDuration = this.state.recordingDuration
    db
      .updateWord(word)
      .then(() => {
        this.closeModal()
        this.refs.toast.show('Updated !', DURATION.LENGTH_SHORT)
        this.loadData()
        this.setState({ recordingPath: null, recordingDuration: null })
      })
      .catch(() => {
        this.refs.toast.show('Cant update new word !')
      })
  }

  removeWord = () => {
    db
      .removeWord(this.state.selectItem)
      .then(() => {
        this.closeModal()
        this.loadData()
      })
      .catch(err => {})
  }

  async _stopPlaybackAndBeginRecording() {
    this.setState({
      isLoading: true
    })
    if (this.sound !== null) {
      await this.sound.unloadAsync()
      this.sound.setOnPlaybackStatusUpdate(null)
      this.sound = null
    }
    await Audio.setAudioModeAsync({
      allowsRecordingIOS: true,
      interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DO_NOT_MIX,
      playsInSilentModeIOS: true,
      shouldDuckAndroid: true,
      interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DO_NOT_MIX
    })
    if (this.recording) {
      this.recording.setOnRecordingStatusUpdate(null)
      this.recording = null
    }

    const recording = new Audio.Recording()
    await recording.prepareToRecordAsync(this.recordingSettings)
    recording.setOnRecordingStatusUpdate(this._updateScreenForRecordingStatus)

    this.recording = recording
    await this.recording.startAsync() // Will call this._updateScreenForRecordingStatus to update the screen.
    this.setState({
      isLoading: false
    })
  }

  async _stopRecordingAndEnablePlayback() {
    this.setState({
      isLoading: true
    })
    try {
      await this.recording.stopAndUnloadAsync()
    } catch (error) {
      // Do nothing -- we are already unloaded.
    }
    const info = await FileSystem.getInfoAsync(this.recording.getURI())
    console.log(`FILE INFO: ${JSON.stringify(info)}`)
    this.setState({ recordingPath: this.recording.getURI() })

    await Audio.setAudioModeAsync({
      allowsRecordingIOS: false,
      interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DO_NOT_MIX,
      playsInSilentModeIOS: true,
      playsInSilentLockedModeIOS: true,
      shouldDuckAndroid: true,
      interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DO_NOT_MIX
    })
    const { sound, status } = await this.recording.createNewLoadedSound(
      {
        // isLooping: true,
        isMuted: this.state.muted,
        volume: this.state.volume,
        rate: this.state.rate,
        shouldCorrectPitch: this.state.shouldCorrectPitch
      },
      this._updateScreenForSoundStatus
    )
    this.sound = sound
    this.setState({
      isLoading: false
    })
  }

  _updateScreenForRecordingStatus = status => {
    if (status.canRecord) {
      this.setState({
        isRecording: status.isRecording,
        recordingDuration: status.durationMillis
      })
    } else if (status.isDoneRecording) {
      this.setState({
        isRecording: false,
        recordingDuration: status.durationMillis
      })
      if (!this.state.isLoading) {
        this._stopRecordingAndEnablePlayback()
      }
    }
  }

  _getRecordingTimestamp() {
    if (this.state.recordingDuration != null) {
      return `${this._getMMSSFromMillis(this.state.recordingDuration)}`
    }
    return `${this._getMMSSFromMillis(0)}`
  }

  _getMMSSFromMillis(millis) {
    const totalSeconds = millis / 1000
    const seconds = Math.floor(totalSeconds % 60)
    const minutes = Math.floor(totalSeconds / 60)

    const padWithZero = number => {
      const string = number.toString()
      if (number < 10) {
        return '0' + string
      }
      return string
    }
    return padWithZero(minutes) + ':' + padWithZero(seconds)
  }

  onPressRecord = () => {
    if (!this.state.haveRecordingPermissions) {
      this._askForPermissions()
    }
    if (this.state.isRecording) {
      this._stopRecordingAndEnablePlayback()
    } else {
      this._stopPlaybackAndBeginRecording()
    }
  }

  _onPlayPausePressed = () => {
    if (this.sound != null) {
      if (this.state.isPlaying) {
        this.sound.pauseAsync()
      } else {
        this.sound.playAsync()
      }
    }
  }

  _askForPermissions = async () => {
    const response = await Permissions.askAsync(Permissions.AUDIO_RECORDING)
    this.setState({
      haveRecordingPermissions: response.status === 'granted'
    })
  }

  render() {
    let { words, visibleModal, isEditing, newWord, isRecording } = this.state
    return (
      <View style={styles.container}>
        <FlatList
          keyExtractor={(item, index) => index.toString()}
          extraData={this.state}
          numColumns={3}
          data={words}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => this.showWordDetails(item)}
              style={styles.wordItem}
            >
              <Card style={{ justifyContent: 'center', alignItems: 'center' }}>
                <Text style={{ fontSize: 24, color: this.state.textColor }}>
                  {this.state.isUpperCase
                    ? `${item.text}`.toUpperCase()
                    : `${item.text}`}
                </Text>
              </Card>
            </TouchableOpacity>
          )}
        />
        <ActionButton
          buttonColor="red"
          buttonText="+"
          onPress={this.openModal}
        />
        <NewWordDialog
          visible={visibleModal}
          title={isEditing ? 'Sửa từ' : 'Thêm từ mới'}
          caption="Từ:"
          rightText="Lưu"
          onPressRight={isEditing ? this.updateWord : this.createNewWord}
          onChangeText={text => this.setState({ newWord: text })}
          onPressLeft={this.closeModal}
          isEditing={isEditing}
          speech={this.speech}
          removeWord={this.removeWord}
          value={newWord}
          onPressRecord={this.onPressRecord}
          duration={this._getRecordingTimestamp()}
          onPressPlayRecord={this._onPlayPausePressed}
          isRecording={isRecording}
        />
        <Toast ref="toast" />
      </View>
    )
  }
}

function mapStateToProps(state, ownProps) {
  return {
    setting: state.setting
  }
}

export default connect(mapStateToProps)(TopicDetails)

const styles = StyleSheet.create({
  container: { flex: 1 },
  wordItem: {
    height: widthItem,
    width: widthItem,
    padding: 10
  },
  modal: {
    height: 300,
    width: Dimensions.get('window').width - 32,
    // backgroundColor: 'red',
    borderRadius: 20
  }
})
