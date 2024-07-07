import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./user/userSlice";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistConfig = {
  key: "root",
  version: 1,
  storage,
};

// const persistedReducer = persistReducer(persistConfig, userReducer);

export const makeStore = () => {
  return configureStore({
    // reducer: persistedReducer,
    reducer: userReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: false,
      }),
  });
};

// export const persistor = persistStore(store);
