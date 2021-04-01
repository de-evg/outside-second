import React from 'react';
import ReactDOM from 'react-dom';
import { Normalize } from "styled-normalize";
import { applyMiddleware, createStore } from "redux";
import { Provider } from "react-redux";
import { composeWithDevTools } from "redux-devtools-extension";
import root from "./store/reducers/root";
import App from './components/app/app';
import { createAPI } from './api/api';
import thunk from 'redux-thunk';

const api = createAPI(() => { });

const store = createStore(root, composeWithDevTools(applyMiddleware(thunk.withExtraArgument(api))));

ReactDOM.render(
  <Provider store={store}>
    <React.StrictMode>
      <Normalize />
      <App />
    </React.StrictMode>
  </Provider>,
  document.getElementById('root')
);
