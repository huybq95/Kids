import { combineReducers } from 'redux'
import { settings } from '../screens/settings/setting.reducer'
import { appState } from '../actions/appState'

const rootReducer = combineReducers({
  settings,
  appState
})

export default rootReducer
