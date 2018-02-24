import Datastore from 'react-native-local-mongodb';

var db = new Datastore({ fileName: 'asyncStorageKey', autoLoad: true });

const setting = {
    type: 'setting',
    isUpper: true,
    textColor: 'black',
    numsWord: 5,
    numsNewWord: 1,
    notification: true
}

const topics = [
    {
        type: 'topic',
        title: 'Topic 1',
        words: [
            { text: 'Word 1', isCompleted: false, isLearning: false },
            { text: 'Word 2', isCompleted: false, isLearning: false },
            { text: 'Word 3', isCompleted: false, isLearning: false }
        ]
    }
]

export function initData() {
    db.insert(setting, (err, res) => {
        if (err) {
            console.log(`Can't not create setting: `, err)
        } else {
            console.log('Created settings !')
        }
    });

    db.insert(topics, (err, res) => {
        if (err) {
            console.log(`Can't not create topics: `, err)
        } else {
            console.log('Created topics !')
        }
    })
}

export function getSetting(cb) {
    db.findOne({ type: 'setting' }, (err, res) => {
        if (err) {
            console.log('Cant get setting')
        } else {
            cb && cb(res || {});
            console.log(res)
        }
    })
}


export function saveSetting(newSetting) {
    db.update({ type: 'setting' }, { $set: newSetting }, (err, res) => {
        if (err) {
            console.log('Cant save setting: ', err)
        } else {
            console.log('Save setting success', res);
            getSetting();
        }
    })
}

export function createTopic(topic) {
    db.insert(topic, (err, res) => {
        if (err) {
            console.log(`Can't not create topic: `, err)
        } else {
            console.log('Topic created !')
        }
    })
}

export function getListTopic(cb) {
    var topics = [];
    db.find({ type: 'topic' }, (err, res) => {
        if (err) {
            console.log('Cant get list topic: ', err)
        } else {
            topics = res;
            cb && cb(topics);
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

export function createNewWord(topic, word) {
    let wordObj = {};
    wordObj.text = word;
    wordObj.isCompleted = false;
    wordObj.isLearning = false;
    db.update({type: 'topic', title: topic}, { $push: { words: wordObj} }, (err, res) => {
        if (err) {
            console.log('Cant add new word: ', err)
        } else {
            console.log('Create new word success')
        }
    })
}