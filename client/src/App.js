import React, { Component } from 'react';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import createSagaMiddleware from 'redux-saga'
import logo from './logo.svg';
import './App.css';
import rootReducer from './reducer';
import rootSaga from './sagas';
import CoinList from 'coin-list';
import CurrencyPairPriceList from 'currency-pair-price-list';

const sagaMiddleware = createSagaMiddleware()

const store = createStore(
  rootReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
  applyMiddleware(sagaMiddleware)
);

sagaMiddleware.run(rootSaga);

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <div className="page-content-container">
          <div className="currency-pair-price-list">
            <CurrencyPairPriceList />
          </div>
          <CoinList />
        </div>
      </Provider>
    );
  }
}

export default App;
