import React from 'react';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import {Provider} from 'react-redux';
import Dashboard from './screens/dashboard';
import rootReducer from './redux/reducer';

const middleware = applyMiddleware(thunk)
const store = createStore(rootReducer, middleware);
export default function App() {
  return (
    <Provider store={store}>
        <Dashboard />
    </Provider>
  );
}