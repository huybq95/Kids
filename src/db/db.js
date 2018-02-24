import Datastore from 'react-native-local-mongodb';

var db = new Datastore({ fileName: 'asyncStorageKey', autoLoad: true });

export function createSetting(setting) {
    db.insert(setting, (err, res) => {
        if (err) {
            console.log(`Can't not save setting: `, err)
        } else {
            console.log('Saved settings !')
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
    db.update({ id: 'setting' }, { $set: newSetting }, (err, res) => {
        if (err) {
            console.log('Cant save setting: ', err)
        } else {
            console.log('Save setting success')
        }
    })
}