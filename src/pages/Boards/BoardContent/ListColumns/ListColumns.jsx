import React, { useState } from "react";
import { Box, Button, Input, InputAdornment, Tooltip } from "@mui/material";
import Columns from "./Columns/Columns";
import AddIcon from "@mui/icons-material/Add";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import CloseIcon from "@mui/icons-material/Close";
import {
  SortableContext,
  horizontalListSortingStrategy,
} from "@dnd-kit/sortable";
import { toast } from "react-toastify";
const ListColumns = ({
  columns,
  createNewColumn,
  createNewCard,
  deleteColumnDetails,
}) => {
  const [openNewColumnForm, setNewColumnForm] = useState(false);
  const [newColumnTitle, setNewColumnTitle] = useState("");
  const toggleOpenNewColumnForm = () => setNewColumnForm(!openNewColumnForm);
  const addNewColumn = async () => {
    if (!newColumnTitle) {
      toast.error("plz type your column title");
      return;
    }
    const newColumnData = {
      title: newColumnTitle,
    };
    await createNewColumn(newColumnData);
    toast.success("add new column");
    setNewColumnTitle("");
    toggleOpenNewColumnForm(!openNewColumnForm);
  };
  return (
    <SortableContext
      items={columns?.map((c) => c._id)}
      strategy={horizontalListSortingStrategy}
    >
      {/* bao boc cac column */}
      <Box
        sx={{
          bgcolor: "inherit",
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "start",
          overflowX: "auto",
          overflowY: "hidden",
          mt: "3px",
          "&::-webkit-scrollbar-track": {
            m: 2,
          },
        }}
      >
        {columns?.map((column) => (
          <Columns
            key={column._id}
            column={column}
            createNewCard={createNewCard}
            deleteColumnDetails={deleteColumnDetails}
          />
        ))}
        {/* btn add column */}
        {!openNewColumnForm ? (
          <Box
            sx={{
              minWidth: "200px",
              maxWidth: "200px",
              mx: 2,
              borderRadius: "6px",
              height: "fit-content",
              bgcolor: "#ffffff3d",
            }}
          >
            <Button
              startIcon={<AddIcon />}
              sx={{
                width: "100%",
                color: (theme) =>
                  theme.palette.mode === "dark" ? "primary.main" : "white",
              }}
              onClick={() => toggleOpenNewColumnForm()}
            >
              Add new column
            </Button>
          </Box>
        ) : (
          <Box
            sx={{
              minWidth: "200px",
              maxWidth: "200px",
              mx: 2,
              p: 1,
              borderRadius: "6px",
              height: "fit-content",
              bgcolor: "#ffffff3d",
              display: "flex",
              flexDirection: "column",
              gap: 1,
            }}
          >
            <Input
              label="Outlined"
              variant="outlined"
              value={newColumnTitle}
              placeholder="Column title"
              autoFocus
              onChange={(e) => setNewColumnTitle(e.target.value)}
              sx={{
                border: "1px solid white",
                "&.MuiInput-root::before": {
                  borderBottomColor: "transparent",
                },
                "&.MuiInput-root::after": {
                  borderBottomColor: "transparent",
                },
                borderColor: (theme) =>
                  theme.palette.mode === "dark" ? "primary.main" : "white",
                borderRadius: "5px",
                color: (theme) =>
                  theme.palette.mode === "dark" ? "primary.main" : "white",
                p: 0.5,
              }}
              endAdornment={
                <InputAdornment
                  position="start"
                  onClick={() => setNewColumnTitle("")}
                  sx={{ cursor: "pointer" }}
                >
                  <HighlightOffIcon
                    sx={{
                      color: (theme) =>
                        newColumnTitle.length > 0
                          ? theme.palette.mode === "dark"
                            ? "primary.main"
                            : "white"
                          : "transparent",
                    }}
                  />
                </InputAdornment>
              }
            />
            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
              <Button
                variant="contained"
                color={"success"}
                onClick={() => addNewColumn()}
              >
                Add column
              </Button>
              <Tooltip title="cancel">
                <CloseIcon
                  sx={{
                    color: (theme) =>
                      theme.palette.mode === "dark" ? "primary.main" : "white",
                    cursor: "pointer",
                  }}
                  onClick={toggleOpenNewColumnForm}
                />
              </Tooltip>
            </Box>
          </Box>
        )}
      </Box>
    </SortableContext>
  );
};

export default ListColumns;
