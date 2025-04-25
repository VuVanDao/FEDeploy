import { createSlice } from "@reduxjs/toolkit";

export const activeCardSlice = createSlice({
  name: "activeCard",
  initialState: {
    currentActiveCard: null,
    isShowModalActiveCard: false,
  },
  //Noi xu li du lieu dong bo
  reducers: {
    showModalActiveCard: (state, action) => {
      //tao ra nhung ko dung
      state.isShowModalActiveCard = !state.isShowModalActiveCard;
    },
    clearAndHideCurrentActiveCard: (state, action) => {
      state.currentActiveCard = null;
      state.isShowModalActiveCard = !state.isShowModalActiveCard;
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
export const {
  updateCurrentActiveCard,
  clearAndHideCurrentActiveCard,
  showModalActiveCard,
} = activeCardSlice.actions;

//selector: danh cho cac component ben duoi goi bang useSelector de lay du lieu tu trong kho reduxStore ra su dung
export const selectCurrentActiveCard = (state) => {
  return state.activeCard.currentActiveCard;
};
export const selectIsShowModalActiveCard = (state) => {
  return state.activeCard.isShowModalActiveCard;
};

// export default activeBoardSlice.reducer;
export const activeCardReducer = activeCardSlice.reducer;
