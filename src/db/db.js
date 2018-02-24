import Datastore from 'react-native-local-mongodb';

var db = new Datastore({ filename: 'myDB', autoload: true });
db.ensureIndex({ fieldName: 'title', unique: true, sparse: true });
db.ensureIndex({ fieldName: 'isFirstLaunchApp', unique: true, sparse: true });
db.ensureIndex({ fieldName: 'text', unique: true, sparse: true });

const setting = {
    isFirstLaunchApp: true,
    type: 'setting',
    isUpper: false,
    textColor: 'black',
    numsWord: 5,
    numsNewWord: 1,
    notification: true
}

const topic = {
    type: 'topic',
    title: 'Topic 1',
    words: [
        { type: 'word', text: 'Word 1', isCompleted: false, isLearning: false },
        { type: 'word', text: 'Word 2', isCompleted: false, isLearning: false },
        { type: 'word', text: 'Word 3', isCompleted: false, isLearning: false }
    ]
}

export function initData() {
    db.insert(settings, (err, res) => {
        if (err) {
            // console.log(`Can't not create setting: `, err)
        } else {
            // console.log('Created settings !')
        }
    });
    db.insert(topic, (err, res) => {
        if (err) {
            // console.log(`Can't not create topics: `, err)
        } else {
            // console.log('Created topics !')
        }
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

export function createTopic(topic, cb) {
    db.insert(topic, (err, res) => {
        if (err) {
            console.log(`Can't not create topic: `, err)
            cb && cb();
        } else {
            console.log('Topic created !')
        }
    })

    console.log(db.getAllData())
}

export function getListTopic(cb) {
    var topics = [];
    db.find({ type: 'topic' }, (err, res) => {
        if (err) {
            console.log('Cant get list topic: ', err)
        } else {
            topics = res;
            cb && cb(topics);
            // console.log(res)
        }
    })
}

export function getListWordOfTopic(title, cb) {
    var words = [];
    db.findOne({ type: 'topic', title: title }, (err, res) => {
        if (err) {
            console.log(`Cant get words by ${title}: `, err)
        } else {
            words = res.words;
            cb && cb(words)
        }
    })
}

export function createNewWord(topic, word, cb, cb1) {
    db.insert(word, (err, res) => {
        if (err) {
            console.log('Cant create new word: ', err)
            cb1 && cb1()
        } else {
            addWordToTopic(topic, word)
            cb && cb()
        }
    })
}

function addWordToTopic(topic, word) {
    db.update({ type: 'topic', title: topic }, { $push: { words: word } }, (err, res) => {
        if (err) {
            console.log('Cant add word to topic: ', err)
        }
        console.log(db.getAllData())
    })
}

export function getWords() {
    let _words = []
    db.find({ 'words.type': 'word' }, (err, res) => {
        if (err) {
            console.log('Cant get words')
        } else {
            res.forEach(topic => {
                topic.words.forEach(word => {
                    _words.push(word)
                })
            })

            console.log(_words);
        }
    })
}