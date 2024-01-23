import { toast } from 'react-toastify';
import axios from '../../services/axios';
import { getStudentSuccess, getStudentFailure } from './studentsSlice';
import { call, put, takeLatest } from 'redux-saga/effects';

// Cria uma espécie de ouvidor de action, quando ouvir a action do primeiro argumento, chama uma função de callback
function* studentsSaga() {
    yield takeLatest('students/getStudentsFetch', workGetStudentsFetch);
}

// Função chamada para manipular os diferentes reducers de um estado da store do redux
function* workGetStudentsFetch() {
    try {
        const response = yield call(() => axios.get('/students'));
        const { data } = response;
        yield put(getStudentSuccess(data));
    } catch (error) {
        toast.error('Erro ao buscar os dados');
        yield put(getStudentFailure());
    }
}

export default studentsSaga;
