export function Get(url) {
    return fetch(`/${url}`, {
        credentials: 'same-origin',
        headers: {
        }
    });

    return 'test ajax request';
}

export function Post(url, data) {
    return fetch(`/${url}`,{
        method: 'post',
        credentials: 'same-origin',
        headers: {
            "Content-type": "application/json; charset=UTF-8",
        },
        body: JSON.stringify(data)
    });
}
