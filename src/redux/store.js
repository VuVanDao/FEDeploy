import { configureStore } from "@reduxjs/toolkit";
import { activeBoardReducer } from "./activeBoard/activeBoardSlice";
import { UserReducer } from "./user/userSlice";
export const store = configureStore({
  reducer: {
    activeBoard: activeBoardReducer,
    user: UserReducer,
  },
});
