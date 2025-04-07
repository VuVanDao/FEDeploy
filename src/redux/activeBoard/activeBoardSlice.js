import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { isEmpty } from "lodash";
import { api_root } from "~/utils/constants";
import { generatePlaceholderCard } from "~/utils/formatter";
import { mapOrder } from "~/utils/sort";
export const fetchBoardDetailAPI = createAsyncThunk(
  "activeBoard/fetchBoardDetailAPI",
  async (boardId) => {
    const request = await axios.get(`${api_root}/v1/boards/${boardId}`);
    return request.data;
  }
);
export const activeBoardSlice = createSlice({
  name: "activeBoard",
  initialState: {
    currentActiveBoard: null,
  },
  //Noi xu li du lieu dong bo
  reducers: {
    updateCurrentActiveBoard: (state, action) => {
      const board = action.payload;

      //xu li du lieu neu can thiet
      //update lai du lieu currentActiveBoard
      state.currentActiveBoard = board;
    },
  },
  //extraReducers
  extraReducers: (builder) => {
    builder.addCase(fetchBoardDetailAPI.fulfilled, (state, action) => {
      let board = action.payload; //action.payload = request.data
      board.columns = mapOrder(board?.columns, board?.columnOrderIds, "_id");
      board.columns.forEach((column) => {
        if (isEmpty(column.cards)) {
          column.cards = [generatePlaceholderCard(column)];
          column.cardOrderIds = [generatePlaceholderCard(column)._id];
        } else {
          column.cards = mapOrder(column?.cards, column?.cardOrderIds, "_id");
        }
      });
      state.currentActiveBoard = board;
    });
  },
});

// Action la noi danh cho cac component ben duoi goi bang dispatch  toi no de cap nhat lai du lieu thong qua reducer
export const { updateCurrentActiveBoard } = activeBoardSlice.actions;

//selector: danh cho cac component ben duoi goi bang useSelector de lay du lieu tu trong kho reduxStore ra su dung
export const selectCurrentActiveBoard = (state) => {
  return state.activeBoard.currentActiveBoard;
};

// export default activeBoardSlice.reducer;
export const activeBoardReducer = activeBoardSlice.reducer;
