import storage from 'redux-persist/lib/storage';
import { persistReducer } from 'redux-persist';
import rootReducer from '../reducers/rootReducer';

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['login'],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export default persistedReducer;
