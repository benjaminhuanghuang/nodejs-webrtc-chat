import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reduxThunk from 'redux-thunk';
//
import App from './components/App';

ReactDOM.render(
    <App/>
  , document.querySelector('.container'));