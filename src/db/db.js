import Datastore from 'react-native-local-mongodb';
import moment from 'moment';

var db = new Datastore({ filename: 'myDatabase', autoload: true });
db.ensureIndex({ fieldName: 'isFirstLaunchApp', unique: true, sparse: true });
db.ensureIndex({ fieldName: 'text', unique: true, sparse: true });
db.ensureIndex({ fieldName: 'id', unique: true, sparse: true });
db.ensureIndex({ fieldName: 'id1', unique: true, sparse: true });
db.ensureIndex({ fieldName: 'timeCompleted', unique: true, sparse: true });
db.ensureIndex({ fieldName: 'alerts', unique: true, sparse: true });


const setting = {
    isFirstLaunchApp: true,
    type: 'setting',
    isUpper: false,
    textColor: 'black',
    numsWord: 5,
    numsNewWord: 1,
    notification: true,
    isAlert: false,
    isManual: true,
    timeShow: 3000,
    alerts: [
        {
            time: moment(new Date().getTime() + 60000).format('HH:mm'),
            title: 'Nhắc nhở',
            body: 'Lần 1',
        },
        {
            time: moment(new Date().getTime() + 120000).format('HH:mm'),
            title: 'Nhắc nhở',
            body: 'Lần 2',
        },
        {
            time: moment(new Date().getTime() + 180000).format('HH:mm'),
            title: 'Nhắc nhở',
            body: 'Lần 3',
        }
    ]
}

const words = [
    { type: 'word', topic: 'Màu sắc', lesson: null, text: 'xanh lá', isCompleted: false, isLearning: false, updated: new Date().getTime() },
    { type: 'word', topic: 'Màu sắc', lesson: null, text: 'đỏ', isCompleted: false, isLearning: false, updated: new Date().getTime() },
    { type: 'word', topic: 'Màu sắc', lesson: null, text: 'tím', isCompleted: false, isLearning: false, updated: new Date().getTime() },
    { type: 'word', topic: 'Màu sắc', lesson: null, text: 'vàng', isCompleted: false, isLearning: false, updated: new Date().getTime() },
    { type: 'word', topic: 'Màu sắc', lesson: null, text: 'nâu', isCompleted: false, isLearning: false, updated: new Date().getTime() },
    { type: 'word', topic: 'Màu sắc', lesson: null, text: 'đen', isCompleted: false, isLearning: false, updated: new Date().getTime() },
    { type: 'word', topic: 'Màu sắc', lesson: null, text: 'trắng', isCompleted: false, isLearning: false, updated: new Date().getTime() },
    { type: 'word', topic: 'Màu sắc', lesson: null, text: 'hồng', isCompleted: false, isLearning: false, updated: new Date().getTime() },
    { type: 'word', topic: 'Màu sắc', lesson: null, text: 'ghi', isCompleted: false, isLearning: false, updated: new Date().getTime() },

    { type: 'word', topic: 'Động vật', lesson: null, text: 'chó', isCompleted: false, isLearning: false, updated: new Date().getTime() },
    { type: 'word', topic: 'Động vật', lesson: null, text: 'mèo', isCompleted: false, isLearning: false, updated: new Date().getTime() },
    { type: 'word', topic: 'Động vật', lesson: null, text: 'lợn', isCompleted: false, isLearning: false, updated: new Date().getTime() },
    { type: 'word', topic: 'Động vật', lesson: null, text: 'gà', isCompleted: false, isLearning: false, updated: new Date().getTime() },
    { type: 'word', topic: 'Động vật', lesson: null, text: 'dê', isCompleted: false, isLearning: false, updated: new Date().getTime() },
    { type: 'word', topic: 'Động vật', lesson: null, text: 'rồng', isCompleted: false, isLearning: false, updated: new Date().getTime() },
    { type: 'word', topic: 'Động vật', lesson: null, text: 'chuột', isCompleted: false, isLearning: false, updated: new Date().getTime() },
    { type: 'word', topic: 'Động vật', lesson: null, text: 'trâu', isCompleted: false, isLearning: false, updated: new Date().getTime() },
    { type: 'word', topic: 'Động vật', lesson: null, text: 'ngựa', isCompleted: false, isLearning: false, updated: new Date().getTime() },
    { type: 'word', topic: 'Động vật', lesson: null, text: 'khỉ', isCompleted: false, isLearning: false, updated: new Date().getTime() },

    { type: 'word', topic: 'Hành động', lesson: null, text: 'đi', isCompleted: false, isLearning: false, updated: new Date().getTime() },
    { type: 'word', topic: 'Hành động', lesson: null, text: 'chạy', isCompleted: false, isLearning: false, updated: new Date().getTime() },
    { type: 'word', topic: 'Hành động', lesson: null, text: 'ngủ', isCompleted: false, isLearning: false, updated: new Date().getTime() },
    { type: 'word', topic: 'Hành động', lesson: null, text: 'bò', isCompleted: false, isLearning: false, updated: new Date().getTime() },
    { type: 'word', topic: 'Hành động', lesson: null, text: 'ngồi', isCompleted: false, isLearning: false, updated: new Date().getTime() },
    { type: 'word', topic: 'Hành động', lesson: null, text: 'đứng', isCompleted: false, isLearning: false, updated: new Date().getTime() },
    { type: 'word', topic: 'Hành động', lesson: null, text: 'trèo', isCompleted: false, isLearning: false, updated: new Date().getTime() },
    { type: 'word', topic: 'Hành động', lesson: null, text: 'đấm', isCompleted: false, isLearning: false, updated: new Date().getTime() },
    { type: 'word', topic: 'Hành động', lesson: null, text: 'đá', isCompleted: false, isLearning: false, updated: new Date().getTime() },
    { type: 'word', topic: 'Hành động', lesson: null, text: 'nhảy', isCompleted: false, isLearning: false, updated: new Date().getTime() },
    { type: 'word', topic: 'Hành động', lesson: null, text: 'lăn', isCompleted: false, isLearning: false, updated: new Date().getTime() },

    { id: 'topic', list: ['Màu sắc', 'Động vật', 'Hành động'] },
    // { id1: 'lesson', list: [] },
    // { history: []}
]

export function initData() {
    // return new Promise((resolve, reject) => {
    db.insert(setting, (err, res) => {
    });
    db.insert(words, (err, res) => {
    });
    // })
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
                resolve(res);
            }
        })
    })
}

export function getAllTopic() {
    let topics = [];
    let _topics = []
    return new Promise((resolve, reject) => {
        db.findOne({ id: 'topic' }, (err, res) => {
            if (res.list.length === 0) {
                reject();
            }
            topics = res.list || [];
            db.find({ topic: { $in: res.list } }, (err, res) => {
                topics.forEach(topic => {
                    let currentTopic = {}
                    currentTopic.title = topic;
                    currentTopic.words = [];
                    currentTopic.words = res.filter(e => {
                        return e.topic == topic;
                    })
                    _topics.push(currentTopic);
                    resolve(_topics);
                    reject(err);
                });
            })
        })
    })
}

export function getWordsOfTopic(title) {
    return new Promise((resolve, reject) => {
        db.find({ topic: title }, (err, res) => {
            if (err) {
                reject(err);
            } else {
                let words = res.sort((a, b) => {
                    return a.text.localeCompare(b.text)
                })
                console.log(db.getAllData())
                resolve(words);
            }
        })
    })
}

export function resetStateIsLearning(words) {
    return new Promise((resolve, reject) => {
        let listLearning = [];
        for (let i = 0; i < words.length; i++) {
            const word = words[i];
            listLearning.push(word.text)
        }
        console.log(listLearning)
        db.find({ $and: [{ type: 'word' }, { text: { $nin: listLearning } }] }, (err, res) => {
            if (err) {
                // console.log()
            } else {
                console.log(res)
                for (let i = 0; i < res.length; i++) {
                    const wordNotLearning = res[i];
                    db.update({ _id: wordNotLearning._id }, { $set: { isLearning: false } }, (err, res) => {
                        if (err) {
                            reject(err)
                        } else {
                            // resolve(res)
                            db.find({ $and: [{ type: 'word' }, { text: { $in: listLearning } }] }, (err, res) => {
                                if (err) {
                                    reject(err)
                                } else {
                                    for (let i = 0; i < res.length; i++) {
                                        const wordIsLearning = res[i];
                                        db.update({ _id: wordIsLearning._id }, { $set: { isLearning: true } }, (err, res) => {
                                            if (err) {
                                                reject(err)
                                            } else {
                                                resolve(res)
                                            }
                                        })
                                    }
                                }
                            })
                        }
                    })
                }
            }
        })
    })
}

export function getTodayLesson(numsWord) {
    return new Promise((resolve, reject) => {
        db.find({$and: [{ isLearning: true }, {isCompleted: false}]}, (err, res) => {
            if (err) {
            } else {
                if (res.length === 0) {
                    let listWordsLearning = [];
                    getAllWords().then(words => {
                        for (let i = 0; i < numsWord; i++) {
                            const wordLearning = words[i];
                            listWordsLearning.push(wordLearning);
                            db.update({ _id: wordLearning._id }, { $set: { isLearning: true } })
                        }
                        resetStateIsLearning(listWordsLearning).then(() => {
                            resolve(listWordsLearning);
                        })
                    })
                } else if (res.length < numsWord) {
                    let listWordsLearning = [];
                    getAllWords().then(words => {
                        for (let i = 0; i < numsWord; i++) {
                            const wordLearning = words[i];
                            listWordsLearning.push(wordLearning);
                            db.update({ _id: wordLearning._id }, { $set: { isLearning: true } })
                        }
                        resetStateIsLearning(listWordsLearning).then(() => {
                            resolve(listWordsLearning);
                        })
                    })
                } else if (res.length > numsWord) {
                    let listWordsLearning = [];
                    getAllWords().then(words => {
                        for (let i = 0; i < numsWord; i++) {
                            const wordLearning = words[i];
                            listWordsLearning.push(wordLearning);
                            db.update({ _id: wordLearning._id }, { $set: { isLearning: true } })
                        }
                        resetStateIsLearning(listWordsLearning).then(() => {
                            resolve(listWordsLearning);
                        })
                    })
                } else {
                    resetStateIsLearning(res).then(() => {
                        resolve(res);
                    })
                }
            }
        })
    })
}

export function toggleIsComplete(word) {
    return new Promise((resolve, reject) => {
        db.update({ _id: word._id }, { $set: { isCompleted: !word.isCompleted } }, (err, res) => {
            if (err) {
                reject(err)
            } else {
                db.update({ _id: word._id }, { $set: { isLearning: true } }, (err, res) => {
                    if (err) {
                        reject(err)
                    } else {
                        resolve(res)
                    }
                })
            }
        })
    })
}

export function toggleIsLearning(word) {
    return new Promise((resolve, reject) => {
        db.update({ _id: word._id }, { $set: { isLearning: !word.isLearning } }, (err, res) => {
            if (err) {
                reject(err)
            } else {
                resolve(res)
            }
        })
    })
}

export function getAllWords() {
    return new Promise((resolve, reject) => {
        db.find({ type: 'word' }, (err, res) => {
            if (err) {
                reject(err)
            } else {
                resolve(res)
            }
        })
    })
}

export function saveHistory(words, numsNewWord) {
    return new Promise((resolve, reject) => {
        let history = {};
        history.words = words
        history.type = 'history';
        history.timeCompleted = moment(new Date().getTime()).format('DD MMM YYYY');
        db.insert(history, (err, res) => {
            if (err) {
                reject(err)
            } else {
                for (let i = 0; i < numsNewWord; i++) {
                    let word = history.words[i];
                    db.update({ _id: word._id }, { $set: { isCompleted: true } })
                    db.update({ _id: word._id }, { $set: { isLearning: false } })
                }
            }
        });
    })
}

export function editLesson(lesson) {
    return new Promise((resolve, reject) => {
        db.update({ _id: lesson._id }, { $set: lesson }, (err, res) => {
            if (err) {
                reject(err)
            } else {
                console.log('Updated !')
                resolve();
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
            });
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

export function updateWord(word) {
    return new Promise((resolve, reject) => {
        db.update({ _id: word._id }, { $set: { text: word.text } }, (err, res) => {
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

export function getHistory() {
    return new Promise((resolve, reject) => {
        db.find({ type: 'history' }, (err, res) => {
            if (err) {
                reject(err);
            } else {
                resolve(res);
            }
        })
    })
}