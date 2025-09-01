export const LOG_IN = 'LOG_IN';
export const LOG_OUT = 'LOG_OUT';

export function isLoggedIn(payload){
    return {
        type: LOG_IN,
        payload
    }
}

export function isLoggedOut(payload) {
    return {
        type: LOG_OUT,
        payload
    }
}