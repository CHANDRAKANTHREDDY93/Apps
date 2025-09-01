export function Api(endPoint: string, method: string, payload?: any) {
    return fetch(endPoint, {
        method: method,
        headers: { "Content-Type": "application/json" },
        body: payload
    }).then(res => res.json())
    .catch(err => console.error(err));
}