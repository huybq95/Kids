import React from 'react';
import { TabNavigator, StackNavigator, TabBarBottom } from 'react-navigation';
import { Ionicons } from '@expo/vector-icons';

import Lesson from './screens/lesson';
import History from './screens/history';
import Topic from './screens/topic';
import Setting from './screens/setting';

export default TabNavigator(
    {
        Lesson: { screen: Lesson },
        History: { screen: History },
        Topic: { screen: Topic },
        Setting: { screen: Setting },
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
        animationEnabled: true,
        swipeEnabled: true,
    }
);
