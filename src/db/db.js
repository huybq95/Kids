import Datastore from 'react-native-local-mongodb';

console.log(Datastore);
var db = new Datastore({fileName: 'asyncStorageKey', autoLoad: true});

export function createSetting(objSetting) {
    db.insert(objSetting, (err, res) => {
        if (err) {
            console.log(`Can't not save setting: `, err)
        } else {
            console.log('Saved settings !')
        }
    })
}

export function getSetting() {
    db.find({id: 'setting'}, (err, res) => {
        if (err) {
            console.log('Cant get setting')
        } else {
            console.log(res)
        }
    })
}
