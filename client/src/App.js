import React, { Component } from 'react';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import createSagaMiddleware from 'redux-saga'
import logo from './logo.svg';
import './App.css';
import rootReducer from './reducer';
import rootSaga from './sagas';
import CoinListContainer from 'coin-list-container';
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
        <div className="App">
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <h1 className="App-title">Welcome to React</h1>
          </header>
          <div className="page-content-container">
            <CurrencyPairPriceList />
            <CoinListContainer />
          </div>
        </div>
      </Provider>
    );
  }
}

export default App;
