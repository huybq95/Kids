import { Dimensions } from 'react-native'
const { width, height } = Dimensions.get('window')

export default {
  screen: {
    width,
    height
  },
  StorageKey: {
    LEARNED: 'STORAGE_KEY_LEARNED'
  },
  State: {
    NEW_WORD: 1,
    LEARNING: 2,
    LEARNED: 3
  }
}
