import { AUTH_LOGGING_IN, AUTH_LOGGED_IN, AUTH_ERR_LOG_IN, AUTH_LOGOUT, AUTH_CLEAR_LOGIN_ERROR_MESSAGE, GET_USER, AUTH_OTP, NEW_PROFILE, VERIFY_PROMO_CODE, ERROR_MSG } from '../constants/auth';
import { userService } from '../api/executiveService';
import { NavigationService } from '../api/NavigationService';

export const loggedIn = data => ({
    type: AUTH_LOGGED_IN,
    payload: data,
});

export const clearLoginErrorMessage = () => ({
    type: AUTH_CLEAR_LOGIN_ERROR_MESSAGE,
});

export const errorLogIn = errorMessage => ({
    type: AUTH_ERR_LOG_IN,
    payload: errorMessage,
});

export const loggingIn = () => ({
    type: AUTH_LOGGING_IN,
});

export const loggedOut = () => ({
    type: AUTH_LOGOUT,
});

export const verifyOtp = (data) => ({
    type: AUTH_OTP,
    payload: data,
});
export const UserDetailsDispatch = data => ({
    type: NEW_PROFILE,
    payload: data,
});
export const PromoCodeDispatch = data => ({
    type: VERIFY_PROMO_CODE,
    payload: data,
});
export const GetUserDispatch = data => ({
    type: GET_USER,
    payload: data,
});
export const errorhandle = errorMessage => ({
    type: ERROR_MSG,
    payload: errorMessage
})
export const logout = () => async (dispatch, getState) => {
    userService.logout(getState).then(async (res) => {
        await dispatch(loggedOut(res.data));
    }).catch((err) => { });
};

export const login = (username, password) => (dispatch) => {
    dispatch(loggingIn());
    userService.login(username, password).then(async (res) => {
        await dispatch(loggedIn(res.data));
    }).catch((err) => {
        dispatch(errorLogIn(err.status))
    });
};

export const sendOtp = (params) => (dispatch) => {
    userService.otp(params).then(async (res) => {
        await dispatch(verifyOtp(res.data));
    }).catch((err) => { dispatch(errorhandle(err.status)) });
};
export const ProcessUserDetailAction = (params) => (dispatch) => {
    userService.ProcessInsertUserDetails(params).then(async (res) => {
        await dispatch(UserDetailsDispatch(res.data));
        NavigationService.navigate('Home');
    }).catch((err) => {
        dispatch(errorhandle(err.status))
    });
};
export const VerifyPromoCodeAction = (params) => (dispatch) => {
    userService.VerifyPromoCode(params).then(async (res) => {
        await dispatch(PromoCodeDispatch(res.data));
        NavigationService.navigate('Home');
    }).catch((err) => {
        dispatch(errorhandle(err.status))
    });
};
export const GetUserAction = (params) => (dispatch) => {
    userService.GetProfileService(params).then(async (res) => {
        await dispatch(GetUserDispatch(res.data));

    }).catch((err) => { dispatch(errorhandle(err.status)) });
};
