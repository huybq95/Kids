import Datastore from 'react-native-local-mongodb';

var db = new Datastore({ filename: 'myDatabase', autoload: true });
db.ensureIndex({ fieldName: 'isFirstLaunchApp', unique: true, sparse: true });
db.ensureIndex({ fieldName: 'text', unique: true, sparse: true });
db.ensureIndex({ fieldName: 'id', unique: true, sparse: true });
db.ensureIndex({ fieldName: 'id1', unique: true, sparse: true });

const setting = {
    isFirstLaunchApp: true,
    type: 'setting',
    isUpper: false,
    textColor: 'black',
    numsWord: 5,
    numsNewWord: 1,
    notification: true
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
    { id1: 'lesson', list: [] }
]

export function initData() {
    return new Promise((resolve, reject) => {
        db.insert(setting, (err, res) => {
            // console.log(err)
            // console.log(db.getAllData())
        });
        db.insert(words, (err, res) => {
            // console.log(err)
            // console.log(db.getAllData())
        });
    })
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

export function getAllTopic(title) {
    let topics = [];
    let _topics = []
    console.log(db.getAllData())
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
            // console.log(db.getAllData());
            if (err) {
                reject(err);
            } else {
                let words = res.sort((a, b) => {
                    // if (a.text > b.text) return 1;
                    // if (a.text < b.text) return -1;
                    // return 0;
                    return a.text.localeCompare(b.text)
                })
                resolve(words);
            }
        })
    })
}

export function getTodayLesson(numsWord) {
    // eg: 29
    let date = new Date().getDate();
    return new Promise((resolve, reject) => {
        db.find({ $and: [{ isCompleted: false }] }, (err, res) => {
            if (err) {
                reject(err);
            } else {
                let listWordsToLearn = []
                let words = res.sort((a, b) => {
                    return a.text.localeCompare(b.text)
                });

                for (let i = 0; i < numsWord; i++) {
                    const word = words[i];
                    listWordsToLearn.push(word);
                }
                console.log(db.getAllData())
                resolve(listWordsToLearn);
            }
        })
    })
}

export function saveHistory(lesson) {
    return new Promise((resolve, reject) => {
        db.insert(lesson, (err, res) => {
            if (err) {
                reject(err)
            } else {
                resolve(res)
            }
        });
    })
}

export function removeTopic(title) {
    return new Promise((resolve, reject) => {
        db.update({ id: 'topic' }, { $pull: { list: title } }, {}, () => {
            db.remove({ topic: title }, { multi: true }, (err, res) => {
                console.log(db.getAllData());
                resolve();
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
            console.log(db.getAllData());
            resolve();
            reject();
        })
    })
}

export function updateWord(word) {
    return new Promise((resolve, reject) => {
        db.update({ _id: word._id }, { $set: { text: word.text } }, (err, res) => {
            console.log(db.getAllData());
            resolve(res);
            reject(err);
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