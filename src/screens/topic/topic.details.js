import React from 'react';
import { Text, View, StyleSheet, FlatList, Dimensions } from 'react-native';
import { TabNavigator } from 'react-navigation';
import { Card } from 'native-base';
import Fab from '../../components/fab';

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
        }
    };

    constructor(props) {
        super(props)
        this.state = {
            words: []
        }
    }

    componentWillMount() {
        db.getListWordOfTopic(this.props.navigation.state.params.title, this.getWordsCallback.bind(this));
    }

    getWordsCallback(data) {
        this.setState({ words: data })
    }

    render() {
        let { words } = this.state;
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
                <Fab/>
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
})