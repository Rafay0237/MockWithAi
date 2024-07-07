import {configureStore } from '@reduxjs/toolkit';
import userReducer from './user/userSlice';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { useDispatch,useSelector } from 'react-redux';

const persistConfig = {
  key: 'root',
  version: 1,
  storage,
};

const persistedReducer = persistReducer(persistConfig, userReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

// export const persistor = persistStore(store);

export const useAppDispatch = () => useDispatch();
export const useAppSelector = useSelector;



