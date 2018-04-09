import React from 'react'
import { Text, View, StyleSheet, Dimensions, ScrollView } from 'react-native'
import { TabNavigator } from 'react-navigation'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Card, CardItem } from 'native-base'

import * as historyActions from './history.actions'
import * as db from '../../db/db'

class History extends React.PureComponent {
  static navigationOptions = ({ navigation }) => {
    const { params } = navigation.state
    return {
      title: 'Lịch sử',
      headerTitle: 'LỊCH SỬ',
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
      textColor: this.props.settings.textColor || 'red',
      isUpperCase: this.props.settings.isUpperCase || false,
      data: []
    }
    this.loadData = this.loadData.bind(this)
    this.loadData()
  }

  componentDidMount() {
    this.setState({
      textColor: this.props.settings.textColor,
      isUpperCase: this.props.settings.isUpperCase
    })
  }

  loadData() {
    db.getSetting().then(data => {
      this.setState({
        textColor: data.textColor,
        isUpperCase: data.isUpper
      })
    })
    db.getHistory().then(data => {
      this.setState({ data: data })
    })
  }

  componentWillMount() {
    setInterval(() => {
      this.loadData()
    }, 1000)
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps && nextProps.settings) {
      this.setState({
        textColor: nextProps.settings.textColor,
        isUpperCase: nextProps.settings.isUpperCase
      })
    }
  }

  getListWordToString(words) {
    let string = ''
    if (words.length === 0) {
      return ''
    }
    for (var word in words) {
      string += words[word].text + ', '
    }
    return string
  }

  render() {
    let { data } = this.state
    return (
      <ScrollView style={styles.container}>
        {data.length > 0
          ? data.map((e, i) => {
              return (
                <View key={i} style={styles.history}>
                  <Card>
                    <CardItem header>
                      <Text style={{ fontSize: 24, fontWeight: 'bold' }}>
                        {e.timeCompleted}
                      </Text>
                      {/* //format day dd/mm/yyyy */}
                    </CardItem>
                    <CardItem style={{ alignItems: 'center' }}>
                      <Text
                        style={{ fontSize: 24, color: this.state.textColor }}
                      >{`${
                        this.state.isUpperCase
                          ? this.getListWordToString(e.words).toUpperCase()
                          : this.getListWordToString(e.words)
                      }`}</Text>
                    </CardItem>
                  </Card>
                </View>
              )
            })
          : null}
      </ScrollView>
    )
  }
}

function mapStateToProps(state, ownProps) {
  return {
    settings: state.settings
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(historyActions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(History)

const styles = StyleSheet.create({
  container: { flex: 1 },
  history: {
    height: Dimensions.get('window').height / 4
  }
})
