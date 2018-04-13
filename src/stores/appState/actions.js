import { AsyncStorage } from 'react-native'
import * as types from './types'
import Constants from '../../constants/Constants'

export const checkLearnedToday = () => {
  return async dispatch => {
    let learnedToday = await AsyncStorage.getItem(Constants.StorageKey.LEARNED)
    dispatch({
      type: types.SET_LEARNED_TODAY,
      learnedToday
    })
  }
}

export const showHideLoading = (visible, message) => {
  return dispatch => {
    dispatch({
      type: types.SHOW_HIDE_LOADING,
      visible,
      message
    })
  }
}
