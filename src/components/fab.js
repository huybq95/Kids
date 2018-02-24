import React from 'react';
import { FloatingAction } from 'react-native-floating-action';

export default class Fab extends React.PureComponent {
    constructor(props) {
        super(props)
    }
    render() {
        return (
            <FloatingAction
                actions={this.props.actions}
                buttonColor='tomato'
                // color='tomato'
                showBackground={false}
                onPressMain={() => this.props.openModal()}
            />
        )
    }
}