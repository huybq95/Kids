
import initialState from './../../reducers/initialState';
export const settings = (state = initialState.settings, action) => {
    switch (action.type) {
        case 'SETTING_SAVE_SETTING':
            return {
                ...state,
                settings: action.payload
            };
        default:
            return state
    }
}
