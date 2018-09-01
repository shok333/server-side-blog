import React from 'react';
import { Provider } from 'react-redux';
import { StaticRouter } from 'react-router-dom';
import store from 'Frontend/redux/store';
import App from 'Frontend/components/App';
import {renderToString} from 'react-dom/server';

export const frontendApplication = (initState, path) => {
    return renderToString(
        <Provider store={store(initState)}>
            <StaticRouter location={path} context={{}}>
                <App />
            </StaticRouter>
        </Provider>,
    );
}