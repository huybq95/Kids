import * as types from './types'
import moment from 'moment'

const initialState = {
  isUpperCase: false,
  textColor: 'red',
  wordCount: '5',
  newCount: '1',
  isAlert: false,
  isManual: false,
  timeShow: 1000,
  alerts: [
    {
      time: moment(new Date().getTime() + 60000).format('HH:mm'),
      title: 'Nhắc nhở',
      body: 'Học bài lần 1'
    },
    {
      time: moment(new Date().getTime() + 120000).format('HH:mm'),
      title: 'Nhắc nhở',
      body: 'Học bài lần 2'
    },
    {
      time: moment(new Date().getTime() + 180000).format('HH:mm'),
      title: 'Nhắc nhở',
      body: 'Học bài lần 3'
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
