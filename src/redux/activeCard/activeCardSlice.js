import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import authorizeAxiosInstance from "~/utils/authorizeAxios";
import { isEmpty } from "lodash";
import { api_root } from "~/utils/constants";
import { generatePlaceholderCard } from "~/utils/formatter";
import { mapOrder } from "~/utils/sort";

export const activeCardSlice = createSlice({
  name: "activeCard",
  initialState: {
    currentActiveCard: null,
  },
  //Noi xu li du lieu dong bo
  reducers: {
    clearCurrentActiveCard: (state, action) => {
      state.currentActiveCard = null;
    },
    updateCurrentActiveCard: (state, action) => {
      const fulCard = action.payload;
      state.currentActiveCard = fulCard;
    },
  },
  //extraReducers
  extraReducers: (builder) => {},
});

// Action la noi danh cho cac component ben duoi goi bang dispatch  toi no de cap nhat lai du lieu thong qua reducer
export const { updateCurrentActiveCard, clearCurrentActiveCard } =
  activeCardSlice.actions;

//selector: danh cho cac component ben duoi goi bang useSelector de lay du lieu tu trong kho reduxStore ra su dung
export const selectCurrentActiveCard = (state) => {
  return state.activeCard.currentActiveCard;
};

// export default activeBoardSlice.reducer;
export const activeCardReducer = activeCardSlice.reducer;
