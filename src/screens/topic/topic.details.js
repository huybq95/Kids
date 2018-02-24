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

import * as db from '../../db/db';

const widthItem = (Dimensions.get('window').width) / 3

export default class TopicDetails extends React.PureComponent {
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
                    <Ionicons name='ios-arrow-back' size={24} color='white' style={{padding: 16}}></Ionicons>
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
            newWord: null
        }
    }

    componentWillMount() {
        this.loadData()
    }

    loadData() {
        db.getListWordOfTopic(this.state.topicTitle, this.getWordsCallback.bind(this));
    }

    getWordsCallback(data) {
        this.setState({ words: data })
    }

    openModal() {
        this.setState({ visibleModal: true })
    }

    closeModal() {
        this.setState({ visibleModal: false })
    }

    createNewWord() {
        db.createNewWord(this.state.topicTitle, this.state.newWord);
        this.closeModal();
        this.loadData();
    }

    render() {
        let { words, visibleModal } = this.state;
        return (
            <View style={styles.container}>
                <FlatList
                    numColumns={3}
                    data={words}
                    renderItem={({ item }) => <View style={styles.wordItem}>
                        <Card style={{ justifyContent: 'center', alignItems: 'center' }}>
                            <Text style={{ fontSize: 24 }}>{item.text}</Text>
                        </Card>
                    </View>}
                ></FlatList>
                <Fab openModal={this.openModal.bind(this)} />
                <Modal style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
                    onBackButtonPress={() => this.closeModal()}
                    onBackdropPress={() => this.closeModal()}
                    visible={visibleModal}>
                    <KeyboardAvoidingView behavior='position'>
                        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
                            <View style={styles.modal}>
                                <Card>
                                    <CardItem style={{ backgroundColor: 'tomato' }} header>
                                        <Text style={{ fontSize: 24, fontWeight: 'bold', color: 'white' }}>Thêm từ</Text>
                                    </CardItem>
                                    <View style={{ flex: 2.5, padding: 16 }}>
                                        <Text style={{ marginRight: 10, fontSize: 20, marginBottom: 20 }}>Từ mới: </Text>
                                        <TextInput
                                            style={{ width: 300, fontSize: 20 }}
                                            placeholder='Nhập từ mới'
                                            onChangeText={(text) => this.setState({ newWord: text })}
                                        ></TextInput>
                                        <View style={{ borderBottomColor: 'black', opacity: 0.2, borderBottomWidth: 1, padding: 5 }}></View>
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
                </Modal>
            </View>
        );
    }
}

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