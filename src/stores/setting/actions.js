import * as types from './types'
import { Notifications } from 'expo'

function convertTime(time) {
  let _time = {}
  let string = time.split(':')
  _time.hour = string[0]
  _time.minute = string[1]
  return _time
}

export function saveSetting(data) {
  return async dispatch => {
    await Notifications.cancelAllScheduledNotificationsAsync()
    if (data.isAlert) {
      data.alerts.map((e, i) => {
        let _time = convertTime(e.time)
        let date = new Date()
        date.setHours(_time.hour)
        date.setMinutes(_time.minute)
        date.setSeconds(0)
        if (date < new Date()) {
          date.setDate(date.getDate() + 1)
        }
        Notifications.scheduleLocalNotificationAsync(
          {
            title: e.title,
            body: e.body,
            sound: true,
            vibrate: 500,
            priority: 'high'
          },
          {
            time: date,
            repeat: 'day'
          }
        )
      })
    }

    dispatch({
      type: types.SAVE_SETTING,
      payload: data
    })
  }
}
