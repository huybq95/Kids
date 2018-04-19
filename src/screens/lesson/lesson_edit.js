import React from 'react'
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Dimensions,
  Platform,
  Alert,
  ActivityIndicator
} from 'react-native'
import { Card, CardItem } from 'native-base'
import Ionicons from '@expo/vector-icons/Ionicons'
import { connect } from 'react-redux'
import * as db from '../../db/db'
import Constants from '../../constants/Constants'
import * as AppStateActions from '../../stores/appState/actions'

let beginList = []
const { LEARNING, LEARNED, NEW_WORD } = Constants.State
class LessonEdit extends React.PureComponent {
  static navigationOptions = ({ navigation }) => {
    const params = navigation.state.params || {}
    return {
      headerTitle: params.title,
      headerRight: (
        <TouchableOpacity onPress={params.onClickSave}>
          <Text
            style={{
              fontWeight: 'bold',
              fontSize: 20,
              paddingHorizontal: 20,
              color: 'white'
            }}
          >
            Lưu
          </Text>
        </TouchableOpacity>
      ),
      headerStyle: {
        backgroundColor: 'red'
      },
      headerTintColor: '#fff'
    }
  }

  constructor(props) {
    super(props)
    this.state = {
      wordCount: 0,
      learning: 0,
      textColor: this.props.setting.textColor || 'red',
      isUpperCase: this.props.setting.isUpperCase || false,
      loading: true,
      data: []
    }
  }

  onClickSave = async () => {
    if (this.state.learning < this.state.wordCount) {
      Alert.alert('Lỗi', 'Bạn chưa chọn đủ ' + this.state.wordCount + ' từ')
      return
    }

    this.props.showHideLoading(true, 'Đang cập nhật bài học...')
    let { data } = this.state
    let updateToLearning = []
    let updateToNewWord = []
    for (let i in data) {
      for (let j in data[i].words) {
        let currentWord = data[i].words[j]
        if (currentWord.state !== beginList[i].words[j].state) {
          if (
            beginList[i].words[j].state === LEARNING &&
            currentWord.state === NEW_WORD
          )
            updateToNewWord.push(currentWord._id)
          else if (
            beginList[i].words[j].state === NEW_WORD &&
            currentWord.state === LEARNING
          )
            updateToLearning.push(currentWord._id)
        }
      }
    }
    //update word
    await db.updateLearningWord(updateToNewWord, NEW_WORD)
    await db.updateLearningWord(updateToLearning, LEARNING)

    this.props.showHideLoading(false)
    this.props.navigation.state.params.onGoBack()
    this.props.navigation.goBack()
    // this.props.navigation.state.params.loadData()
  }

  async componentWillMount() {
    this.props.navigation.setParams({
      onClickSave: this.onClickSave
    })
    this.setState({
      textColor: this.props.setting.textColor,
      isUpperCase: this.props.setting.isUpper,
      wordCount: this.props.setting.wordCount
    })
    // db.countIsLearning().then(data => {
    //   this.setState({ counter: data })
    // })
    let data = await db.getAllTopic()
    beginList = JSON.parse(JSON.stringify(data))
    this.setState({ data, loading: false })
    this.toggleLearned()
  }

  // updateWordCount() {
  //   this.props.navigation.setParams({
  //     title: 'Số từ: ' + selectedWordIds.length + '/' + this.state.wordCount
  //   })
  // }

  componentWillReceiveProps(nextProps) {
    if (nextProps.setting !== this.props.setting) {
      this.setState({
        textColor: nextProps.setting.textColor,
        isUpperCase: nextProps.setting.isUpperCase
      })
    }
  }

  toggleLearned(id, toState) {
    let { data } = this.state
    let learning = 0
    for (let i in data) {
      for (let j in data[i].words) {
        let c = data[i].words[j]
        if (c._id === id) data[i].words[j].state = toState
        if (c.state === LEARNING) learning++
      }
    }
    this.setState({ data, learning })
    this.props.navigation.setParams({
      title: 'Số từ: ' + learning + '/' + this.state.wordCount
    })
  }

  toggleIsLearningState(word) {
    switch (word.state) {
      case NEW_WORD:
        if (this.state.learning < this.state.wordCount)
          this.toggleLearned(word._id, LEARNING)
        break
      case LEARNED:
        if (this.state.learning < this.state.wordCount)
          Alert.alert(
            'Từ này đã học rồi!',
            'Bạn có muốn học lại từ này ?',
            [
              {
                text: 'Không'
              },
              {
                text: 'Có',
                onPress: () => this.toggleLearned(word._id, LEARNING)
              }
            ],
            { cancelable: false }
          )
        break
      case LEARNING:
        this.toggleLearned(word._id, NEW_WORD)
    }

    // db.toggleIsLearning(word).then(() => {
    //   db.countIsLearning().then(data => {
    //     this.setState({ counter: data })
    //   })
    // })
  }

  render() {
    let { data, counter, max, wordCount, loading } = this.state
    if (loading)
      return (
        <View
          style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
        >
          <ActivityIndicator />
        </View>
      )
    return (
      <View style={styles.container}>
        <FlatList
          keyExtractor={(item, index) => index.toString()}
          extraData={this.state}
          data={data}
          renderItem={this.renderTopicList}
        />
      </View>
    )
  }

  renderTopicList = ({ item }) => {
    return (
      <View key={item.title} style={{}}>
        <Text
          style={{
            fontSize: 24,
            fontWeight: 'bold',
            textAlign: 'center',
            padding: 10
          }}
        >
          {item.title}
        </Text>
        <View style={{ padding: 16 }}>
          <FlatList
            keyExtractor={(item, index) => index.toString()}
            numColumns={3}
            extraData={this.state}
            data={item.words}
            renderItem={this.renderWordInTopic}
          />
        </View>
      </View>
    )
  }

  renderWordInTopic = ({ item }) => {
    return (
      <TouchableOpacity
        onPress={() => this.toggleIsLearningState(item)}
        key={item._id}
        style={[styles.word]}
      >
        <Card
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: item.state === LEARNED ? '#e7e5e5' : 'white'
          }}
        >
          {item.state === LEARNING ? (
            <Ionicons
              style={{
                position: 'absolute',
                top: 0,
                right: 10
              }}
              name="ios-checkmark"
              size={32}
              color="red"
            />
          ) : null}
          <Text style={{ color: this.state.textColor }}>{`${
            this.state.isUpperCase ? item.text.toUpperCase() : item.text
          }`}</Text>
        </Card>
      </TouchableOpacity>
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
    showHideLoading: (visible, message) =>
      dispatch(AppStateActions.showHideLoading(visible, message))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LessonEdit)

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  word: {
    width: (Dimensions.get('window').width - 32) / 3,
    height: (Dimensions.get('window').width - 32) / 3
  }
})
