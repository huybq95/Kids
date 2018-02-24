import { SecureStore } from 'expo';

export function setTopic(topicObj) {
    SecureStore.setItemAsync(topicObj.title, JSON.stringify(topicObj))
        .then(() => console.log('Topic created !'))
        .catch(err => {
            console.log(`Can't create topic: `, err)
        })
}

export function addWordToTopic(topicTitle, wordObj) {
    SecureStore.getItemAsync(topicTitle)
    .then(topic => {
        topic.words.push(wordObj);
        setTopic(topic);
    }).catch(err => {
        console.log(`Can't get topic: `, err)
    })
}