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
  static navigationOptions = {
    header: null
  }

  constructor(props) {
    super(props)
    this.state = {
      words: [],
      wordCount: parseInt(this.props.navigation.state.params.counter),
      counter: 0,
      textColor: this.props.settings.textColor || 'red',
      isUpperCase: this.props.settings.isUpperCase || false
    }
  }

  componentWillMount() {
    db.getSetting().then(data => {
      this.setState({
        textColor: data.textColor,
        isUpperCase: data.isUpper,
        wordCount: data.numsWord
      })
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
    if (nextProps && nextProps.settings) {
      this.setState({
        textColor: nextProps.settings.textColor,
        isUpperCase: nextProps.settings.isUpperCase
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
        <View
          style={{
            height: Platform.OS === 'ios' ? 76 : 56,
            backgroundColor: 'red',
            alignItems: 'center',
            flexDirection: 'row',
            justifyContent: 'space-between',
            padding: 16
          }}
        >
          <Text
            style={{
              marginTop: Platform.OS === 'ios' ? 20 : 0,
              fontSize: 24,
              color: 'white'
            }}
          >{`Số từ: ${counter} / ${wordCount}`}</Text>
          <TouchableOpacity
            onPress={() => {
              this.props.navigation.goBack()
              this.props.navigation.state.params.loadData()
            }}
            style={{ marginTop: Platform.OS === 'ios' ? 20 : 0 }}
          >
            <Text style={{ fontSize: 24, color: 'white' }}>Lưu</Text>
          </TouchableOpacity>
        </View>
        {
          <FlatList
            extraData={this.state}
            data={data}
            renderItem={({ item }) => {
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
                      numColumns={3}
                      extraData={this.state}
                      data={item.words}
                      renderItem={({ item }) => {
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
                                backgroundColor: item.isCompleted
                                  ? '#fcfcfc'
                                  : 'white'
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
                                this.state.isUpperCase
                                  ? item.text.toUpperCase()
                                  : item.text
                              }`}</Text>
                            </Card>
                          </TouchableOpacity>
                        )
                      }}
                    />
                  </View>
                </View>
              )
            }}
          />
        }
      </View>
    )
  }
}

function mapStateToProps(state, ownProps) {
  return {
    settings: state.settings
  }
}

export default connect(mapStateToProps)(LessonEdit)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white'
  },
  word: {
    width: (Dimensions.get('window').width - 32) / 3,
    height: (Dimensions.get('window').width - 32) / 3
  }
})
