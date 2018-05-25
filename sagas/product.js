import {
    put,
    takeLatest
} from "redux-saga/effects";
import * as actionCreators from "../actionCreators/product"
import {
    GET_PRODUCTS,
    ADD_PRODUCT,
    DELETE_PRODUCT
} from "../actionTypes/product";

let URI = "http://172.16.100.23:4000";

function* getProducts(action) {
    try {
        let products = action.bool ?
            yield fetch(`${URI}/products`).then(r => r.json()):
                yield fetch(`${URI}/products?_page=${action.page}&_limit=${action.limit}`).then(r => r.json());
        console.log("products in getProducts", products);
        yield put(actionCreators.getProductsSuccess(products, action.bool))
    } catch (error) {
        yield put(actionCreators.getProductsFailure(error))
    }
}

function* deleteCall(action) {
    console.log("action", action)
    try {
        let products = yield fetch(`${URI}/products/${action.id}`, {
            method: 'DELETE'
        }).then(r => getProducts(action));
        yield [put(actionCreators.admingetProducts()), put(actionCreators.deleteProductSuccess(products))]
    } catch (error) {
        yield put(actionCreators.deleteProductFailure(error))
    }
}

function* addProduct(action) {
    let {
        title,
        category,
        additionalInfo,
        price
    } = action.product;
    try {
        let response = yield fetch(`${URI}/products`, {
            body: JSON.stringify({
                title,
                category,
                additionalInfo,
                price
            }),
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
        })
        yield [put(actionCreators.getProducts()), put(actionCreators.addProductSuccess(response))]
    } catch (error) {
        yield put(actionCreators.addProductFailure(error))
    }

}

export function* productWatchers() {
    yield [takeLatest(GET_PRODUCTS, getProducts), takeLatest(DELETE_PRODUCT, deleteCall), takeLatest(ADD_PRODUCT, addProduct)];
}