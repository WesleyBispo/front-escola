import { toast } from 'react-toastify';
import axios from '../../services/axios';
import { loginSuccess, loginFailure } from './loginSlice';
import { call, put, takeLatest } from 'redux-saga/effects';

// Cria uma espécie de ouvidor de action, quando ouvir a action do primeiro argumento, chama uma função de callback
function* loginSaga() {
    yield takeLatest('login/loginRequest', workLoginRequest);
}

// Função chamada para manipular os diferentes reducers de um estado da store do redux
//Para pegar action tenho que pegar aqui
function* workLoginRequest(action) {
    try {
        const { email, senha } = action.payload;
        const response = yield call(axios.post, '/tokens', {
            email,
            password: senha,
        });
        const { data } = response;
        yield put(loginSuccess(data));
    } catch (error) {
        const { errors } = error.response.data;
        errors.forEach((err) => toast.error(err));
        yield put(loginFailure());
    }
}

export default loginSaga;
