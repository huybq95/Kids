import * as types from './types'
import moment from 'moment'

const initialState = {
  isUpperCase: false,
  textColor: 'black',
  wordCount: '5',
  newCount: '1',
  isAlert: false,
  isManual: true,
  timeShow: 3000,
  alerts: [
    {
      time: moment(new Date().getTime() + 60000).format('HH:mm'),
      title: 'Nhắc nhở',
      body: 'Lần 1'
    },
    {
      time: moment(new Date().getTime() + 120000).format('HH:mm'),
      title: 'Nhắc nhở',
      body: 'Lần 2'
    },
    {
      time: moment(new Date().getTime() + 180000).format('HH:mm'),
      title: 'Nhắc nhở',
      body: 'Lần 3'
    }
  ]
}

export default function reduce(state = initialState, action) {
  switch (action.type) {
    case types.SAVE_SETTING:
      const newSetting = action.payload
      return {
        ...state,
        isUpperCase: newSetting.isUpperCase,
        textColor: newSetting.textColor,
        wordCount: newSetting.wordCount,
        newCount: newSetting.newCount,
        isAlert: newSetting.isAlert
      }
    default:
      return state
  }
}
