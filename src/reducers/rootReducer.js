import { combineReducers } from '@reduxjs/toolkit';
import loginReducer from '../features/login/loginSlice';

const rootReducer = combineReducers({
    login: loginReducer,
});

export default rootReducer;
