import {Post} from "./configApi"

export function postLoginApi (data) {
    return Post('login', data)
        .then((response) => response.json());
}

export function postRegistrationApi(data) {
    return Post('registration', data)
        .then((response) => response.json());
}