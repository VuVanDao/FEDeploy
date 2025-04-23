import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import authorizeAxiosInstance from "~/utils/authorizeAxios";
import { isEmpty } from "lodash";
import { api_root } from "~/utils/constants";
import { generatePlaceholderCard } from "~/utils/formatter";
import { mapOrder } from "~/utils/sort";
export const fetchBoardDetailAPI = createAsyncThunk(
  "activeBoard/fetchBoardDetailAPI",
  async (boardId) => {
    const request = await authorizeAxiosInstance.get(
      `${api_root}/v1/boards/${boardId}`
    );
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
    updateCardInActiveBoard: (state, action) => {
      const incomingCard = action.payload;
      //tim dan tu board > column > card
      const column = state.currentActiveBoard.columns.find(
        (i) => i._id === incomingCard.columnId
      );
      if (column) {
        const card = column.cards.find((i) => i._id === incomingCard._id);
        if (card) {
          // card.title = incomingCard.title;
          Object.keys(incomingCard).forEach((key) => {
            card[key] = incomingCard[key];
          });
        }
      }
    },
  },
  //extraReducers
  extraReducers: (builder) => {
    builder.addCase(fetchBoardDetailAPI.fulfilled, (state, action) => {
      let board = action.payload; //action.payload = request.data
      //member cua board la gop lai cua member va owner
      board.FE_AllUsers = board.owners.concat(board.members);
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
export const { updateCurrentActiveBoard, updateCardInActiveBoard } =
  activeBoardSlice.actions;

//selector: danh cho cac component ben duoi goi bang useSelector de lay du lieu tu trong kho reduxStore ra su dung
export const selectCurrentActiveBoard = (state) => {
  return state.activeBoard.currentActiveBoard;
};

// export default activeBoardSlice.reducer;
export const activeBoardReducer = activeBoardSlice.reducer;
