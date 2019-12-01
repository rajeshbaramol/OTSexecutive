import {
    AUTH_CLEAR_LOGIN_ERROR_MESSAGE,
    AUTH_ERR_LOG_IN,
    AUTH_LOGGED_IN,
    AUTH_LOGGING_IN,
    AUTH_LOGOUT,
    AUTH_OTP,
    NEW_PROFILE,
    VERIFY_PROMO_CODE, GET_USER, ERROR_MSG


} from '../constants/auth';
import { AsyncStorage } from 'react-native';
let token1 = null
_checkUser = async () => {
    token1 = await AsyncStorage.getItem("userToken")
}
_checkUser()
const INITIAL_STATE = {
    user: null,
    token: token1 ? token1.accessToken : null,
    loggingIn: false,
    errorMessage: '',
    tempdata: '',
    userId: '',
    isAuthrentified: false,
    customerUUID: "",
    isNewUser: false,
    userProfile: {},
    isExecutive: true
};

export default function (state = INITIAL_STATE, action) {
    switch (action.type) {
        case AUTH_LOGOUT: {
            return {
                ...INITIAL_STATE,
            };
        }
        case AUTH_CLEAR_LOGIN_ERROR_MESSAGE: {
            return {
                ...state,
                errorMessage: '',
            };
        }
        case AUTH_LOGGING_IN:
            return {
                ...state,
                loggingIn: true,
            };
        case AUTH_LOGGED_IN:
            return {
                ...state,
                user: action.payload.data.username,
                token: action.payload.data.token,
                customerUUID: action.payload.data,
                isNewUser: action.payload.data.isNewUser,
                loggingIn: false,
                isAuthrentified: true,
                errorMessage: ''
            };
        case AUTH_ERR_LOG_IN:
            return {
                ...state,
                loggingIn: false,
                errorMessage: action.payload,
            };
        case AUTH_LOGOUT:
            return {
                ...state,
                loggingIn: false,
                errorMessage: action.payload,
            };
        case AUTH_OTP:
            return {
                ...state,
                loggingIn: false,
                isAuthrentified: action.payload === 'verified' ? true : false,
            };
        case NEW_PROFILE:
            return {
                ...state,
                user: action.payload.data.username,
                userProfile: { email: action.payload.data.email, DImage: action.payload.data.profileimageurl, username: action.payload.data.username }
            }

        case VERIFY_PROMO_CODE:
            return {
                ...state,
                user: action.payload.data.username,
                userProfile: { email: action.payload.data.email, DImage: action.payload.data.profileimageurl, username: action.payload.data.username }
            }
        case GET_USER:
            return {
                ...state,
                user: action.payload.data.username,
                userProfile: {
                    email: action.payload.data.email,
                    DImage: action.payload.data.profileimageurl,
                    username: action.payload.data.username,
                    phone: action.payload.data.phone,
                    referralCode: action.payload.data.referralCode
                }
            }
        case ERROR_MSG:
            return {
                ...state,
                errorMessage: action.payload,
            }

        default:
            return state;
    }
}