import React from 'react';
import ReactDOM from 'react-dom';
import { Normalize } from "styled-normalize";
import { applyMiddleware, createStore } from "redux";
import { Provider } from "react-redux";
import { composeWithDevTools } from "redux-devtools-extension";
import root from "./store/reducers/root";
import App from './components/app/app';
import Api from './api/api';
import thunk from 'redux-thunk';

const BACKEND_URL = `https://recruting-test-api.herokuapp.com/api/v1/`;
const api = new Api(BACKEND_URL);

const store = createStore(root, composeWithDevTools(applyMiddleware(thunk.withExtraArgument(api)))
);

ReactDOM.render(
  <Provider store={store}>
    <React.StrictMode>
      <Normalize />
      <App />
    </React.StrictMode>
  </Provider>,
  document.getElementById('root')
);
