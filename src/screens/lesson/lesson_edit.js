import React from 'react'
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Dimensions,
  Platform,
  Alert
} from 'react-native'
import { Card, CardItem } from 'native-base'
import Ionicons from '@expo/vector-icons/Ionicons'
import { connect } from 'react-redux'
import * as db from '../../db/db'

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
      words: [],
      wordCount: parseInt(this.props.navigation.state.params.counter),
      counter: 0,
      textColor: this.props.setting.textColor || 'red',
      isUpperCase: this.props.setting.isUpperCase || false
    }
  }

  onClickSave = () => {
    this.props.navigation.goBack()
    this.props.navigation.state.params.loadData()
  }

  componentWillMount() {
    this.props.navigation.setParams({
      title: 'Số từ: ' + this.state.counter + '/' + this.state.wordCount,
      onClickSave: this.onClickSave
    })
    this.setState({
      textColor: this.props.setting.textColor,
      isUpperCase: this.props.setting.isUpper,
      wordCount: this.props.setting.numsWord
    })
    db.countIsLearning().then(data => {
      this.setState({ counter: data })
    })
    setInterval(() => {
      db.getAllTopic().then(data => {
        this.setState({ data: data })
      })
    }, 500)
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.setting !== this.props.setting) {
      this.setState({
        textColor: nextProps.setting.textColor,
        isUpperCase: nextProps.setting.isUpperCase
      })
    }
  }

  toggleIsLearningState(word) {
    if (
      this.state.counter === this.state.wordCount &&
      word.isLearning === false
    ) {
      return
    }

    if (word.isCompleted) {
      Alert.alert(
        'Bạn có muốn học lại từ này ?',
        '',
        [
          {
            text: 'Không',
            onPress: () => {
              return
            }
          },
          { text: 'Có', onPress: () => db.toggleIsComplete(word) }
        ],
        { cancelable: false }
      )
    }

    db.toggleIsLearning(word).then(() => {
      db.countIsLearning().then(data => {
        this.setState({ counter: data })
      })
    })
  }

  render() {
    let { data, counter, max, wordCount } = this.state
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
          {`${item.title}`}
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
            backgroundColor: item.isCompleted ? '#fcfcfc' : 'white'
          }}
        >
          {item.isLearning ? (
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

export default connect(mapStateToProps)(LessonEdit)

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  word: {
    width: (Dimensions.get('window').width - 32) / 3,
    height: (Dimensions.get('window').width - 32) / 3
  }
})
