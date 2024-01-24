import { all } from 'redux-saga/effects';
import loginSaga from '../features/login/loginSaga';

export default function* rootSaga() {
    yield all([loginSaga()]);
}
