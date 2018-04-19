import React from 'react'
import {
  Text,
  View,
  StyleSheet,
  Dimensions,
  ScrollView,
  ActivityIndicator,
  FlatList
} from 'react-native'
import { TabNavigator } from 'react-navigation'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Card, CardItem } from 'native-base'
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
      textColor: this.props.setting.textColor || 'red',
      isUpperCase: this.props.setting.isUpperCase || false,
      data: [],
      loading: true
    }
  }

  async componentWillMount() {
    this.setState({
      loading: true,
      textColor: this.props.setting.textColor,
      isUpperCase: this.props.setting.isUpper
    })
    await this.onRefresh()
  }

  onRefresh = async () => {
    let data = await db.getHistory({ done: true })
    data.reverse()
    this.setState({ data, loading: false })
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.setting !== nextProps.setting) {
      this.setState({
        textColor: nextProps.setting.textColor,
        isUpperCase: nextProps.setting.isUpperCase
      })
    }
  }

  getListWordToString(words) {
    return words.map(item => item.text).join(', ')
  }

  renderItem = ({ item, index }) => {
    return (
      <View key={index} style={styles.history}>
        <Card>
          <CardItem header>
            <Text style={{ fontSize: 24, fontWeight: 'bold' }}>
              {item.timeCompleted}
            </Text>
            {/* //format day dd/mm/yyyy */}
          </CardItem>
          <CardItem style={{ alignItems: 'center' }}>
            <Text
              style={{
                fontSize: 24,
                color: this.state.textColor
              }}
            >{`${
              this.state.isUpperCase
                ? this.getListWordToString(item.words).toUpperCase()
                : this.getListWordToString(item.words)
            }`}</Text>
          </CardItem>
        </Card>
      </View>
    )
  }

  render() {
    let { data } = this.state
    if (this.state.loading)
      return (
        <View style={styles.container}>
          <ActivityIndicator />
        </View>
      )
    if (data.length == 0)
      return (
        <View
          style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
        >
          <Text>Bạn chưa học bài nào!</Text>
        </View>
      )

    return (
      <View style={{ flex: 1 }}>
        <FlatList
          data={data}
          renderItem={this.renderItem}
          keyExtractor={(item, index) => index.toString()}
          refreshing={this.state.loading}
          onRefresh={this.onRefresh}
        />
      </View>
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
    saveSetting: payload => {
      SettingActions.saveSetting(payload)
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(History)

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center' },
  history: {
    flex: 1
  }
})
