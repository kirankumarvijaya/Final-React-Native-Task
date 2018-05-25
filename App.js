import React from "react";
import { createStore, applyMiddleware } from "redux";
import { Provider, connect } from "react-redux";
import AppWithNavigationState, { middleware } from "./containers/AppNavigator";
import rootReducer from "./reducers";
import createSagaMiddleware from "redux-saga";
import {productWatchers} from "./sagas/product";

const sagaMiddleware = createSagaMiddleware();

const store = createStore(
  rootReducer,
  {
    productState: { 
    products: [],
    product: {},
    isLoading: false,
    isRefreshing: false,
    page: 1,
    limit:8,
    titleName: '',
    titleError:null,
    category: 'Mobiles',
    additionalInfo: '',
    categories: ['Mobiles', 'Laptops', 'Desktops', 'Others'],
    price:'',
 },
    storeState: { stores: [], isLoading: false }
  },
  applyMiddleware(middleware, sagaMiddleware)
);
sagaMiddleware.run(productWatchers);

export default class Root extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <AppWithNavigationState />
      </Provider>
    );
  }
}
