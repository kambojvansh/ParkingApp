import {
    EMAIL_CHANGED,
    PASSWORD_CHANGED,
    LOGIN_USER_SUCCESS,
    LOADING,
    SIGNUP_USER_SUCCESS,
    NAME_CHANGED,
    NUMBER_CHANGED,
    LOGIN_USER_FAIL,
    GETNOTES,
    MODELSHOW,
    TITLE_CHANGED,
    NOTE_CHANGE,
    COLOR_MODEL_SHOW,
    SELECT_TEXT_COLOR,
    SLOT_CHANGED,
    ADDRESS_CHANGED,
    FEE_CHANGED
} from '../actions/types'
const INITIAL_STATE = {
    email: '',
    pass: '',
    user: null,
    isLoading: false,
    name: '',
    number: '',
    userArr: [{}],
    count: 0,
    ModelVisible: false,
    note: '',
    title: '',
    colorModelVisible: false,
    textColor: 'black',
    bookings: 0,
    NotCompleteNote: 0,
    address: null,
    slot: null,
    fee: null
}

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case EMAIL_CHANGED:
            return { ...state, email: action.payload }
        case PASSWORD_CHANGED:
            return { ...state, pass: action.payload }
        case NOTE_CHANGE:
            return { ...state, note: action.payload }
        case TITLE_CHANGED:
            return { ...state, title: action.payload }
        case NAME_CHANGED:
            return { ...state, name: action.payload }
        case NUMBER_CHANGED:
            return { ...state, number: action.payload }
        case ADDRESS_CHANGED:
            return { ...state, address: action.payload }
        case SLOT_CHANGED:
            return { ...state, slot: action.payload }
        case FEE_CHANGED:
            return { ...state, fee: action.payload }
        case LOGIN_USER_SUCCESS:
            return {
                ...state,
                user: action.payload,
                isLogin: true,
                isLoading: false,
                email: '',
                pass: '',
            }
        case SIGNUP_USER_SUCCESS:
            return {
                ...state,
                user: action.payload,
                isLoading: false,
            }
        case LOGIN_USER_FAIL:
            return {
                ...state,
                isLoading: false
            }
        case LOADING:
            return { ...state, isLoading: action.payload, title: '', note: "", textColor: 'black' }
        case GETNOTES:
            return {
                ...state, userArr: action.payload
            }
        case 'completeNote':
            return {
                ...state, bookings: action.payload
            }
        case MODELSHOW:
            return {
                ...state, ModelVisible: action.payload
            }
        case COLOR_MODEL_SHOW:
            return {
                ...state, colorModelVisible: action.payload
            }
        case SELECT_TEXT_COLOR:
            return {
                ...state, textColor: action.payload
            }
        case 'loadingShow':
            return {
                ...state, isLoading: action.payload
            }
        default:
            return state
    }

}