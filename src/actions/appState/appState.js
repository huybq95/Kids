import * as types from './action-types'

const initialState = {
  learnedToday: false
}

export default function reduce(state = initialState.settings, action) {
  switch (action.type) {
    case types.SET_LEARNED_TODAY:
      return {
        ...state,
        learnedToday: action.learnedToday
      }
    default:
      return state
  }
}
