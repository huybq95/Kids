export function saveSetting(data) {
    return {
        type: 'SETTING_SAVE_SETTING',
        payload: data
    };
}