import { BrowserRouter as Router } from 'react-router-dom';
import history from './services/history';
import Header from './components/Header';
import Routes from './routes';
import { ToastContainer } from 'react-toastify';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './store';
import GlobalStyle from './styles/GlobalStyle';
function App() {
    return (
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <Router history={history}>
                    <GlobalStyle />
                    <Header />
                    <Routes />
                    <ToastContainer
                        position="bottom-left"
                        pauseOnHover={false}
                        autoClose={3000}
                        className="toast-container"
                        theme="colored"
                    />
                </Router>
            </PersistGate>
        </Provider>
    );
}

export default App;
