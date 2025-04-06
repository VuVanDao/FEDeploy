import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  useColorScheme,
} from "@mui/material";
import React from "react";
import LightModeIcon from "@mui/icons-material/LightMode";
import NightlightIcon from "@mui/icons-material/Nightlight";
import SettingsSuggestIcon from "@mui/icons-material/SettingsSuggest";

const ModeSelect = () => {
  const { mode, setMode } = useColorScheme();
  const handleChange = (event) => {
    setMode(event.target.value);
  };
  return (
    <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
      <InputLabel
        id="demo-select-small-label"
        sx={{
          color: (theme) =>
            theme.palette.mode === "dark" ? "primary.main" : "white",
          "&.Mui-focused": {
            color: (theme) =>
              theme.palette.mode === "dark" ? "primary.main" : "white",
          },
        }}
      >
        Mode
      </InputLabel>
      <Select
        labelId="demo-select-small-label"
        id="demo-select-small"
        value={mode}
        label="Mode"
        onChange={handleChange}
        sx={{
          "&:hover .MuiOutlinedInput-notchedOutline": {
            borderColor: (theme) =>
              theme.palette.mode === "dark" ? "primary.main" : "white",
          },
          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderColor: (theme) =>
              theme.palette.mode === "dark" ? "primary.main" : "white",
          },
          ".MuiSvgIcon-root": {
            color: (theme) =>
              theme.palette.mode === "dark" ? "primary.main" : "white",
          },
          color: (theme) =>
            theme.palette.mode === "dark" ? "primary.main" : "white",
        }}
      >
        <MenuItem value={"light"}>
          <Box style={{ display: "flex", gap: "5px", alignItems: "center" }}>
            <LightModeIcon fontSize="small" /> Light
          </Box>
        </MenuItem>
        <MenuItem value={"dark"}>
          <Box style={{ display: "flex", gap: "5px", alignItems: "center" }}>
            <NightlightIcon fontSize="small" />
            Dark
          </Box>
        </MenuItem>
        <MenuItem value={"system"}>
          <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
            <SettingsSuggestIcon fontSize="small" />
            System
          </Box>
        </MenuItem>
      </Select>
    </FormControl>
  );
};

export default ModeSelect;
