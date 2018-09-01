export const INDEX = 'INDEX';
export const INDEX_SUCCESS = 'INDEX_SUCCESS';

export function indexAction () {
    return {
        type: INDEX,
    }
}

export function indexSuccessAction (payload) {
    return {
        type: INDEX_SUCCESS,
        payload: payload
    }
}
