import {takeEvery, call, put} from 'redux-saga/effects';
import {INDEX, indexSuccessAction} from '../actions/indexActions';
import {LOGIN, REGISTRATION} from '../actions/loginAction';
import {getIndexStateApi} from '../../api/indexApi';
import {login, registration} from './LoginSaga';

function* index() {
    const data = yield call(getIndexStateApi);
    yield put(indexSuccessAction(data));
}

export default function* root() {
    yield takeEvery(INDEX, index);
    yield takeEvery(LOGIN, login);
    yield takeEvery(REGISTRATION, registration);
}