import { configureStore } from "@reduxjs/toolkit";
import { activeBoardReducer } from "./activeBoard/activeBoardSlice";
import { UserReducer } from "./user/userSlice";
import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

const rootPersistConfig = {
  key: "root",
  storage: storage, //luu vao localStorage
  whitelist: ["user"], // cho phep duy tri qua moi lan f5 browser
};
const reducers = combineReducers({
  activeBoard: activeBoardReducer,
  user: UserReducer,
});
const persistedReducer = persistReducer(rootPersistConfig, reducers);
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});
