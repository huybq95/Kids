
import initialState from './../../reducers/initialState';
export const settings = (state = initialState.settings, action) => {
    switch (action.type) {
        case 'SETTING_SAVE_SETTING':
            const newSetting = action.payload;
            return {
                ...state,
                isUpperCase: newSetting.isUpperCase,
                textColor: newSetting.textColor,
                wordCount: newSetting.wordCount,
                newCount: newSetting.newCount,
                isAlert: newSetting.isAlert
            };
        default:
            return state
    }
}
