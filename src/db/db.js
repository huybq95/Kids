import Datastore from 'react-native-local-mongodb'
import moment from 'moment'
import * as utils from '../utils'
import Constants from '../constants/Constants'
import { Alert } from 'react-native'
import { initialState } from '../stores/setting/reducer'

var db = new Datastore({ filename: 'myDatabase', autoload: true })
db.ensureIndex({ fieldName: 'isFirstLaunchApp', unique: true, sparse: true })
db.ensureIndex({ fieldName: 'key', unique: true, sparse: true })
db.ensureIndex({ fieldName: 'id', unique: true, sparse: true })
db.ensureIndex({ fieldName: 'id1', unique: true, sparse: true })
db.ensureIndex({ fieldName: 'timeCompleted', unique: true, sparse: true })
db.ensureIndex({ fieldName: 'alerts', unique: true, sparse: true })

const words = [
  {
    type: 'word',
    topic: 'Màu sắc',
    lesson: null,
    text: 'xanh lá',
    key: 'Màu sắc xanh lá',
    state: Constants.State.NEW_WORD,
    updated: new Date().getTime()
  },
  {
    type: 'word',
    topic: 'Màu sắc',
    lesson: null,
    text: 'đỏ',
    key: 'Màu sắc đỏ',
    state: Constants.State.NEW_WORD,
    updated: new Date().getTime()
  },
  {
    type: 'word',
    topic: 'Màu sắc',
    lesson: null,
    text: 'tím',
    key: 'Màu sắc tím',
    state: Constants.State.NEW_WORD,
    updated: new Date().getTime()
  },
  {
    type: 'word',
    topic: 'Màu sắc',
    lesson: null,
    text: 'vàng',
    key: 'Màu sắc vàng',
    state: Constants.State.NEW_WORD,
    updated: new Date().getTime()
  },
  {
    type: 'word',
    topic: 'Màu sắc',
    lesson: null,
    text: 'nâu',
    key: 'Màu sắc nâu',
    state: Constants.State.NEW_WORD,
    updated: new Date().getTime()
  },
  {
    type: 'word',
    topic: 'Màu sắc',
    lesson: null,
    text: 'đen',
    key: 'Màu sắc đen',
    state: Constants.State.NEW_WORD,
    updated: new Date().getTime()
  },
  {
    type: 'word',
    topic: 'Màu sắc',
    lesson: null,
    text: 'trắng',
    key: 'Màu sắc trắng',
    state: Constants.State.NEW_WORD,
    updated: new Date().getTime()
  },
  {
    type: 'word',
    topic: 'Màu sắc',
    lesson: null,
    text: 'hồng',
    key: 'Màu sắc hồng',
    state: Constants.State.NEW_WORD,
    updated: new Date().getTime()
  },
  {
    type: 'word',
    topic: 'Màu sắc',
    lesson: null,
    text: 'ghi',
    key: 'Màu sắc ghi',
    state: Constants.State.NEW_WORD,
    updated: new Date().getTime()
  },

  {
    type: 'word',
    topic: 'Động vật',
    lesson: null,
    text: 'chó',
    key: 'Động vật chó',
    state: Constants.State.NEW_WORD,
    updated: new Date().getTime()
  },
  {
    type: 'word',
    topic: 'Động vật',
    lesson: null,
    text: 'mèo',
    key: 'Động vật mèo',
    state: Constants.State.NEW_WORD,
    updated: new Date().getTime()
  },
  {
    type: 'word',
    topic: 'Động vật',
    lesson: null,
    text: 'lợn',
    key: 'Động vật lợn',
    state: Constants.State.NEW_WORD,
    updated: new Date().getTime()
  },
  {
    type: 'word',
    topic: 'Động vật',
    lesson: null,
    text: 'gà',
    key: 'Động vật gà',
    state: Constants.State.NEW_WORD,
    updated: new Date().getTime()
  },
  {
    type: 'word',
    topic: 'Động vật',
    lesson: null,
    text: 'dê',
    key: 'Động vật dê',
    state: Constants.State.NEW_WORD,
    updated: new Date().getTime()
  },
  {
    type: 'word',
    topic: 'Động vật',
    lesson: null,
    text: 'rồng',
    key: 'Động vật rồng',
    state: Constants.State.NEW_WORD,
    updated: new Date().getTime()
  },
  {
    type: 'word',
    topic: 'Động vật',
    lesson: null,
    text: 'chuột',
    key: 'Động vật chuột',
    state: Constants.State.NEW_WORD,
    updated: new Date().getTime()
  },
  {
    type: 'word',
    topic: 'Động vật',
    lesson: null,
    text: 'trâu',
    key: 'Động vật trâu',
    state: Constants.State.NEW_WORD,
    updated: new Date().getTime()
  },
  {
    type: 'word',
    topic: 'Động vật',
    lesson: null,
    text: 'ngựa',
    key: 'Động vật ngựa',
    state: Constants.State.NEW_WORD,
    updated: new Date().getTime()
  },
  {
    type: 'word',
    topic: 'Động vật',
    lesson: null,
    text: 'khỉ',
    key: 'Động vật khỉ',
    state: Constants.State.NEW_WORD,
    updated: new Date().getTime()
  },

  {
    type: 'word',
    topic: 'Hành động',
    lesson: null,
    text: 'đi',
    key: 'Hành động đi',
    state: Constants.State.NEW_WORD,
    updated: new Date().getTime()
  },
  {
    type: 'word',
    topic: 'Hành động',
    lesson: null,
    text: 'chạy',
    key: 'Hành động chạy',
    state: Constants.State.NEW_WORD,
    updated: new Date().getTime()
  },
  {
    type: 'word',
    topic: 'Hành động',
    lesson: null,
    text: 'ngủ',
    key: 'Hành động ngủ',
    state: Constants.State.NEW_WORD,
    updated: new Date().getTime()
  },
  {
    type: 'word',
    topic: 'Hành động',
    lesson: null,
    text: 'bò',
    key: 'Hành động bò',
    state: Constants.State.NEW_WORD,
    updated: new Date().getTime()
  },
  {
    type: 'word',
    topic: 'Hành động',
    lesson: null,
    text: 'ngồi',
    key: 'Hành động ngồi',
    state: Constants.State.NEW_WORD,
    updated: new Date().getTime()
  },
  {
    type: 'word',
    topic: 'Hành động',
    lesson: null,
    text: 'đứng',
    key: 'Hành động đứng',
    state: Constants.State.NEW_WORD,
    updated: new Date().getTime()
  },
  {
    type: 'word',
    topic: 'Hành động',
    lesson: null,
    text: 'trèo',
    key: 'Hành động trèo',
    state: Constants.State.NEW_WORD,
    updated: new Date().getTime()
  },
  {
    type: 'word',
    topic: 'Hành động',
    lesson: null,
    text: 'đấm',
    key: 'Hành động đấm',
    state: Constants.State.NEW_WORD,
    updated: new Date().getTime()
  },
  {
    type: 'word',
    topic: 'Hành động',
    lesson: null,
    text: 'đá',
    key: 'Hành động đá',
    state: Constants.State.NEW_WORD,
    updated: new Date().getTime()
  },
  {
    type: 'word',
    topic: 'Hành động',
    lesson: null,
    text: 'nhảy',
    key: 'Hành động nhảy',
    state: Constants.State.NEW_WORD,
    updated: new Date().getTime()
  },
  {
    type: 'word',
    topic: 'Hành động',
    lesson: null,
    text: 'lăn',
    key: 'Hành động lăn',
    state: Constants.State.NEW_WORD,
    updated: new Date().getTime()
  },

  { id: 'topic', list: ['Màu sắc', 'Động vật', 'Hành động'] }
  // { id1: 'lesson', list: [] },
  // { history: []}
]

export function initData() {
  //initialState is initialState of setting
  db.insert(initialState, (err, res) => {})
  db.insert(words, (err, res) => {})
}

export function getSetting() {
  return new Promise((resolve, reject) => {
    db.findOne({ type: 'setting' }, (err, res) => {
      if (err) {
        reject(err)
      } else {
        resolve(res)
      }
    })
  })
}

export function saveSetting(newSetting) {
  return new Promise((resolve, reject) => {
    db.update({ type: 'setting' }, { $set: newSetting }, (err, res) => {
      if (err) {
        reject(err)
      } else {
        resolve(res)
      }
    })
  })
}

export function countIsLearning() {
  return new Promise((resolve, reject) => {
    db.count({ isLearning: true }, (err, res) => {
      if (err) {
        reject(0)
      } else {
        resolve(res)
      }
    })
  })
}

export async function getAllTopic() {
  let _topics = []
  let topicList = await findOne({ id: 'topic' })
  let allWords = await getAllWords({ topic: { $in: topicList.list } })
  topicList.list.forEach(topic => {
    let currentTopic = {
      title: topic,
      words: allWords.filter(e => e.topic == topic)
    }
    _topics.push(currentTopic)
  })
  return _topics
}

export function getWordsOfTopic(title) {
  return new Promise((resolve, reject) => {
    db.find({ topic: title }, (err, res) => {
      if (err) {
        reject(err)
      } else {
        let words = res.sort((a, b) => {
          return a.text.localeCompare(b.text)
        })
        resolve(words)
      }
    })
  })
}

export function resetStateIsLearning(words) {
  return new Promise((resolve, reject) => {
    let listLearning = []
    for (let i = 0; i < words.length; i++) {
      const word = words[i]
      listLearning.push(word.text)
    }
    db.find(
      { $and: [{ type: 'word' }, { text: { $nin: listLearning } }] },
      (err, res) => {
        if (err) {
          // console.log()
        } else {
          for (let i = 0; i < res.length; i++) {
            const wordNotLearning = res[i]
            db.update(
              { _id: wordNotLearning._id },
              { $set: { state: Constants.State.NEW_WORD } },
              (err, res) => {
                if (err) {
                  reject(err)
                } else {
                  // resolve(res)
                  db.find(
                    {
                      $and: [{ type: 'word' }, { text: { $in: listLearning } }]
                    },
                    (err, res) => {
                      if (err) {
                        reject(err)
                      } else {
                        for (let i = 0; i < res.length; i++) {
                          const wordIsLearning = res[i]
                          db.update(
                            { _id: wordIsLearning._id },
                            { $set: { isLearning: true } },
                            (err, res) => {
                              if (err) {
                                reject(err)
                              } else {
                                resolve(res)
                              }
                            }
                          )
                        }
                      }
                    }
                  )
                }
              }
            )
          }
        }
      }
    )
  })
}

export function getTodayLesson(numsWord) {
  return new Promise((resolve, reject) => {
    db.find({ state: Constants.State.LEARNING }, (err, res) => {
      if (err) {
      } else {
        //res: words isLearning and not complete
        console.log('gettodaylesson1 ', res, numsWord)
        if (res.length === 0) {
          let listWordsLearning = []
          getAllWords().then(words => {
            for (let i = 0; i < numsWord; i++) {
              const wordLearning = words[i]
              listWordsLearning.push(wordLearning)
              db.update(
                { _id: wordLearning._id },
                { $set: { isLearning: true } }
              )
            }
            resetStateIsLearning(listWordsLearning).then(() => {
              resolve(listWordsLearning)
            })
          })
        } else if (res.length < numsWord) {
          console.log('res len < numwords ')
          let listWordsLearning = []
          getAllWords().then(words => {
            for (let i = 0; i < numsWord; i++) {
              const wordLearning = words[i]
              listWordsLearning.push(wordLearning)
              db.update(
                { _id: wordLearning._id },
                { $set: { isLearning: true } }
              )
            }
            resetStateIsLearning(listWordsLearning).then(() => {
              resolve(listWordsLearning)
            })
          })
        } else if (res.length > numsWord) {
          let listWordsLearning = []
          getAllWords().then(words => {
            for (let i = 0; i < numsWord; i++) {
              const wordLearning = words[i]
              listWordsLearning.push(wordLearning)
              db.update(
                { _id: wordLearning._id },
                { $set: { isLearning: true } }
              )
            }
            resetStateIsLearning(listWordsLearning).then(() => {
              resolve(listWordsLearning)
            })
          })
        } else {
          resetStateIsLearning(res).then(() => {
            resolve(res)
          })
        }
      }
    })
  })
}

export function find(query) {
  return new Promise((resolve, reject) => {
    db.find(query, (err, docs) => {
      if (err) resolve({ err })
      else resolve(docs)
    })
  })
}

export function findOne(query) {
  return new Promise((resolve, reject) => {
    db.findOne(query, (err, docs) => {
      if (err) resolve({ err })
      else resolve(docs)
    })
  })
}

export function insert(query) {
  return new Promise((resolve, reject) => {
    db.insert(query, (err, docs) => {
      if (err) resolve({ err })
      else resolve(docs)
    })
  })
}

export function update(query, update, option = {}) {
  return new Promise((resolve, reject) => {
    db.update(query, update, option, (err, num) => {
      if (err) resolve({ err })
      else resolve(num)
    })
  })
}

export async function getTodayLesson1(numsWord, newCount) {
  //find all history
  let learningWords = await find({ state: Constants.State.LEARNING })
  let allLessons = await getHistory()
  if (allLessons.length > 0) {
    //find if today lesson created?
    let today = utils.getCurrentDate()
    let todayLesson = allLessons.find(item => item.timeCompleted === today)
    if (todayLesson) {
      //lesson created
      return todayLesson.words
    } else {
      //check if last lesson done?
      let lastLesson = allLessons[allLessons.length - 1]
      if (!lastLesson.done) {
        //learn last lesson again
        await saveHistory(lastLesson.words, false)
        return lastLesson.words
      }
    }
  }

  //if lesson not avaiable, create new lesson: find learning word
  let unlearnWords = await getAllWords({ state: Constants.State.NEW_WORD })
  //shuffle before
  unlearnWords.sort(() => Math.random() - 0.5)

  //first time run app, no learning words
  //find random 5 words
  if (learningWords.length === 0) {
    if (unlearnWords.length >= newCount) {
      //get 5 random
      unlearnWords = unlearnWords.slice(0, numsWord)
      //save to history
      await saveHistory(unlearnWords, false)
      return unlearnWords
    } else {
      console.log('error1')
    }
  } else {
    //create new lesson
    let lastWord = learningWords.pop()
    //set lastword to state LEARNED
    await updateWord(lastWord._id, {
      $set: { state: Constants.State.LEARNED }
    })
    //add new words
    //get 5 random
    unlearnWords = unlearnWords.slice(0, newCount)
    learningWords.unshift(...unlearnWords)
    await saveHistory(learningWords, false)
    return learningWords
  }
}

export function getMausacden() {
  return new Promise((resolve, reject) => {
    // db.find({})
  })
}

export async function toggleLearned(wordId) {
  await update({ _id: wordId }, { $set: { state: Constants.State.LEARNING } })
}

export function toggleIsLearning(word) {
  return new Promise((resolve, reject) => {
    db.update(
      { _id: word._id },
      { $set: { isLearning: !word.isLearning } },
      (err, res) => {
        if (err) {
          reject(err)
        } else {
          resolve(res)
        }
      }
    )
  })
}

export async function getAllWords(query) {
  return await find({ type: 'word', ...query })
}

export async function saveHistory(words, done) {
  let history = {
    words: words.map(item => item._id),
    type: 'history',
    timeCompleted: utils.getCurrentDate(),
    done: false
  }
  await insert(history)
  if (!done)
    await update(
      { _id: { $in: words.map(i => i._id) } },
      { $set: { state: Constants.State.LEARNING } },
      { multi: true }
    )
}

export function updateHistory(timeCompleted) {
  return new Promise((resolve, reject) => {
    db.findOne({ timeCompleted }, (err, lessonInHistory) => {
      if (lessonInHistory) {
        db.update({ timeCompleted }, { $set: { done: true } }, {}, err =>
          resolve()
        )
      } else {
        console.log('error 2')
      }
    })
  })
}

export function editLesson(lesson) {
  return new Promise((resolve, reject) => {
    db.update({ _id: lesson._id }, { $set: lesson }, (err, res) => {
      if (err) {
        reject(err)
      } else {
        resolve()
      }
    })
  })
}

export function removeTopic(title) {
  return new Promise((resolve, reject) => {
    db.update({ id: 'topic' }, { $pull: { list: title } }, {}, () => {
      db.remove({ topic: title }, { multi: true }, (err, res) => {
        if (err) {
          reject(err)
        } else {
          resolve(res)
        }
      })
    })
  })
}

export function createNewWord(word) {
  return new Promise((resolve, reject) => {
    db.insert(word, (err, res) => {
      if (err) {
        reject(err)
      } else {
        resolve(res)
      }
    })
  })
}

export function createTopic(title) {
  return new Promise((resolve, reject) => {
    db.update({ id: 'topic' }, { $push: { list: `${title}` } }, (err, res) => {
      if (err) {
        reject(err)
      } else {
        resolve(res)
      }
    })
  })
}

export function updateWord(_id, updateQuery) {
  return new Promise((resolve, reject) => {
    db.update({ _id }, updateQuery, (err, res) => {
      if (err) {
        reject(err)
      } else {
        resolve(res)
      }
    })
  })
}

export function removeWord(word) {
  return new Promise((resolve, reject) => {
    db.remove({ _id: word._id }, (err, res) => {
      if (err) {
        reject(err)
      } else {
        resolve(res)
      }
    })
  })
}

export async function getHistory(query) {
  let lessonList = await find({ type: 'history', ...query })
  if (lessonList.err) {
    console.log(lessonList.err)
  } else {
    let promiseList = []
    for (let j in lessonList) {
      let words = await find({ _id: { $in: lessonList[j].words } })
      for (let i in lessonList[j].words) {
        lessonList[j].words[i] = words.find(
          item => item._id === lessonList[j].words[i]
        )
      }
    }
    return lessonList
  }
}

export async function getListWordByListId(listId) {
  let words = await find({ _id: { $in: listId } })
  let result = []
  for (let i in listId) {
    result.push(words.find(item => item._id === listId[i]))
  }
  return result
}

function alert(err) {
  console.log(err)
  Alert.alert('Error', JSON.stringify(err))
}

export async function updateLearningWord(updateList, toState) {
  await update(
    { _id: { $in: updateList } },
    { $set: { state: toState } },
    { multi: true }
  )
}

export async function updateWordLesson(timeCompleted, wordListId) {
  await update(
    { timeCompleted, type: 'history' },
    { $set: { words: wordListId } }
  )
}
