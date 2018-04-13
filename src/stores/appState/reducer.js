import * as types from './types'

const initialState = {
  learnedToday: false,
  loadingModal: {
    message: null,
    visible: false
  }
}

export default function reduce(state = initialState, action) {
  switch (action.type) {
    case types.SET_LEARNED_TODAY:
      return {
        ...state,
        learnedToday: action.learnedToday === 'true'
      }
    case types.SHOW_HIDE_LOADING:
      return {
        ...state,
        loadingModal: {
          message: action.message,
          visible: action.visible
        }
      }
    default:
      return state
  }
}
