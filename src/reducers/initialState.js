import moment from 'moment';

export default {
    settings: {
        isUpperCase: false,
        textColor: 'black',
        wordCount: '5',
        newCount: '1',
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
}