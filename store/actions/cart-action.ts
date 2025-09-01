export const INCREASE_QUANTITY = 'INCREASE_QUANTITY';
export const DECREASE_QUANTITY = 'DECREASE_QUANTITY';
export const GET_ALL_PRODUCTS = 'GET_ALL_PRODUCT';
export const GET_NUMBER_CART = 'GET_NUMBER_CART';
export const ADD_TO_CART = 'ADD_TO_CART' ;
export const UPDATE_CART = 'UPDATE_CART';
export const REMOVE_FROM_CART = 'REMOVE_FROM_CART';

export function GetAllProduct(payload) {
    return {
        type: 'GET_ALL_PRODUCTS',
        payload
    }
}

export function AddToCart(payload) {
    return {
        type: ADD_TO_CART,
        payload
    }
}

export function RemoveFromCart(payload) {
    return {
        type: REMOVE_FROM_CART,
        payload
    }
}

export function IncreaseQuantity(payload) {
    return {
        type: INCREASE_QUANTITY,
        payload
    }
}

export function DecreaseQuantity(payload) {
    return {
        type: DECREASE_QUANTITY,
        payload
    }
}

export function UpdateCart(payload){
    return {
        type:'UPDATE_CART',
        payload
    }
}