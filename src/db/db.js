import Datastore from 'react-native-local-mongodb';

var db = new Datastore({ filename: 'myDB', autoload: true });
db.ensureIndex({ fieldName: 'isFirstLaunchApp', unique: true, sparse: true });
db.ensureIndex({ fieldName: 'text', unique: true, sparse: true });
db.ensureIndex({ fieldName: 'id', unique: true, sparse: true });

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
    { type: 'word', topic: 'Màu sắc', lesson: null, text: 'Cam', isCompleted: false, isLearning: false },
    { type: 'word', topic: 'Màu sắc', lesson: null, text: 'Xanh lá', isCompleted: false, isLearning: false },
    { type: 'word', topic: 'Màu sắc', lesson: null, text: 'Đỏ', isCompleted: false, isLearning: false },
    { type: 'word', topic: 'Màu sắc', lesson: null, text: 'Đen', isCompleted: false, isLearning: false },
    { type: 'word', topic: 'Màu sắc', lesson: null, text: 'Tím', isCompleted: false, isLearning: false },
    { type: 'word', topic: 'null', lesson: null, text: 'undefined', isCompleted: false, isLearning: false },
    { id: 'topic', list: ['Màu sắc', 'null'] },
    { id: 'lesson', list: [] }
]

export function initData() {
    return new Promise((resolve, reject) => {
        db.insert([setting, words], (err, res) => {
            if (err) {
                reject(err)
            } else {
                resolve(true)
            }
        });
    })
}

export function getSetting(cb) {
    db.findOne({ type: 'setting' }, (err, res) => {
        if (err) {
            console.log('Cant get setting')
        } else {
            cb && cb(res || {});
        }
    })
}


export function saveSetting(newSetting) {
    db.update({ type: 'setting' }, { $set: newSetting }, (err, res) => {
        if (err) {
            console.log('Cant save setting: ', err)
        } else {
            console.log('Save setting success', res);
        }
    })
}

export function getAllTopic(title) {
    let topics = [];
    let _topics = []
    return new Promise((resolve, reject) => {
        db.findOne({ id: 'topic' }, (err, res) => {
            if (res.list.length === 0) {
                reject();
            }
            topics = res ? res.list : [];
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

export function getTopic(title) {
    return new Promise((resolve, reject) => {
        db.find({topic: title}, (err, res) => {
            resolve(res);
            reject(err);
        })
    })
}

export function removeTopic(title) {
    return new Promise((resolve, reject) => {
        db.update({id: 'topic'}, {$pull: {list: title}}, {}, () => {
            db.remove({topic: title}, { multi: true }, (err, res) => {
                console.log(db.getAllData());
                resolve();
            });
        })
    })
}