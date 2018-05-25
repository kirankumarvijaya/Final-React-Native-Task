import {
    GET_PRODUCTS,
    GET_PRODUCTS_SUCCESS,
    GET_PRODUCTS_FAILURE,
    GET_PRODUCT,
    GET_PRODUCT_FAILURE,
    GET_PRODUCT_SUCCESS,
    ADD_PRODUCT,
    ADD_PRODUCT_SUCCESS,
    ADD_PRODUCT_FAILURE,
    ADD_TO_WISHLIST,
    TITLE_ERROR,
    PROD_DESC,
    DELETE_PRODUCT,
    DELETE_PRODUCT_FAILURE,
    DELETE_PRODUCT_SUCCESS,
    SEARCH_PRODUCT,
    SET_TO_FALSE
} from "../actionTypes/product";

export function getProducts(page, limit) {
    return {
        type: GET_PRODUCTS,
        page,
        limit
    }
}

export function admingetProducts(bool) {
    return {
        type: GET_PRODUCTS,
        bool: true
    }
}


export function getProductsSuccess(products, bool) {
    return {
        type: GET_PRODUCTS_SUCCESS,
        products,
        bool
    }
}

export function getProductsFailure(error) {
    return {
        type: GET_PRODUCTS_FAILURE,
        error
    }
}

export function getProduct(id) {
    return {
        type: GET_PRODUCT,
        id
    }
}

export function getProductSuccess(product) {
    return {
        type: GET_PRODUCT_SUCCESS,
        product
    }
}

export function getProductFailure(error) {
    return {
        type: GET_PRODUCT_FAILURE,
        error
    }
}

export function addProduct(product) {
    return {
        type: ADD_PRODUCT,
        product
    }
}

export function addProductSuccess(product) {
    return {
        type: ADD_PRODUCT_SUCCESS,
        product: product
    }
}

export function addProductFailure(error) {
    return {
        type: ADD_PRODUCT_FAILURE,
        error
    }
}

export function titleError() {
    return {
        type: TITLE_ERROR
    }
}

export function deleteProduct(id) {
    return {
        type: DELETE_PRODUCT,
        id: id
    }
}

export function deleteProductSuccess(product) {
    return {
        type: DELETE_PRODUCT_SUCCESS,
        product: product
    }
}

export function deleteProductFailure(error) {
    return {
        type: DELETE_PRODUCT_FAILURE,
        product: error
    }
}

export function searchProducts(text) {
    return {
        type: SEARCH_PRODUCT,
        text
    }
}

export function getProductDetails(text, index) {
    return {
        type: PROD_DESC,
        text,
        index
    }
}

export function settoFalse() {
    return {
        type: SET_TO_FALSE
    }
}

export function addproducttoWishList(id) {
    return {
        type: ADD_TO_WISHLIST,
        id
    }
}