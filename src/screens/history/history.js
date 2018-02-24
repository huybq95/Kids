import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { TabNavigator } from 'react-navigation';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as historyActions from './history.actions';

export class History extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      textColor: this.props.settings.textColor || 'black',
      isUpperCase: this.props.settings.isUpperCase || 'black'
    }
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
        isUpperCase: nextProps.settings.isUpperCase
      });
    }
  }

  render() {
    console.log(this.state.textColor)
    return (
      <View style={styles.container}>
        <Text style={{ color: this.state.textColor }}>{this.state.isUpperCase ? 'History!'.toUpperCase() : 'History!'}</Text>
      </View>
    );
  }
}

function mapStateToProps(state, ownProps) {
  return {
    settings: state.settings
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(historyActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(History);

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' }
})