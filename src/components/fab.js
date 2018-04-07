import React from 'react'
import { FloatingAction } from 'react-native-floating-action'

export default class Fab extends React.PureComponent {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <FloatingAction
        actions={this.props.actions || []}
        buttonColor="red"
        // color='red'
        onPressItem={name =>
          this.props.onPressItem && this.props.onPressItem(name)
        }
        showBackground={false}
        onPressMain={() => this.props.openModal && this.props.openModal()}
      />
    )
  }
}
