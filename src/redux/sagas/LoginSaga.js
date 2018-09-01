import {call, put} from 'redux-saga/effects';
import {loginSuccessAction, registrationSuccessAction} from '../actions/loginAction';
import {postLoginApi, postRegistrationApi} from '../../api/loginApi';

export function* login({payload}) {
    const data = yield call(postLoginApi, payload);
    yield put(loginSuccessAction(data));
}

export function* registration({payload}) {
    const data = yield call(postRegistrationApi, payload);
    yield put(registrationSuccessAction(data));
}