import { APP_BACKGROUND_THEME } from '~/constants/actionTypes';

const INITIAL_STATE = [
    {
        type: 'appBackgroundTheme',
        id: 'none'
    }
];


const updateAppBackgroundTheme = (state, action) => {
    return state.map(item =>
    item.type === 'appBackgroundTheme'
        ? Object.assign({}, item, { id: action.state.id })
        : item
    );
}

function crustReducer(state = INITIAL_STATE, action) {
    switch (action.type) {
        case APP_BACKGROUND_THEME: {
            return updateAppBackgroundTheme(state, action);
        }
        default: return state;
    }
}

export default crustReducer;