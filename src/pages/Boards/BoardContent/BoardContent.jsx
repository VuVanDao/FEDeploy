import { Box } from "@mui/material";
import React, { useCallback, useEffect, useRef, useState } from "react";
import ListColumns from "./ListColumns/ListColumns";
import {
  DndContext,
  PointerSensor,
  // MouseSensor,
  // TouchSensor,
  useSensor,
  useSensors,
  DragOverlay,
  defaultDropAnimationSideEffects,
  closestCorners,
  pointerWithin,
  getFirstCollision,
} from "@dnd-kit/core";
import { arrayMove } from "@dnd-kit/sortable";
import Columns from "./ListColumns/Columns/Columns";
import Card from "./ListColumns/Columns/ListCards/Card/Card";
import { cloneDeep, isEmpty } from "lodash";
import { generatePlaceholderCard } from "~/utils/formatter";
import { MouseSensor, TouchSensor } from "~/customLibraries/DndKitSensor";

const ACTIVE_DRAG_ITEM_TYPE = {
  column: "ACTIVE_DRAG_ITEM_TYPE_COLUMN",
  card: "ACTIVE_DRAG_ITEM_TYPE_CARD",
};

const BoardContent = (props) => {
  const {
    board,
    createNewColumn,
    createNewCard,
    moveColumns,
    moveCardInSameColumn,
    moveCardInDifferentColumn,
    deleteColumnDetails,
  } = props;
  const [orderColumnState, setOrderColumnState] = useState([]);
  const [activeDragItemId, setActiveDragItemId] = useState(null);
  const [activeDragItemType, setActiveDragItemType] = useState(null);
  const [activeDragItemData, setActiveDragItemData] = useState(null);
  const [oldColumnWhenDraggingCard, setOldColumnWhenDraggingCard] =
    useState(null);
  const lastOverId = useRef(null);
  useEffect(() => {
    // console.log(board?.columns);
    setOrderColumnState(board?.columns);
  }, [board]);

  const findColumnByCardId = (cardId) => {
    // console.log(cardId);
    return orderColumnState.find((column) =>
      column.cards.map((card) => card._id)?.includes(cardId)
    );
  };
  const moveCardBetweenDifferentColumns = (
    overColumn,
    overDraggingCardId,
    active,
    over,
    activeColumn,
    activeDraggingCardId,
    triggerFrom
  ) => {
    setOrderColumnState((prevColumns) => {
      //prevColumns: orderColumnState

      //dcu doan nay kho hieu vc
      const overCardIndex = overColumn?.cards?.findIndex(
        //tim index overCard noi activeCard sap duoc tha
        (card) => card._id === overDraggingCardId
      );
      // console.log("overCardIndex", overCardIndex);
      let newCardIndex;
      const isBelowOverItem =
        active.rect.current.translated &&
        active.rect.current.translated.top > over.rect.top + over.rect.height;
      const modifier = isBelowOverItem ? 1 : 0;
      newCardIndex =
        overCardIndex >= 0
          ? overCardIndex + modifier
          : overColumn?.cards.length + 1;
      // console.log("isBelowOverItem", isBelowOverItem);
      // console.log("modifier", modifier);
      // console.log("newCardIndex", newCardIndex);

      const nextColumns = cloneDeep(prevColumns); // clone orderColumnState , orderColumnState chua list cac column

      // console.log("nextColumn", nextColumns);

      //tim vi tri 2 column active va over

      const nextActiveColumn = nextColumns.find(
        (column) => column._id === activeColumn._id
      );
      // console.log("nextActiveColumn", nextActiveColumn);

      if (nextActiveColumn) {
        nextActiveColumn.cards = nextActiveColumn.cards.filter(
          (card) => card._id !== activeDraggingCardId
        );
        nextActiveColumn.cardOrderIds = nextActiveColumn.cards.map(
          (card) => card._id
        );
      }
      //them placeholder card de fix loi column empty
      if (isEmpty(nextActiveColumn.cards)) {
        nextActiveColumn.cards = [generatePlaceholderCard(nextActiveColumn)];
      }
      const nextOverColumn = nextColumns.find(
        (column) => column._id === overColumn._id
      );
      // console.log("nextOverColumn", nextOverColumn);
      if (nextOverColumn) {
        nextOverColumn.cards = nextOverColumn.cards.filter(
          (card) => card._id !== activeDraggingCardId
        );
        //cap nhat lai data cua card khi di chuyen giua 2 column
        const rebuild_activeDraggingData = {
          ...activeDragItemData,
          columnId: nextOverColumn._id,
        };
        nextOverColumn.cards = nextOverColumn.cards.toSpliced(
          newCardIndex,
          0,
          rebuild_activeDraggingData
        );
        nextOverColumn.cards = nextOverColumn.cards.filter(
          (card) => !card.FE_placeholderCard
        );
        nextOverColumn.cardOrderIds = nextOverColumn.cards.map(
          (card) => card._id
        );
      }
      if (triggerFrom === "handleDragEnd") {
        moveCardInDifferentColumn(
          activeDraggingCardId,
          oldColumnWhenDraggingCard._id,
          nextOverColumn._id,
          nextColumns
        );
      }
      // console.log("nextColumns", nextColumns);
      return nextColumns; //bạn đang thay đổi dữ liệu bên trong nextColumns thông qua các biến nextActiveColumn và nextOverColumn,
      //  và điều đó ảnh hưởng đến nextColumns.
    });
  };
  const handleDragStart = (event) => {
    // console.log(event);
    setActiveDragItemId(event?.active?.id);
    setActiveDragItemType(
      event?.active?.data?.current?.columnId
        ? ACTIVE_DRAG_ITEM_TYPE.card
        : ACTIVE_DRAG_ITEM_TYPE.column
    );
    setActiveDragItemData(event?.active?.data?.current);
    //neu keo card thi moi set oldColumn
    if (event?.active?.data?.current?.columnId) {
      setOldColumnWhenDraggingCard(findColumnByCardId(event?.active?.id));
    }
  };
  const handleDragOver = (event) => {
    // console.log("------------------------");
    if (activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.column) {
      return;
    }
    // console.log(event);
    const { active, over } = event;
    if (!over || !active) return;
    //tim card active va over card
    const {
      id: activeDraggingCardId, //id cua card dragging, vidu: card-id-8
      data: { current: activeDraggingCardData }, //data cua card
    } = active;
    const {
      id: overDraggingCardId,
      data: { current: overDraggingCardData },
    } = over; // thuong la card bi mat vi tri
    // console.log("active", active);
    // console.log("over", over);

    //di tim data cua column
    //findColumnByCardId tra ve data cua 1 column
    const activeColumn = findColumnByCardId(activeDraggingCardId); // column dragging
    const overColumn = findColumnByCardId(overDraggingCardId);
    // console.log("activeColumn", activeColumn);
    // console.log("overColumn", overColumn);
    if (!activeColumn || !overColumn) return;

    //neu 2 column khac nhau
    if (activeColumn._id !== overColumn._id) {
      // console.log("activeColumn._id !== overColumn._id");
      moveCardBetweenDifferentColumns(
        overColumn,
        overDraggingCardId,
        active,
        over,
        activeColumn,
        activeDraggingCardId,
        "handleDragOver"
      );
    }
  };
  const handleDragEnd = async (event) => {
    // console.log(event);
    const { active, over } = event;
    if (!over || !active) return;
    //xu li keo tha card
    if (activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.card) {
      const {
        id: activeDraggingCardId,
        data: { current: activeDraggingCardData },
      } = active;
      const {
        id: overDraggingCardId,
        data: { current: overDraggingCardData },
      } = over;
      // console.log("active", active);
      // console.log("over", over);
      const activeColumn = findColumnByCardId(activeDraggingCardId);
      const overColumn = findColumnByCardId(overDraggingCardId);
      // console.log("activeColumn", activeColumn);
      // console.log("overColumn", overColumn);

      if (!activeColumn || !overColumn) return;
      if (oldColumnWhenDraggingCard._id !== overColumn._id) {
        //2 card khac column
        // console.log("not same");
        moveCardBetweenDifferentColumns(
          overColumn,
          overDraggingCardId,
          active,
          over,
          activeColumn,
          activeDraggingCardId,
          "handleDragEnd"
        );
      } else {
        // 2 card cung column
        const oldCardIndex = oldColumnWhenDraggingCard.cards.findIndex(
          (c) => c._id === activeDragItemId //activeDragItemId : khi dragStart thi bien nay duoc luu cho den khi cuoi dragEnd thi xoa
        ); //tim vi tri cu cua card
        const newCardIndex = overColumn.cards.findIndex(
          (c) => c._id === overDraggingCardId
        ); //tim vi tri moi cua card
        const dndOrderCards = arrayMove(
          oldColumnWhenDraggingCard?.cards,
          oldCardIndex,
          newCardIndex
        ); // sap xep lai cards
        // console.log("dndOrderCards", dndOrderCards);
        const dndOrderCardsIds = dndOrderCards.map((c) => c._id);
        setOrderColumnState((prevColumns) => {
          const nextColumn = cloneDeep(prevColumns);
          const targetColumn = nextColumn.find((c) => c._id === overColumn._id);
          targetColumn.cards = dndOrderCards;
          targetColumn.cardOrderIds = dndOrderCardsIds;
          // console.log("targetColumn", targetColumn);
          return nextColumn;
        });
        moveCardInSameColumn(
          dndOrderCards,
          dndOrderCardsIds,
          oldColumnWhenDraggingCard._id
        );
      }
    }

    //xu li keo tha column trong 1 boardContent
    if (activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.column) {
      if (active.id !== over.id) {
        const oldIndex = orderColumnState.findIndex((c) => c._id === active.id); //tim vi tri cu cua column
        const newIndex = orderColumnState.findIndex((c) => c._id === over.id); //tim vi tri moi cua column
        const dndOrderColumn = arrayMove(orderColumnState, oldIndex, newIndex); //sap xep lai column keo tha
        // const dndOrderColumnIds = dndOrderColumn.map((c) => c._id);
        setOrderColumnState(dndOrderColumn);
        await moveColumns(dndOrderColumn);
        // console.log("dndOrderColumn", dndOrderColumn);
      }
    }
    setActiveDragItemId(null);
    setActiveDragItemType(null);
    setActiveDragItemData(null);
    setOldColumnWhenDraggingCard(null);
  };

  const pointerSensor = useSensor(PointerSensor, {
    activationConstraint: { distance: 10 },
  });
  const mouseSensor = useSensor(MouseSensor, {
    activationConstraint: { distance: 10 },
  });
  const touchSensor = useSensor(TouchSensor, {
    activationConstraint: { delay: 250, tolerance: 5 },
  });
  // const sensors = useSensors(pointerSensor);
  const sensors = useSensors(mouseSensor, touchSensor);

  const customDropAnimation = {
    sideEffects: defaultDropAnimationSideEffects({
      styles: {
        active: {
          opacity: 0.5,
        },
      },
    }),
  };
  const collisionDetectionStrategy = useCallback(
    (args) => {
      if (activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.column) {
        return closestCorners({ ...args });
      }
      const pointerIntersections = pointerWithin(args);
      if (!pointerIntersections.length) {
        return;
      }
      //thuat toan phat trien va cham se tra ve cac mang va cham
      // const intersections = !!pointerIntersections?.length
      //   ? pointerIntersections
      //   : rectIntersection(args);

      let overId = getFirstCollision(pointerIntersections, "id");
      if (overId) {
        const checkColumn = orderColumnState.find(
          (column) => column._id === overId
        );
        if (checkColumn) {
          overId = closestCorners({
            ...args,
            droppableContainers: args.droppableContainers.filter(
              (container) => {
                return (
                  container.id !== overId &&
                  checkColumn?.cardOrderIds?.includes(container.id)
                );
              }
            ),
          })[0]?.id;
        }
        lastOverId.current = overId;
        return [{ id: overId }];
      }
      return lastOverId.current ? [{ id: lastOverId.current }] : [];
    },
    [activeDragItemType, orderColumnState]
  );

  return (
    <DndContext
      onDragEnd={handleDragEnd}
      // collisionDetection={closestCorners}
      collisionDetection={collisionDetectionStrategy}
      sensors={sensors}
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
    >
      <Box
        sx={{
          backgroundColor: (theme) =>
            theme.palette.mode === "dark" ? "#34495e" : "#1976d2",
          width: "100%",
          height: (theme) => theme.trelloCustom.boardContentHeight,
          p: "6px 0",
        }}
      >
        <ListColumns
          columns={orderColumnState}
          createNewColumn={createNewColumn}
          createNewCard={createNewCard}
          deleteColumnDetails={deleteColumnDetails}
        />
        <DragOverlay dropAnimation={customDropAnimation}>
          {!activeDragItemType && null}
          {activeDragItemId &&
            activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.column && (
              <Columns column={activeDragItemData} />
            )}
          {activeDragItemId &&
            activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.card && (
              <Card card={activeDragItemData} />
            )}
        </DragOverlay>
      </Box>
    </DndContext>
  );
};

export default BoardContent;
