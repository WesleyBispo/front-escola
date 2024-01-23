import { all } from 'redux-saga/effects';
import studentsSaga from '../features/students/studentSaga';
import loginSaga from '../features/login/loginSaga';

export default function* rootSaga() {
    yield all([studentsSaga(), loginSaga()]);
}
