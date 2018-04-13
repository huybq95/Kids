import * as types from './types'

export function saveSetting(data) {
  return {
    type: types.SAVE_SETTING,
    payload: data
  }
}
