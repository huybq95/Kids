import React from 'react';
import { Text, View, StyleSheet, Switch, TouchableOpacity, Picker, PickerIOS } from 'react-native';
import { TabNavigator } from 'react-navigation';
import ModalDropdown from 'react-native-modal-dropdown';
import { Ionicons } from '@expo/vector-icons';

const NUMBERS_LIST = [5, 10, 15];
const NEW_LIST = [1, 2, 3, 5];

import * as db from '../db/db';

export default class Setting extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      general: {
        isUpperCase: false,
        textColor: 'black',
        wordCount: '5',
        newCount: '1'
      }
    }
  }

  changeTextType(value) {
    this.setState({ general: { ...this.state.general, isUpperCase: value } });
  }

  changeTextColor(color) {
    this.setState({ general: { ...this.state.general, textColor: color } });
  }

  changeWordCount(index) {
    let value = NUMBERS_LIST[index] + '';
    this.setState({ general: { ...this.state.general, wordCount: value } });
  }

  changeNewCount(index) {
    let value = NEW_LIST[index] + '';
    this.setState({ general: { ...this.state.general, newCount: value } });
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Chung</Text>
        <View style={styles.generalContainer}>
          <View style={styles.rowContainer}>
            <Text style={styles.textLeft}>Chữ hoa</Text>
            <View style={styles.rightContainer}>
              <Switch onValueChange={(value) => this.changeTextType(value)} value={this.state.general.isUpperCase} />
            </View>
          </View>
          <View style={styles.seperate}></View>
          <View style={styles.rowContainer}>
            <Text style={[styles.textLeft, { color: this.state.general.textColor }]}>Màu chữ</Text>
            <View style={styles.colorContainer}>
              <TouchableOpacity style={[styles.circle, { backgroundColor: 'black' }]}
                onPress={() => this.changeTextColor('black')}>
              </TouchableOpacity>
              <View style={{ width: 12 }}></View>
              <TouchableOpacity style={[styles.circle, { backgroundColor: 'tomato' }]}
                onPress={() => this.changeTextColor('tomato')}>
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.seperate}></View>
          <View style={styles.rowContainer}>
            <Text style={styles.textLeft}>Số từ học/ ngày</Text>
            <View style={styles.rightContainer}>
              <ModalDropdown
                style={{ justifyContent: 'center', alignItems: 'center' }}
                textStyle={styles.textStyleModalDropdown}
                dropdownStyle={{ width: 40 }}
                dropdownTextStyle={styles.textStyleModalDropdown}
                dropdownTextHighlightStyle={[styles.textStyleModalDropdown, [{ color: 'red' }]]}
                defaultIndex={0}
                defaultValue={this.state.general.wordCount}
                onSelect={(index) => this.changeWordCount(index)}
                options={NUMBERS_LIST}>
                <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                  <Text style={styles.textStyleModalDropdown}>{this.state.general.wordCount}</Text>
                  <Ionicons name='md-arrow-dropdown' size={24} color='black' style={{ top: 2, marginLeft: 8 }} />
                </View>
              </ModalDropdown>
            </View>
          </View>
          <View style={styles.seperate}></View>
          <View style={styles.rowContainer}>
            <Text style={styles.textLeft}>Số từ mới/ ngày</Text>
            <View style={styles.rightContainer}>
              <ModalDropdown
                style={{ justifyContent: 'center', alignItems: 'center' }}
                textStyle={styles.textStyleModalDropdown}
                dropdownStyle={{ width: 40 }}
                dropdownTextStyle={styles.textStyleModalDropdown}
                dropdownTextHighlightStyle={[styles.textStyleModalDropdown, [{ color: 'red' }]]}
                defaultIndex={0}
                defaultValue={this.state.general.wordCount}
                onSelect={(index) => this.changeNewCount(index)}
                options={NEW_LIST}>
                <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                  <Text style={styles.textStyleModalDropdown}>{this.state.general.newCount}</Text>
                  <Ionicons name='md-arrow-dropdown' size={24} color='black' style={{ top: 2, marginLeft: 8 }} />
                </View>
              </ModalDropdown>
            </View>
          </View>
        </View>
        <Text style={styles.title}>Nhắc nhở</Text>
        <View style={styles.generalContainer}>
          <View style={styles.rowContainer}>
            <Text style={styles.textLeft}>Lần 1</Text>
            <Text style={styles.textRight}>09:00</Text>
          </View>
        </View>
        <View style={styles.seperate}></View>
        <View style={styles.generalContainer}>
          <View style={styles.rowContainer}>
            <Text style={styles.textLeft}>Lần 2</Text>
            <Text style={styles.textRight}>13:00</Text>
          </View>
        </View>
        <View style={styles.seperate}></View>
        <View style={styles.generalContainer}>
          <View style={styles.rowContainer}>
            <Text style={styles.textLeft}>Lần 3</Text>
            <Text style={styles.textRight}>17:00</Text>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    marginTop: 56,
    backgroundColor: '#07000013'
  },
  title: {
    width: '100%',
    color: 'black',
    opacity: 0.54,
    fontSize: 20,
    paddingVertical: 8,
    paddingHorizontal: 16
  },
  seperate: {
    width: '100%',
    height: 1,
    backgroundColor: '#0000001e'
  },
  textLeft: {
    color: 'black',
    opacity: 0.87,
    fontSize: 24,
    fontWeight: '400',
    width: '60%'
  },
  textRight: {
    color: 'black',
    opacity: 0.87,
    fontSize: 24,
    fontWeight: '400',
    textAlign: 'right',
    width: '40%'
  },
  textStyleModalDropdown: {
    color: 'black',
    opacity: 0.87,
    fontSize: 24,
    fontWeight: '400',
  },
  rightContainer: {
    width: '40%',
    alignItems: 'flex-end'
  },
  colorContainer: {
    width: '40%',
    flexDirection: 'row',
    justifyContent: 'flex-end'
  },
  circle: {
    width: 32,
    height: 32,
    borderRadius: 16
  },
  generalContainer: {
    width: '100%',
    backgroundColor: '#FFF'
  },
  rowContainer: {
    flexDirection: 'row',
    width: '100%',
    paddingHorizontal: 16,
    paddingVertical: 8,
    alignItems: 'center',
    backgroundColor: '#FFF'
  }
})