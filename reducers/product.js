import {
    GET_PRODUCTS,
    GET_PRODUCTS_FAILURE,
    GET_PRODUCTS_SUCCESS,
    GET_PRODUCT,
    GET_PRODUCT_SUCCESS,
    GET_PRODUCT_FAILURE,
    ADD_PRODUCT,
    ADD_PRODUCT_SUCCESS,
    ADD_PRODUCT_FAILURE,
    DELETE_PRODUCT,
    DELETE_PRODUCT_SUCCESS,
    SEARCH_PRODUCT,
    SET_TO_FALSE,
    PROD_DESC,
    TITLE_ERROR,
    ADD_TO_WISHLIST
} from "../actionTypes/product";

export default (prevState = {
    products: [],
    product: {},
    searchedProducts:[],
    isSearchActive:false,
    isLoading: false,
    isRefreshing: false,
    deleted:false,
    added:false,
    page: 1,
    limit: 8,
    titleName: '',
    titleError:null,
    category: 'Mobiles',
    additionalInfo: '',
    categories: ['Mobiles', 'Laptops', 'Desktops', 'Others'],
    price:'',
}, action) => {
    console.log(action);
    switch (action.type) {
        case GET_PRODUCTS:
            return { ...prevState,
                isLoading: prevState.products.length > 0 ? false:true,
                page: action.page
            }
        case GET_PRODUCTS_SUCCESS:
            switch (action.bool){
                case true:
                    return { ...prevState,
                        isLoading: false,
                        products: action.products
                }
                case undefined:
                    return { ...prevState,
                        isLoading: false,
                        products: prevState.page==1 ?action.products:prevState.products.concat(action.products)
                }
            }
            
        case GET_PRODUCTS_FAILURE:
            return { ...prevState,
                isLoading: false,
                products:action.error
            }
        case GET_PRODUCT:
            return { ...prevState,
                isLoading: true
            }
        case GET_PRODUCT_SUCCESS:
            return { ...prevState,
                isLoading: false,
                product: action.product
            }
        case ADD_PRODUCT:
            return { 
                ...prevState,
                added:false  
            }
        case ADD_PRODUCT_SUCCESS:
            return { 
                ...prevState,
                added:true,
                titleName: '',
                titleError:null,
                category: 'Mobiles',
                additionalInfo: '',
                price:''
            }
        case GET_PRODUCTS_FAILURE:
        case GET_PRODUCT_FAILURE:
        case ADD_PRODUCT_FAILURE:
            return { ...prevState,
                        added:false 
            }
        case DELETE_PRODUCT:{
            return{
                ...prevState,
                deleted:false
            }
        }
        case DELETE_PRODUCT_SUCCESS:{
            return {
                ...prevState,
                products:action.products,
                deleted:true
            }
        }
        case SEARCH_PRODUCT:{
            let products=prevState.products;
            prevState.searchedProducts=[]
            if((products.length>0)&&(action.text.length>0)){
                prevState.isSearchActive=true;
                for(let eachProd in products){
                    if((products[eachProd].title.includes(action.text))||(products[eachProd].additionalInfo.includes(action.text))){
                        prevState.searchedProducts.push(products[eachProd])
                    }
                }
            }
            else{
                prevState.isSearchActive=false;
            }
            return {
                ...prevState
            }
        }
        case PROD_DESC:{
            switch (action.index){
                case 'title':{
                    return{
                        ...prevState,
                        titleName:action.text,
                        titleError:null
                    }
                }
                case 'additionalInfo':{
                    return{
                        ...prevState,
                        additionalInfo:action.text
                    }
                }
                case 'price':{
                    return{
                        ...prevState,
                        price:action.text    
                    }
                }
                case 'category':{
                    return{
                        ...prevState,
                        category:action.text,                   
                    }
                }
            }
        }
        case TITLE_ERROR:{
            return{
                ...prevState,
                titleError:true
            }
        }
        case SET_TO_FALSE:{
            return{
                ...prevState,
                deleted:false,
                added:false,
                titleError:null
            }
        }

        case ADD_TO_WISHLIST:{
            const { products } = prevState;
            const { id } = action;
            return {
                ...prevState,
                products: products.map(product => ({ ...product, wish: product.id === id ? !product.wish : product.wish })),

        }
    }
        default:
            return prevState;

    }
}