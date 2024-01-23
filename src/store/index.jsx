import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import {
    persistStore,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from 'redux-persist';
import persistedReducer from '../config/persistConfig';
import rootSaga from '../sagas/rootSaga';

// Constantes renomeadas
const ignoredPersistActions = [
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
];

// Configuração do middleware do Redux Saga
const sagaMiddleware = createSagaMiddleware();

// Configuração do store Redux
const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: ignoredPersistActions,
            },
        }).concat(sagaMiddleware),
});

// Configuração do persistor
const persistor = persistStore(store);

// Execução do saga middleware
sagaMiddleware.run(rootSaga);

export { store, persistor };
