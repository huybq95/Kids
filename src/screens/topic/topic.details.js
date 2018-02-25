import React from 'react';
import {
    Text,
    View,
    StyleSheet,
    FlatList,
    Dimensions,
    KeyboardAvoidingView,
    TouchableWithoutFeedback,
    TextInput,
    TouchableOpacity,
    Keyboard
} from 'react-native';
import { TabNavigator } from 'react-navigation';
import { Card, CardItem } from 'native-base';
import Fab from '../../components/fab';
import Modal from 'react-native-modal';
import { Ionicons } from '@expo/vector-icons';
import { Speech } from 'expo';
import Toast, { DURATION } from 'react-native-easy-toast';
import { connect } from 'react-redux';

import * as db from '../../db/db';

const widthItem = (Dimensions.get('window').width) / 3

class TopicDetails extends React.PureComponent {
    static navigationOptions = ({ navigation }) => {
        const { params } = navigation.state;

        return {
            title: params ? params.title : 'Topic Details',
            headerStyle: {
                backgroundColor: 'tomato',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
                fontWeight: 'bold',
            },
            headerLeft: (
                <TouchableOpacity onPress={() => {
                    navigation.goBack();
                    params.reloadData();
                }}>
                    <Ionicons name='ios-arrow-back' size={24} color='white' style={{ padding: 16 }}></Ionicons>
                </TouchableOpacity>
            )
        }
    };

    constructor(props) {
        super(props)
        this.state = {
            words: [],
            visibleModal: false,
            topicTitle: this.props.navigation.state.params.title || '',
            newWord: null,
            isEditing: false,
            selectItem: {},
            textColor: this.props.settings.textColor || 'black',
            isUpperCase: this.props.settings.isUpperCase || 'black',
        }
    }

    componentWillMount() {
        this.loadData()
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

    speech(text) {
        Speech.stop();
        Speech.speak(text, { language: 'vi-VN' });
    }

    loadData() {
        db.getWordsOfTopic(this.state.topicTitle).then(topic => {
            this.setState({ words: topic })
        }).catch(err => { })
    }

    openModal(isEditing = false) {
        if (isEditing) {
            this.setState({ newWord: this.state.selectItem.text })
        }
        this.setState({ visibleModal: true, isEditing: isEditing })
    }

    closeModal() {
        this.setState({ visibleModal: false })
    }

    showWordDetails(item) {
        this.setState({ selectItem: item }, () => {
            this.openModal(true)
        })
    }

    createNewWord() {
        let newWord = {
            type: 'word',
            topic: this.state.topicTitle,
            lesson: null,
            text: this.state.newWord,
            isCompleted: false,
            isLearning: false,
            updated: new Date().getTime()
        }
        // console.log('newWord', newWord)
        db.createNewWord(newWord).then(() => {
            this.closeModal();
            this.loadData();
        }).catch(err => {
            this.showToast('Cant add new word !')
        });
    }

    updateWord() {
        let word = this.state.selectItem;
        word.text = this.state.newWord;
        db.updateWord(word).then(() => {
            this.closeModal();
            this.showToast('Updated !', DURATION.LENGTH_SHORT)
            this.loadData();
        }).catch(() => {
            this.showToast('Cant update new word !')
        })
    }

    removeWord(word) {
        db.removeWord(word).then(() => {
            this.closeModal();
            this.loadData();
        }).catch(err => { })
    }

    render() {
        let { words, visibleModal, isEditing, newWord } = this.state;
        return (
            <View style={styles.container}>
                <FlatList
                    extraData={this.state}
                    numColumns={3}
                    data={words}
                    renderItem={({ item }) => <TouchableOpacity onPress={() => this.showWordDetails(item)}
                        style={styles.wordItem}>
                        <Card style={{ justifyContent: 'center', alignItems: 'center' }}>
                            <Text style={{ fontSize: 24, color: this.state.textColor }}>{this.state.isUpperCase ? `${item.text}`.toUpperCase() : `${item.text}`}</Text>
                        </Card>
                    </TouchableOpacity>}
                ></FlatList>
                <Fab openModal={this.openModal.bind(this)} />
                <Modal style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
                    onBackButtonPress={() => this.closeModal()}
                    onBackdropPress={() => this.closeModal()}
                    visible={visibleModal}>
                    {
                        !isEditing ?
                            <KeyboardAvoidingView behavior='position'>
                                <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
                                    <View style={styles.modal}>
                                        <Card>
                                            <CardItem style={{ backgroundColor: 'tomato' }} header>
                                                <Text style={{ fontSize: 24, fontWeight: 'bold', color: 'white' }}>Thêm từ</Text>
                                            </CardItem>
                                            <View style={{ flex: 2.5, padding: 16 }}>
                                                <Text style={{ marginRight: 10, fontSize: 20 }}>Từ mới: </Text>
                                                <TextInput
                                                    style={{ width: 300, height: 30, marginTop: 20, fontSize: 20 }}
                                                    placeholder='Nhập từ mới'
                                                    underlineColorAndroid='transparent'
                                                    onChangeText={(text) => this.setState({ newWord: text })}
                                                ></TextInput>
                                                <View style={{ borderBottomColor: 'black', opacity: 0.2, borderBottomWidth: 1, padding: 5 }}></View>
                                                <TouchableOpacity onPress={() => this.speech(newWord)}
                                                    style={{ flexDirection: 'row', alignItems: 'center' }}>
                                                    <Ionicons style={{ paddingHorizontal: 10 }} name='ios-play' color='tomato' size={48}></Ionicons>
                                                    <Text style={{ fontSize: 20 }}>Nghe thử</Text>
                                                </TouchableOpacity>
                                            </View>
                                            <View style={{ flexDirection: 'row', flex: 1 }}>
                                                <TouchableOpacity onPress={() => this.createNewWord()}
                                                    style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                                                    <Text>Đồng ý</Text>
                                                </TouchableOpacity>
                                                <TouchableOpacity onPress={() => this.closeModal()}
                                                    style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                                                    <Text>Hủy</Text>
                                                </TouchableOpacity>
                                            </View>
                                        </Card>
                                    </View>
                                </TouchableWithoutFeedback>
                            </KeyboardAvoidingView>
                            : <KeyboardAvoidingView behavior='position'>
                                <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
                                    <View style={styles.modal}>
                                        <Card>
                                            <CardItem style={{ backgroundColor: 'tomato' }} header>
                                                <Text style={{ fontSize: 24, fontWeight: 'bold', color: 'white' }}>Sửa từ</Text>
                                            </CardItem>
                                            <View style={{ flex: 2.5, padding: 16 }}>
                                                <Text style={{ marginRight: 10, fontSize: 20 }}>Từ : </Text>
                                                <TextInput
                                                    ref='edit'
                                                    style={{ width: 300, height: 30, marginTop: 20, fontSize: 20 }}
                                                    placeholder='Nhập từ mới'
                                                    value={newWord}
                                                    underlineColorAndroid='transparent'
                                                    onFocus={() => { this.refs.edit.clear() }}
                                                    onChangeText={(text) => this.setState({ newWord: text })}
                                                ></TextInput>
                                                <View style={{ borderBottomColor: 'black', opacity: 0.2, borderBottomWidth: 1, padding: 5 }}></View>
                                                <View style={{ flexDirection: 'row', flex: 1 }}>
                                                    <TouchableOpacity onPress={() => this.speech(newWord)}
                                                        style={{ flexDirection: 'row', alignItems: 'center' }}>
                                                        <Ionicons style={{ paddingHorizontal: 10 }} name='ios-play' color='tomato' size={48}></Ionicons>
                                                        <Text style={{ fontSize: 20 }}>Nghe thử</Text>
                                                    </TouchableOpacity>
                                                    <TouchableOpacity onPress={() => this.removeWord(this.state.selectItem)}
                                                        style={{ flexDirection: 'row', alignItems: 'center' }}>
                                                        <Ionicons style={{ paddingHorizontal: 10 }} name='ios-trash' color='tomato' size={48}></Ionicons>
                                                        <Text style={{ fontSize: 20 }}>Xóa</Text>
                                                    </TouchableOpacity>
                                                </View>
                                            </View>
                                            <View style={{ flexDirection: 'row', flex: 1 }}>
                                                <TouchableOpacity onPress={() => this.updateWord()}
                                                    style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                                                    <Text>Đồng ý</Text>
                                                </TouchableOpacity>
                                                <TouchableOpacity onPress={() => this.closeModal()}
                                                    style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                                                    <Text>Hủy</Text>
                                                </TouchableOpacity>
                                            </View>
                                        </Card>
                                    </View>
                                </TouchableWithoutFeedback>
                            </KeyboardAvoidingView>
                    }
                </Modal>
            </View>
        );
    }
}

function mapStateToProps(state, ownProps) {
    return {
        settings: state.settings
    };
}

export default connect(mapStateToProps)(TopicDetails);

const styles = StyleSheet.create({
    container: { flex: 1 },
    wordItem: {
        height: widthItem,
        width: widthItem,
        padding: 10
    },
    modal: {
        height: 300,
        width: Dimensions.get('window').width - 32,
        // backgroundColor: 'tomato',
        borderRadius: 20
    }
})