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
    FEE_CHANGED,
    errEmail_CHANGED,
    errAdd_CHANGED,
    errFee_CHANGED,
    errName_CHANGED,
    errPass_CHANGED,
    errPhone_CHANGED,
    errSlot_CHANGED
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
    fee: null,
    errEmail: '',
    errPass: '',
    errName: '',
    errPhone: '',
    errAdd: '',
    errSlot: '',
    errFee: ''
}

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case EMAIL_CHANGED:
            return { ...state, email: action.payload, errEmail: '' }
        case PASSWORD_CHANGED:
            return { ...state, pass: action.payload, errPass: '' }
        case NOTE_CHANGE:
            return { ...state, note: action.payload }
        case TITLE_CHANGED:
            return { ...state, title: action.payload }
        case NAME_CHANGED:
            return { ...state, name: action.payload, errName: '' }
        case NUMBER_CHANGED:
            return { ...state, number: action.payload, errPhone: '' }
        case ADDRESS_CHANGED:
            return { ...state, address: action.payload, errAdd: '' }
        case SLOT_CHANGED:
            return { ...state, slot: action.payload, errSlot: '' }
        case FEE_CHANGED:
            return { ...state, fee: action.payload, errFee: '' }
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
        case errEmail_CHANGED:
            return { ...state, errEmail: action.payload }
        case errPass_CHANGED:
            return { ...state, errPass: action.payload }
        case errName_CHANGED:
            return { ...state, errName: action.payload }
        case errPhone_CHANGED:
            return { ...state, errPhone: action.payload }
        case errAdd_CHANGED:
            return { ...state, errAdd: action.payload }
        case errSlot_CHANGED:
            return { ...state, errSlot: action.payload }
        case errFee_CHANGED:
            return { ...state, errFee: action.payload }
        default:
            return state
    }

}