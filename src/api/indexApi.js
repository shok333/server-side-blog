import {Get} from "./configApi"

export function getIndexStateApi () {
    return Get('payload/posts')
        .then((response) => response.json());
}