import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { composeWithDevTools } from 'redux-devtools-extension';
import indexReducer from './reducers/indexReducer';
import indexSaga from './sagas/indexSaga';

const store = (initState) => {
    const sagaMiddleware = createSagaMiddleware();

    const storeObject = createStore(
        indexReducer,{
            indexState: initState ? initState : [],
        },
        composeWithDevTools(
            applyMiddleware(
                sagaMiddleware
            )
        )
    )

    sagaMiddleware.run(indexSaga);

    return storeObject;
};



export default store;