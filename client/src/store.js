import { configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
// import storage from "redux-persist/lib/storage";
import storageSession from 'redux-persist/lib/storage/session';


import userReducer from "./features/user/userSlice.js";
import productReducer from "./features/product/productSlice.js";

const persistConfigProduct = {
  key: "products",
  storage: storageSession,
};

const persistConfigUser = {
  key: "user",
  storage: storageSession,
};

const productPersistedReducer = persistReducer(
  persistConfigProduct,
  productReducer
);
const userPersistedReducer = persistReducer(persistConfigUser, userReducer);

const store = configureStore({
  reducer: {
    user: userPersistedReducer,
    product: productPersistedReducer,
  },
});

const persistor = persistStore(store);

export { store, persistor };
