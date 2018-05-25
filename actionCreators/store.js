import {
    GET_STORES,
    GET_STORES_SUCCESS,
    GET_STORES_FAILURE
} from "../actionTypes/store";


export function getStores() {
    return {
        type: GET_STORES
    }
}

export function getStoresSuccess(products) {
    return {
        type: GET_STORES_SUCCESS,
        products
    }
}

export function getStoresFailure(error) {
    return {
        type: GET_STORES_FAILURE,
        error
    }
}