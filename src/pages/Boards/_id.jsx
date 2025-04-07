import { Box, Container } from "@mui/material";
import React, { useEffect, useState } from "react";
import AppBar from "~/components/AppBar/AppBar";
import BoardBar from "./BoardBar/BoardBar";
import BoardContent from "./BoardContent/BoardContent";

import {
  createNewCardAPI,
  deleteColumnDetailsApi,
  moveCardToDifferentColumnApi,
  updateBoardDetailAPi,
  updateColumnDetailAPi,
} from "~/apis";
import { cloneDeep } from "lodash";
import { toast } from "react-toastify";
import {
  fetchBoardDetailAPI,
  updateCurrentActiveBoard,
  selectCurrentActiveBoard,
} from "~/redux/activeBoard/activeBoardSlice";
import { useDispatch, useSelector } from "react-redux";
function Board() {
  const dispatch = useDispatch();
  // const [board, setBoard] = useState(null);
  const board = useSelector(selectCurrentActiveBoard);
  useEffect(() => {
    const boardId = "67ea6a00609bdbb7c46dfbda";
    dispatch(fetchBoardDetailAPI(boardId));
  }, [dispatch]);

  const moveColumns = async (dndOrderColumn) => {
    const dndOrderColumnIds = dndOrderColumn.map((c) => c._id);

    const newBoard = cloneDeep(board);
    newBoard.columns = dndOrderColumn;
    newBoard.columnOrderIds = dndOrderColumnIds;
    // dispatch(updateCurrentActiveBoard(newBoard));
    dispatch(updateCurrentActiveBoard(newBoard));
    await updateBoardDetailAPi(newBoard._id, {
      columnOrderIds: newBoard.columnOrderIds,
    });
  };
  const moveCardInSameColumn = async (
    dndOrderCards,
    dndOrderCardsIds,
    columnId
  ) => {
    // const newBoard = {
    //   ...board,
    // };
    const newBoard = cloneDeep(board);
    const ColumnToUpdate = newBoard.columns.find(
      (column) => column._id === columnId
    );
    if (ColumnToUpdate) {
      ColumnToUpdate.cards = dndOrderCards;
      ColumnToUpdate.cardOrderIds = dndOrderCardsIds;
    }
    dispatch(updateCurrentActiveBoard(newBoard));
    await updateColumnDetailAPi(ColumnToUpdate._id, {
      cardOrderIds: ColumnToUpdate.cardOrderIds,
    });
  };
  const moveCardInDifferentColumn = async (
    currentCardId,
    prevColumnId, //column cu
    nextColumnId, //column moi
    dndOrderedColumns
  ) => {
    // console.log("currentCardId", currentCardId);
    // console.log("prevColumnId", prevColumnId);
    // console.log("nextColumnId", nextColumnId);
    // console.log("dndOrderedColumns", dndOrderedColumns);
    const dndOrderColumnIds = dndOrderedColumns.map((c) => c._id);
    const newBoard = {
      ...board,
    };
    newBoard.columns = dndOrderedColumns;
    newBoard.columnOrderIds = dndOrderColumnIds;
    dispatch(updateCurrentActiveBoard(newBoard));
    const prevCardOrderIds = dndOrderedColumns.find(
      (c) => c._id === prevColumnId
    )?.cardOrderIds;
    console.log("prevCardOrderIds", prevCardOrderIds);
    // if (prevCardOrderIds[0].includes("placeholder-card")) {
    //   prevCardOrderIds = [];
    // }
    moveCardToDifferentColumnApi({
      currentCardId,
      prevColumnId,
      prevCardOrderIds,
      nextColumnId,
      nextCardOrderIds: dndOrderedColumns.find((c) => c._id === nextColumnId)
        ?.cardOrderIds,
    });
  };

  if (!board) {
    return <Box>Loading...</Box>;
  }
  return (
    <Container sx={{ height: "100vh" }} maxWidth={false} disableGutters={true}>
      <AppBar />
      <BoardBar board={board} />
      {/* <BoardContent board={mockData.board} /> */}
      <BoardContent
        board={board}
        // deleteColumnDetails={deleteColumnDetails}
        moveColumns={moveColumns}
        moveCardInSameColumn={moveCardInSameColumn}
        moveCardInDifferentColumn={moveCardInDifferentColumn}
      />
    </Container>
  );
}

export default Board;
