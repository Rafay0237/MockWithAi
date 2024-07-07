"use client"
import { store } from './store';
import { Provider } from 'react-redux';
import {persistStore} from "redux-persist"
// import { PersistGate } from 'redux-persist/integration/react';

const ReduxProvider = ({ children }) => {
    persistStore(store)
  return (
    <Provider store={store}>
        {children}
    </Provider>
  );
};

export default ReduxProvider;
