import React from 'react';
import {
    Text,
    View,
    StyleSheet,
    TouchableOpacity,
    FlatList,
    Dimensions,
    KeyboardAvoidingView,
    TouchableWithoutFeedback,
    Keyboard,
    TextInput
} from 'react-native';
import { Card, CardItem, Body } from 'native-base';
import Modal from 'react-native-modal';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as topicActions from './topic.actions';

import { TabNavigator } from 'react-navigation';
import * as db from '../../db/db';
import Fab from '../../components/fab';

const TOPIC_TYPE = 'topic';

export class TopicItem extends React.PureComponent {
    constructor(props) {
        super(props)
        this.state = {
            textColor: this.props.settings.textColor || 'black',
            isUpperCase: this.props.settings.isUpperCase || false,
            data: this.props.data
        }
    }

    componentDidMount() {
        this.setState({
            textColor: this.props.settings.textColor,
            isUpperCase: this.props.settings.isUpperCase
        });
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            textColor: nextProps.settings.textColor,
            isUpperCase: nextProps.settings.isUpperCase
        });
    }

    showTopicDetails(data) {
        this.props.navigation.navigate('TopicDetails', { title: data.title })
    }

    render() {
        let { data } = this.state;
        return (
            <View style={styles.topicItem}>
                <Card>
                    <TouchableOpacity onPress={() => this.showTopicDetails(data)}>
                        <CardItem header>
                            <Text style={{ fontSize: 24 }}>{data.title ? data.title : ''}</Text>
                        </CardItem>
                    </TouchableOpacity>
                    <FlatList
                        extraData={this.state}
                        horizontal={true}
                        data={data.words}
                        renderItem={({ item }) =>
                            <View style={styles.wordItem}>
                                <Card style={{ justifyContent: 'center', alignItems: 'center' }}>
                                    <Text style={{ fontSize: 24, color: this.state.textColor }}>{this.state.isUpperCase ? item.text.toUpperCase() : item.text}</Text>
                                </Card>
                            </View>}
                    ></FlatList>
                </Card>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    topicItem: {
    },
    wordItem: {
        height: 150,
        width: 150,
        padding: 10
    },
    modal: {
        height: 300,
        width: Dimensions.get('window').width - 32,
        // backgroundColor: 'tomato',
        borderRadius: 20
    }
})

function mapStateToProps(state, ownProps) {
    return {
        settings: state.settings
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(topicActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(TopicItem);