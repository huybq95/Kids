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
import { Ionicons } from '@expo/vector-icons'

export default class NewWordDialog extends Component {
  render() {
    let {
      visible,
      title,
      caption,
      rightText,
      onPressRight,
      onPressLeft,
      onChangeText,
      isEditing,
      value,
      speech,
      removeWord,
      duration,
      onPressRecord,
      onPressPlayRecord,
      isRecording
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
              backgroundColor: 'white'
            }}
          >
            <KeyboardAvoidingView behavior="position">
              <View
                style={{
                  width: Constants.screen.width * 5 / 6,
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
                <View style={{ padding: 16 }}>
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
                    value={value}
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
                {isEditing !== undefined && (
                  <View>
                    <View
                      style={{
                        flexDirection: 'row'
                      }}
                    >
                      <TouchableOpacity
                        onPress={speech}
                        disabled={isRecording}
                        style={{ flexDirection: 'row', alignItems: 'center' }}
                      >
                        <Ionicons
                          style={{ padding: 20 }}
                          name="ios-play"
                          color={isRecording ? '#ffbfbf' : 'red'}
                          size={38}
                        />
                        <Text>Nghe phát âm</Text>
                      </TouchableOpacity>
                      {isEditing && (
                        <TouchableOpacity
                          onPress={removeWord}
                          style={{ flexDirection: 'row', alignItems: 'center' }}
                        >
                          <Ionicons
                            style={{ padding: 20 }}
                            name="ios-trash"
                            color={isRecording ? '#ffbfbf' : 'red'}
                            size={38}
                          />
                          <Text>Xóa</Text>
                        </TouchableOpacity>
                      )}
                    </View>
                    <View
                      style={{
                        flexDirection: 'row'
                      }}
                    >
                      <TouchableOpacity
                        onPress={onPressPlayRecord}
                        disabled={isRecording}
                        style={{ flexDirection: 'row', alignItems: 'center' }}
                      >
                        <Ionicons
                          style={{ padding: 20 }}
                          name="ios-play"
                          color={isRecording ? '#ffbfbf' : 'red'}
                          size={38}
                        />
                        <Text>Nghe thu âm</Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        style={{ flexDirection: 'row', alignItems: 'center' }}
                        onPress={onPressRecord}
                      >
                        <Ionicons
                          style={{ padding: 20 }}
                          name={isRecording ? 'md-square' : 'ios-mic'}
                          color="red"
                          size={38}
                        />
                        <Text>Thu âm</Text>
                        <Text style={{ paddingHorizontal: 10 }}>
                          {duration}
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                )}

                <View style={{ flexDirection: 'row' }}>
                  <TouchableOpacity
                    disabled={isRecording}
                    onPress={() => onPressLeft && onPressLeft()}
                    style={{
                      flex: 1,
                      justifyContent: 'center',
                      alignItems: 'center',
                      backgroundColor: '#3e82ff',
                      paddingVertical: 10
                    }}
                  >
                    <Text style={{ fontSize: 20, color: 'white' }}>Hủy</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    disabled={isRecording}
                    onPress={() => onPressRight && onPressRight()}
                    style={{
                      flex: 1,
                      justifyContent: 'center',
                      alignItems: 'center',
                      backgroundColor: '#3e82ff',
                      paddingVertical: 10
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
