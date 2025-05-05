import { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import CircularProgress from "@mui/material/CircularProgress";
import InputAdornment from "@mui/material/InputAdornment";
import SearchIcon from "@mui/icons-material/Search";
import { createSearchParams, useNavigate } from "react-router-dom";
import { fetchBoardAPI } from "~/apis";
import { useDebounceFn } from "~/customHook/useDebounceFn";

function AutoCompleteSearchBoard() {
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);

  const [boards, setBoards] = useState(null);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!open) {
      setBoards(null);
    }
  }, [open]);

  const handleInputSearchChange = (event) => {
    const searchValue = event.target?.value;
    if (!searchValue) return;

    const searchPath = `?${createSearchParams({ "q[title]": searchValue })}`;
    console.log(searchPath);

    setLoading(true);
    fetchBoardAPI(searchPath)
      .then((res) => {
        setBoards(res.boards || []);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  // boc handleInputSearchChange vao useDebounceFn va cho delay 1s sau khi dung go phim thi ms chat function
  const debounceSearchBoard = useDebounceFn(handleInputSearchChange);

  const handleSelectedBoard = (event, selectedBoard) => {
    if (selectedBoard) {
      navigate(`/boards/${selectedBoard._id}`);
    }
  };

  return (
    <Autocomplete
      sx={{ width: 220 }}
      id="asynchronous-search-board"
      noOptionsText={!boards ? "Type to search board..." : "No board found!"}
      open={open}
      onOpen={() => {
        setOpen(true);
      }}
      onClose={() => {
        setOpen(false);
      }}
      getOptionLabel={(board) => board.title}
      options={boards || []}
      isOptionEqualToValue={(option, value) => option._id === value._id}
      loading={loading}
      onInputChange={debounceSearchBoard}
      onChange={handleSelectedBoard}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Type to search..."
          size="small"
          InputProps={{
            ...params.InputProps,
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon sx={{ color: "white" }} />
              </InputAdornment>
            ),
            endAdornment: (
              <>
                {loading ? (
                  <CircularProgress sx={{ color: "white" }} size={20} />
                ) : null}
                {params.InputProps.endAdornment}
              </>
            ),
          }}
          sx={{
            "& label": {
              color: (theme) =>
                theme.palette.mode === "dark" ? "primary.main" : "white",
            },
            "& input": {
              color: (theme) =>
                theme.palette.mode === "dark" ? "primary.main" : "white",
            },
            "& label.Mui-focused": {
              color: (theme) =>
                theme.palette.mode === "dark" ? "primary.main" : "white",
            },
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                borderColor: (theme) =>
                  theme.palette.mode === "dark" ? "primary.main" : "white",
              },
              "&:hover fieldset": {
                borderColor: (theme) =>
                  theme.palette.mode === "dark" ? "primary.main" : "white",
              },
              "&.Mui-focused fieldset": {
                borderColor: (theme) =>
                  theme.palette.mode === "dark" ? "primary.main" : "white",
              },
            },
            ".MuiSvgIcon-root": {
              color: (theme) =>
                theme.palette.mode === "dark" ? "primary.main" : "white",
            },
          }}
        />
      )}
    />
  );
}

export default AutoCompleteSearchBoard;
