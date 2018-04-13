import React, { Component } from 'react'
import {
  Modal,
  View,
  TouchableOpacity,
  StyleSheet,
  Text,
  ScrollView,
  ActivityIndicator
} from 'react-native'
import Constants from '../constants/Constants'
import { connect } from 'react-redux'

class ProcessingPrompt extends Component {
  render() {
    let { message, visible } = this.props
    return (
      <Modal
        visible={visible}
        onRequestClose={() => {}}
        animationType="slide"
        transparent={true}
      >
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            flex: 1,
            backgroundColor: '#69696969'
          }}
        >
          <View
            style={{
              width: Constants.screen.width / 2,
              backgroundColor: 'white',
              padding: 10,
              borderRadius: 10,
              elevation: 10,
              alignItems: 'center'
            }}
          >
            <ActivityIndicator />
            <Text>{message}</Text>
          </View>
        </View>
      </Modal>
    )
  }
}

function mapStateToProps(state) {
  return {
    message: state.appState.loadingModal.message,
    visible: state.appState.loadingModal.visible
  }
}

export default connect(mapStateToProps)(ProcessingPrompt)
