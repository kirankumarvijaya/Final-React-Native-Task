import {
    GET_STORES,
    GET_STORES_FAILURE,
    GET_STORES_SUCCESS
} from "../actionTypes/store";

export default (prevState={stores:[],isLoading:false}, action) => {
    switch (action.type) {
        case GET_STORES:
            return { ...prevState,
                isLoading: true
            }
        case GET_STORES_SUCCESS:
            return { ...prevState,
                isLoading: false,
                stores: action.stores
            }
        case GET_STORES_FAILURE:
            return { ...prevState,
                isLoading: false,
                error: action.error
            }
        default:
            return prevState;

    }
}