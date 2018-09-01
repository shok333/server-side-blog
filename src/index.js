require('babel-polyfill');
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import store from './redux/store';
import App from './components/App';

ReactDOM.render(
    <Provider store={store(window.__APP_INITIAL_STATE__)}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </Provider>,
    document.getElementById('root'),
);
