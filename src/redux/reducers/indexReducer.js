import {combineReducers} from 'redux';
import {INDEX_SUCCESS} from  '../actions/indexActions';

function reducer(state = [], action) {
    switch (action.type) {
        case INDEX_SUCCESS:
            return action.payload; //todo переписать обработку

        default:
            return state;
    }
}

export default combineReducers({
    indexState: reducer,
})