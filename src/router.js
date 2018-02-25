import React from 'react';
import { TabNavigator, StackNavigator, TabBarBottom } from 'react-navigation';
import { Ionicons } from '@expo/vector-icons';

import Lesson from './screens/lesson/lesson';
import History from './screens/history/history';
import Topic from './screens/topic/topic';
import TopicDetails from './screens/topic/topic.details';
import Setting from './screens/settings/setting';
import LessonDetails from './screens/lesson/lesson_details';

const tabRoot = TabNavigator(
    {
        Lesson: { screen: Lesson, title: 'Bài học' },
        History: { screen: History, title: 'Lịch sử' },
        Topic: { screen: Topic, title: 'Chủ đề' },
        Setting: { screen: Setting, title: 'Cài đặt' },
    },
    {
        navigationOptions: ({ navigation }) => ({
            tabBarIcon: ({ focused, tintColor }) => {
                const { routeName } = navigation.state;
                let iconName;
                switch (routeName) {
                    case 'Lesson':
                        iconName = `ios-book${focused ? '' : '-outline'}`;
                        break;
                    case 'History':
                        iconName = `ios-timer${focused ? '' : '-outline'}`;
                        break;
                    case 'Topic':
                        iconName = `ios-list${focused ? '' : '-outline'}`;
                        break;
                    case 'Setting':
                        iconName = `ios-cog${focused ? '' : '-outline'}`;
                        break;
                    default:
                        break;
                }
                return <Ionicons name={iconName} size={25} color={tintColor} />;
            },
        }),
        tabBarOptions: {
            activeTintColor: 'tomato',
            inactiveTintColor: 'gray',
        },
        tabBarComponent: TabBarBottom,
        tabBarPosition: 'bottom',
        animationEnabled: false,
        swipeEnabled: false,
    }
);

export default StackNavigator({
    Home: tabRoot,
    TopicDetails: { screen: TopicDetails },
    LessonDetails: { screen: LessonDetails }
})
