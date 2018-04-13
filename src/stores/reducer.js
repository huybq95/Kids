import { combineReducers } from 'redux'
import setting from './setting/reducer'
import appState from './appState/reducer'

const rootReducer = combineReducers({
  setting,
  appState
})

export default rootReducer
