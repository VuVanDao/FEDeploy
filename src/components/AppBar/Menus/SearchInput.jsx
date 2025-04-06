import { alpha, Box, styled } from "@mui/material";
import React, { useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import InputBase from "@mui/material/InputBase";
const SearchInput = () => {
  const [inputValue, setInputValue] = useState("");
  const HandleOnChange = (e) => {
    console.log(e);
    setInputValue(e);
  };
  const Search = styled("div")(({ theme }) => ({
    position: "relative",
    padding: "0 10px",
    borderRadius: theme.shape.borderRadius,
    // "&:hover": {
    //   backgroundColor: alpha(theme.palette.primary.light, 0.25),
    // },
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(1),
      width: "auto",
    },
  }));
  const SearchIconWrapper = styled("div")(({ theme }) => ({
    color: theme.palette.primary.main,
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  }));
  const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: theme.palette.primary.main,
    width: "100%",
    "& .MuiInputBase-input": {
      padding: theme.spacing(2, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)})`,
      transition: theme.transitions.create("width"),
      [theme.breakpoints.up("sm")]: {
        width: "12ch",
        "&:focus": {
          width: "20ch",
        },
      },
    },
  }));
  return (
    <Box>
      <Search
        sx={{
          minWidth: 120,
          bgcolor: (theme) =>
            theme.palette.mode === "dark"
              ? alpha(theme.palette.primary.light, 0.25)
              : "white",
        }}
      >
        <SearchIconWrapper>
          <SearchIcon />
        </SearchIconWrapper>
        <StyledInputBase
          placeholder="Search…"
          inputProps={{ "aria-label": "search" }}
          value={inputValue}
          onChange={(e) => HandleOnChange(e.target.value)}
        />
      </Search>
    </Box>
  );
};

export default SearchInput;
