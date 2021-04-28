import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { applyMiddleware, createStore } from 'redux';
import logger from 'redux-logger';
import thunk from 'redux-thunk';

import 'materialize-css/dist/css/materialize.min.css';

import App from './components/App';
import { rootReducer } from './state';
// dev only trick to test email is working from sendgrid
// import axios from 'axios';
// window.axios = axios;
// const survey = {title: 'my title', subject: 'my test', recipients: 'fjacquier@gmail.com', body: "how much did you love using our services?"}
// axios.post('/api/surveys', survey)

const middlewares = [thunk];

if (process.env.NODE_ENV === 'development') {
  middlewares.push(logger);
}
const store = createStore(rootReducer, {}, applyMiddleware(...middlewares));

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.querySelector('#root')
);
