import { Box, Container } from "@mui/material";
import React, { useEffect, useState } from "react";
import AppBar from "~/components/AppBar/AppBar";
import BoardBar from "./BoardBar/BoardBar";
import BoardContent from "./BoardContent/BoardContent";
// import { mockData } from "~/apis/mock-data";
import {
  createNewCardAPI,
  createNewColumnAPI,
  deleteColumnDetailsApi,
  fetchBoardDetailAPi,
  moveCardToDifferentColumnApi,
  updateBoardDetailAPi,
  updateColumnDetailAPi,
} from "~/apis";
import { isEmpty } from "lodash";
import { generatePlaceholderCard } from "~/utils/formatter";
import { mapOrder } from "~/utils/sort";
import { toast } from "react-toastify";
function Board() {
  const [board, setBoard] = useState(null);
  useEffect(() => {
    const boardId = "67ea6a00609bdbb7c46dfbda";
    fetchBoardDetailAPi(boardId).then((board) => {
      board.columns = mapOrder(board?.columns, board?.columnOrderIds, "_id");
      board.columns.forEach((column) => {
        if (isEmpty(column.cards)) {
          column.cards = [generatePlaceholderCard(column)];
          column.cardOrderIds = [generatePlaceholderCard(column)._id];
        } else {
          column.cards = mapOrder(column?.cards, column?.cardOrderIds, "_id");
        }
      });
      setBoard(board);
    });
  }, []);

  const createNewColumn = async (columnData) => {
    const createdColumn = await createNewColumnAPI({
      ...columnData,
      boardId: board._id,
    });
    // console.log("createdColumn", createdColumn);
    const newBoard = {
      ...board,
    };
    createdColumn.cards = [generatePlaceholderCard(createdColumn)];
    createdColumn.cardOrderIds = [generatePlaceholderCard(createdColumn)._id];

    newBoard.columns.push(createdColumn);
    newBoard.columnOrderIds.push(createdColumn._id);

    setBoard(newBoard);
  };

  const createNewCard = async (cardData) => {
    const createdCard = await createNewCardAPI({
      ...cardData,
      boardId: board._id,
    });
    // console.log("createdCard", createdCard);
    const newBoard = {
      ...board,
    };

    if (
      newBoard.columns
        .find((column) => column._id === createdCard.columnId)
        .cards.some((card) => card.FE_placeholderCard)
    ) {
      newBoard.columns.find(
        (column) => column._id === createdCard.columnId
      ).cards = [createdCard];
      newBoard.columns.find(
        (column) => column._id === createdCard.columnId
      ).cardOrderIds = [createdCard._id];
    } else {
      newBoard.columns
        .find((column) => column._id === createdCard.columnId)
        .cards.push(createdCard);
      newBoard.columns
        .find((column) => column._id === createdCard.columnId)
        .cardOrderIds.push(createdCard._id);
    }

    // console.log("🚀 ~ createNewCard ~ newBoard:", newBoard);

    setBoard(newBoard);
  };

  const moveColumns = async (dndOrderColumn) => {
    const dndOrderColumnIds = dndOrderColumn.map((c) => c._id);
    const newBoard = {
      ...board,
    };
    newBoard.columns = dndOrderColumn;
    newBoard.columnOrderIds = dndOrderColumnIds;
    setBoard(newBoard);
    await updateBoardDetailAPi(newBoard._id, {
      columnOrderIds: newBoard.columnOrderIds,
    });
  };
  const moveCardInSameColumn = async (
    dndOrderCards,
    dndOrderCardsIds,
    columnId
  ) => {
    const newBoard = {
      ...board,
    };
    const ColumnToUpdate = newBoard.columns.find(
      (column) => column._id === columnId
    );
    if (ColumnToUpdate) {
      ColumnToUpdate.cards = dndOrderCards;
      ColumnToUpdate.cardOrderIds = dndOrderCardsIds;
    }
    setBoard(newBoard);
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
    setBoard(newBoard);
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
  const deleteColumnDetails = (columnId) => {
    console.log("🚀 ~ deleteColumnDetails ~ columnId:", columnId);
    const newBoard = {
      ...board,
    };
    newBoard.columns = newBoard.columns.filter(
      (column) => column._id !== columnId
    );
    newBoard.columnOrderIds = newBoard.columnOrderIds.filter(
      (id) => id !== columnId
    );
    setBoard(newBoard);

    deleteColumnDetailsApi(columnId).then((res) => toast.success(res.message));
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
        createNewColumn={createNewColumn}
        createNewCard={createNewCard}
        moveColumns={moveColumns}
        moveCardInSameColumn={moveCardInSameColumn}
        moveCardInDifferentColumn={moveCardInDifferentColumn}
        deleteColumnDetails={deleteColumnDetails}
      />
    </Container>
  );
}

export default Board;
