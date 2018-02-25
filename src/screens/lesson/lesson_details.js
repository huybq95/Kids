import React from 'react';
import { Text, View, StyleSheet, Dimensions } from 'react-native';
import { TabNavigator } from 'react-navigation';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { DeckSwiper, Card, Container } from 'native-base';
import { Speech } from 'expo';
import {FloatingAction} from 'react-native-floating-action';
import Ionicons from '@expo/vector-icons/Ionicons';
// import * as historyActions from './history.actions';

const WIDTH = (Dimensions.get('window').width - 32);
const MARGIN_TOP = ((Dimensions.get('window').height - WIDTH - 100) / 2);

export class LessonDetails extends React.PureComponent {
  static navigationOptions = {
    header: null
  }

  constructor(props) {
    super(props);
    this.state = {
      textColor: this.props.settings.textColor || 'black',
      isUpperCase: this.props.settings.isUpperCase || 'black',
      index: 0
    }
    this.numsWord = this.props.navigation ? this.props.navigation.state.params.data.length : 0
  }

  componentDidMount() {
    this.setState({
      textColor: this.props.settings.textColor,
      isUpperCase: this.props.settings.isUpperCase
    });
    let firstText = this.props.navigation.state.params.data[this.state.index].text;
    setTimeout(() => this.speech(firstText), 500);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps && nextProps.settings) {
      this.setState({
        textColor: nextProps.settings.textColor,
        isUpperCase: nextProps.settings.isUpperCase
      });
    }
  }

  speech(text) {
    Speech.stop();
    Speech.speak(text, { language: 'vi-VN' });
  }

  nextWord() {
    this.setState({ index: this.state.index + 1 }, () => {
      if (this.state.index === this.numsWord) {
        return;
      }
      let text = this.props.navigation.state.params.data[this.state.index].text;
      this.speech(text);
    })
  }

  // previousWord() {
  //   this.index = this.index + 1;
  //   let text = this.props.navigation.state.params.data[this.index].text;
  //   this.speech(text);
  // }

  render() {
    let { data } = this.props.navigation.state.params;
    if (this.state.index === this.numsWord) {
      setTimeout(() => this.props.navigation.goBack(), 1000);
    }
    return (
      <View style={{ flex: 1, backgroundColor: 'white' }}>
        <DeckSwiper
          // renderEmpty={() => this.setState({ isCompleted: true })}
          onSwipeRight={() => this.nextWord()}
          onSwipeLeft={() => this.nextWord()}
          looping={false}
          dataSource={data}
          renderItem={item =>
            <Card style={[styles.container, { width: WIDTH, height: WIDTH + 100, alignSelf: 'center', marginTop: MARGIN_TOP }]}>
              <Text style={{ color: this.state.textColor, fontSize: 56 }}>{this.state.isUpperCase ? `${item.text}`.toUpperCase() : `${item.text}`}</Text>
              <FloatingAction
                actions={this.props.actions}
                buttonColor='tomato'
                floatingIcon={<Ionicons name='ios-play' size={24} color='white'></Ionicons>}
                onPressItem={(name) => this.props.onPressItem && this.props.onPressItem(name)}
                showBackground={false}
                onPressMain={() => this.speech(data[this.state.index].text)}
            />
            </Card>
          }
        ></DeckSwiper>
      </View>
    );
  }
}

function mapStateToProps(state, ownProps) {
  return {
    settings: state.settings
  };
}

// function mapDispatchToProps(dispatch) {
//   return {
//     actions: bindActionCreators(historyActions, dispatch)
//   };
// }

export default connect(mapStateToProps)(LessonDetails);

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'white' }
})