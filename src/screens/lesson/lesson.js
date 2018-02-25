import React from 'react';
import { Text, View, StyleSheet, Dimensions } from 'react-native';
import { TabNavigator } from 'react-navigation';
import { Card, CardItem } from 'native-base';
import moment from 'moment';
import { Ionicons } from '@expo/vector-icons';
import { connect } from 'react-redux';

import Fab from '../../components/fab';
import * as db from '../../db/db';
import { FlatList } from 'react-native-gesture-handler';

const WIDTH = (Dimensions.get('window').width - 56) / 3;
const HEIGHT = (Dimensions.get('window').height - 300) / 5;
const actions = [{
  text: 'Học',
  icon: require('../../img/play.png'),
  name: 'bt_learn',
  position: 1,
  color: 'tomato'
}, {
  text: 'Sửa',
  icon: require('../../img/edit.png'),
  name: 'bt_edit',
  position: 2,
  color: 'tomato'
}];

class Lesson extends React.PureComponent {
  static navigationOptions = {
    headerTitle: 'Bài học',
    headerStyle: {
      backgroundColor: 'tomato',
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontSize: 24,
      fontWeight: 'bold',
    },
  }

  constructor(props) {
    super(props)
    this.state = {
      data: [],
      textColor: this.props.settings.textColor || 'black',
      isUpperCase: this.props.settings.isUpperCase || 'black',
      wordCount: this.props.settings.wordCount || '5'
    }
  }

  componentWillMount() {
    let numsWord = parseInt(this.state.wordCount);
    this.loadData()
  }

  loadData() {
    db.getTodayLesson(this.state.wordCount).then(data => {
      this.setState({ data: data })
    })
  }

  componentDidMount() {
    this.setState({
      textColor: this.props.settings.textColor,
      isUpperCase: this.props.settings.isUpperCase
    });
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps && nextProps.settings) {
      this.setState({
        textColor: nextProps.settings.textColor,
        isUpperCase: nextProps.settings.isUpperCase,
        wordCount: nextProps.settings.wordCount
      }, () => this.loadData());
    }
  }

  onPressItem(name) {
    switch (name) {
      case 'bt_learn':
        this.props.navigation.navigate('LessonDetails', { data: this.state.data })
        break;
      case 'bt_edit':

        break;

      default:
        break;
    }
  }

  render() {
    let { data, wordCount } = this.state;
    return (
      <View style={styles.container}>
        <Card style={{}}>
          <CardItem header>
            <Text style={{ fontSize: 32, color: 'black' }}>{`Hôm nay, ${moment(new Date().getTime()).format('DD MMM YYYY')}`}</Text>
          </CardItem>
          {/* <Text style={{ fontSize: 32, color: 'grey', paddingHorizontal: 16 }}>{``}</Text> */}
          <View style={{ borderBottomColor: 'tomato', borderBottomWidth: 1 }}></View>
          <CardItem>
            <FlatList style={{ marginBottom: 56}}
              // scrollEnabled={false}
              extraData={this.state}
              // numColumns={3}
              data={data}
              renderItem={({ item }) =>
                <Text numberOfLines={2} ellipsizeMode='tail'
                  style={{
                    color: this.state.textColor,
                    width: WIDTH, height: HEIGHT, textAlign: 'left', fontSize: 24, paddingVertical: 16
                  }}>
                  {this.state.isUpperCase ? `${item.text}`.toUpperCase() : `${item.text}`}
                </Text>}
            ></FlatList>
          </CardItem>
        </Card>
        <Fab actions={actions} onPressItem={this.onPressItem.bind(this)} />
      </View>
    );
  }
}

function mapStateToProps(state, ownProps) {
  return {
    settings: state.settings
  };
}

export default connect(mapStateToProps)(Lesson);

const styles = StyleSheet.create({
  container: { flex: 1 }
})