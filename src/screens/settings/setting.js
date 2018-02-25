import React from 'react';
import { Text, View, StyleSheet, Platform,
   Switch, TouchableOpacity, Picker, PickerIOS } from 'react-native';
import { TabNavigator } from 'react-navigation';
import ModalDropdown from 'react-native-modal-dropdown';
import { Ionicons } from '@expo/vector-icons';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as settingActions from './setting.actions';

const NUMBERS_LIST = [5, 10, 15];
const NEW_LIST = [1, 2, 3, 5];

import * as db from './../../db/db';

class Setting extends React.PureComponent {
  static navigationOptions = {
    headerTitle: 'Cài đặt',
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
    super(props);
    this.state = {
      settings: {
        isUpperCase: false,
        textColor: 'black',
        wordCount: '5',
        newCount: '1',
        isAlert: false
      }
    }
  }

  componentWillMount() {
    this.loadData();
  }

  loadData() {
    db.getSetting().then(data => {
      this.getSettingsCallback(data);
    }).catch(err => { });
  }

  getSettingsCallback(data) {
    const curSetting = this.state.settings;
    let objSetting = {};
    objSetting.isUpperCase = data.isUpper || curSetting.isUpperCase;
    objSetting.textColor = data.textColor || curSetting.textColor;
    objSetting.wordCount = data.numsWord || curSetting.numsWord;
    objSetting.newCount = data.numsNewWord || curSetting.numsNewWord;
    objSetting.isAlert = data.notification || curSetting.isAlert;
    this.setState({ settings: objSetting });
  }

  saveSettings(data) {
    const curSetting = this.state.settings;
    let objSetting = {};
    objSetting.isUpper = data.isUpperCase || curSetting.isUpperCase;
    objSetting.textColor = data.textColor || curSetting.textColor;
    objSetting.numsWord = data.wordCount || curSetting.wordCount;
    objSetting.numsNewWord = data.newCount || curSetting.newCount;
    objSetting.notification = data.isAlert || curSetting.isAlert;
    db.saveSetting(objSetting).then(() => {
      this.loadData();
    });
  }

  changeTextType(value) {
    this.setState({ settings: { ...this.state.settings, isUpperCase: value } }, () => {
      this.props.actions.saveSetting(this.state.settings);
      this.saveSettings(this.state.settings);
    });
  }

  changeAlert(value) {
    this.setState({ settings: { ...this.state.settings, isAlert: value } }, () => {
      this.props.actions.saveSetting(this.state.settings);
      this.saveSettings(this.state.settings);
    });
  }

  changeTextColor(color) {
    this.setState({ settings: { ...this.state.settings, textColor: color } }, () => {
      this.props.actions.saveSetting(this.state.settings);
      this.saveSettings(this.state.settings);
    });
  }

  changeWordCount(index) {
    let value = NUMBERS_LIST[index] + '';
    this.setState({ settings: { ...this.state.settings, wordCount: value } }, () => {
      this.props.actions.saveSetting(this.state.settings);
      this.saveSettings(this.state.settings);
    });
  }

  changeNewCount(index) {
    let value = NEW_LIST[index] + '';
    this.setState({ settings: { ...this.state.settings, newCount: value } }, () => {
      this.props.actions.saveSetting(this.state.settings);
      this.saveSettings(this.state.settings);
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={{ paddingVertical: 8, paddingHorizontal: 16, width: '100%' }}>
          <Text style={styles.title}>Chung</Text>
        </View>
        <View style={styles.settingsContainer}>
          <View style={styles.rowContainer}>
            <Text style={styles.textLeft}>Chữ hoa</Text>
            <View style={styles.rightContainer}>
              <Switch thumbTintColor={Platform.OS === 'ios' ? null : 'tomato' } onTintColor='tomato' onValueChange={(value) => this.changeTextType(value)} value={this.state.settings.isUpperCase} />
            </View>
          </View>
          <View style={styles.seperate}></View>
          <View style={styles.rowContainer}>
            <Text style={[styles.textLeft, { color: this.state.settings.textColor }]}>Màu chữ</Text>
            <View style={styles.colorContainer}>
              <TouchableOpacity style={[styles.circle, { backgroundColor: 'black', justifyContent: 'center', alignItems: 'center' }]}
                onPress={() => this.changeTextColor('black')}>
                {
                  this.state.settings.textColor === 'black' ?
                  <Ionicons name='ios-checkmark' size={32} color='white'></Ionicons> : null
                }
              </TouchableOpacity>
              <View style={{ width: 12 }}></View>
              <TouchableOpacity style={[styles.circle, { backgroundColor: 'tomato', justifyContent: 'center', alignItems: 'center' }]}
                onPress={() => this.changeTextColor('tomato')}>
                {
                  this.state.settings.textColor === 'tomato' ?
                  <Ionicons name='ios-checkmark' size={32} color='white'></Ionicons> : null
                }
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
                defaultValue={this.state.settings.wordCount.toString()}
                onSelect={(index) => this.changeWordCount(index)}
                options={NUMBERS_LIST}>
                <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                  <Text style={styles.textStyleModalDropdown}>{this.state.settings.wordCount}</Text>
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
                defaultValue={this.state.settings.wordCount.toString()}
                onSelect={(index) => this.changeNewCount(index)}
                options={NEW_LIST}>
                <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                  <Text style={styles.textStyleModalDropdown}>{this.state.settings.newCount}</Text>
                  <Ionicons name='md-arrow-dropdown' size={24} color='black' style={{ top: 2, marginLeft: 8 }} />
                </View>
              </ModalDropdown>
            </View>
          </View>
        </View>
        <View style={{ paddingVertical: 8, paddingHorizontal: 16, width: '100%', flexDirection: 'row', alignItems: 'center' }}>
          <Text style={[styles.title, { width: '60%' }]}>Nhắc nhở</Text>
          <View style={styles.rightContainer}>
            <Switch thumbTintColor={Platform.OS === 'ios' ? null : 'tomato' } onTintColor='tomato' onValueChange={(value) => this.changeAlert(value)} value={this.state.settings.isAlert} />
          </View>
        </View>
        <View style={styles.settingsContainer}>
          <View style={styles.rowContainer}>
            <Text style={styles.textLeft}>Lần 1</Text>
            <Text style={styles.textRight}>09:00</Text>
          </View>
        </View>
        <View style={styles.seperate}></View>
        <View style={styles.settingsContainer}>
          <View style={styles.rowContainer}>
            <Text style={styles.textLeft}>Lần 2</Text>
            <Text style={styles.textRight}>13:00</Text>
          </View>
        </View>
        <View style={styles.seperate}></View>
        <View style={styles.settingsContainer}>
          <View style={styles.rowContainer}>
            <Text style={styles.textLeft}>Lần 3</Text>
            <Text style={styles.textRight}>17:00</Text>
          </View>
        </View>
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
    actions: bindActionCreators(settingActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Setting);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#07000013'
  },
  title: {
    width: '100%',
    color: 'black',
    opacity: 0.54,
    fontSize: 20
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
  settingsContainer: {
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