import Datastore from 'react-native-local-mongodb';

var db = new Datastore({ fileName: 'asyncStorageKey', autoLoad: true });

const setting = {
    type: 'setting',
    isUpper: false,
    textColor: 'red',
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

export function getSetting() {
    db.find({ id: 'setting' }, (err, res) => {
        if (err) {
            console.log('Cant get setting')
        } else {
            console.log(res)
        }
    })
}


export function saveSetting() {
    let newSetting = {
        isUpper: true,
        textColor: 'black',
        numsWord: 5,
        numsNewWord: 1,
        notification: true
    }
    db.update({ type: 'setting' }, { $set: newSetting }, (err, res) => {
        if (err) {
            console.log('Cant save setting: ', err)
        } else {
            console.log('Save setting success')
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
            console.log('TOPIC: ', res)
            topics = res;
            cb && cb(topics);
        }
    })
}