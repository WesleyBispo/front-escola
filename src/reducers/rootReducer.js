import { combineReducers } from '@reduxjs/toolkit';
import loginReducer from '../features/login/loginSlice';
import studentsReducer from '../features/students/studentsSlice';
import filesReducer from '../features/uploads/uploadsSlice';

const rootReducer = combineReducers({
    login: loginReducer,
    students: studentsReducer,
    files: filesReducer,
});

export default rootReducer;
