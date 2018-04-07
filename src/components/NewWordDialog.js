import React, { Component } from 'react'
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Modal
} from 'react-native'
import { CardItem } from 'native-base'
import Constants from '../constants/Constants'

export default class NewWordDialog extends Component {
  render() {
    let {
      visible,
      title,
      caption,
      rightText,
      onPressRight,
      onChangeText
    } = this.props
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
              maxHeight: 3 * Constants.screen.height / 4,
              backgroundColor: 'white'
            }}
          >
            <KeyboardAvoidingView behavior="position">
              <View
                style={{
                  width: Constants.screen.width * 3 / 4,
                  height: 300,
                  borderRadius: 5
                }}
              >
                <CardItem style={{ backgroundColor: 'red' }} header>
                  <Text
                    style={{
                      fontSize: 24,
                      fontWeight: 'bold',
                      color: 'white'
                    }}
                  >
                    {title}
                  </Text>
                </CardItem>
                <View style={{ flex: 2.5, padding: 16 }}>
                  <Text
                    style={{
                      marginRight: 10,
                      fontSize: 20,
                      marginBottom: 20
                    }}
                  >
                    {caption}
                  </Text>
                  <TextInput
                    style={{ width: 300, fontSize: 20 }}
                    placeholder={'Nhập ' + caption.toLowerCase()}
                    underlineColorAndroid="transparent"
                    onChangeText={onChangeText}
                  />
                  <View
                    style={{
                      borderBottomColor: 'black',
                      opacity: 0.2,
                      borderBottomWidth: 1,
                      padding: 5
                    }}
                  />
                </View>
                <View style={{ flexDirection: 'row', flex: 1 }}>
                  <TouchableOpacity
                    onPress={() => this.closeModal()}
                    style={{
                      flex: 1,
                      justifyContent: 'center',
                      alignItems: 'center',
                      backgroundColor: '#3e82ff'
                    }}
                  >
                    <Text style={{ fontSize: 20, color: 'white' }}>Hủy</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => onPressRight && onPressRight()}
                    style={{
                      flex: 1,
                      justifyContent: 'center',
                      alignItems: 'center',
                      backgroundColor: '#3e82ff'
                    }}
                  >
                    <Text style={{ fontSize: 20, color: 'white' }}>
                      {rightText}
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </KeyboardAvoidingView>
          </View>
        </View>
      </Modal>
    )
  }
}
