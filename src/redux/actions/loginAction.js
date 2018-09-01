export const LOGIN = 'LOGIN';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const REGISTRATION = 'REGISTRATION';
export const REGISTRATION_SUCCESS = 'REGISTRATION_SUCCESS';

export function loginAction (payload) {
    return {
        type: LOGIN,
        payload
    }
}

export function loginSuccessAction (payload) {
    return {
        type: LOGIN_SUCCESS,
        payload: payload
    }
}

export function registrationAction(payload) {
    return {
        type: REGISTRATION,
        payload: payload
    }
}

export function registrationSuccessAction(payload) {
    return {
        type: REGISTRATION_SUCCESS,
        payload: payload
    }
}
