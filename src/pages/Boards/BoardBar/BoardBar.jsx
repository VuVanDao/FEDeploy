import { Avatar, AvatarGroup, Box, Button, Chip, Tooltip } from "@mui/material";
import React from "react";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PublicIcon from "@mui/icons-material/Public";
import AddToDriveIcon from "@mui/icons-material/AddToDrive";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import FilterListIcon from "@mui/icons-material/FilterList";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { capitalizeFirstLetter } from "~/utils/formatter";
const STYLE_COMMON = {
  color: (theme) => (theme.palette.mode === "dark" ? "primary.main" : "white"),
  "& .MuiSvgIcon-root": {
    color: (theme) =>
      theme.palette.mode === "dark" ? "primary.main" : "white",
  },
  display: "flex",
  alignItems: "center",
  padding: "5px 10px",
  "&:hover": {
    bgcolor: "primary.50",
  },
};
const BoardBar = (props) => {
  let { board } = props;
  return (
    <Box
      px={2}
      sx={{
        width: "100%",
        height: (theme) => theme.trelloCustom.boardBarHeight,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        overflowX: "auto",
        gap: 2,
        borderBottom: "1px solid white",
        bgcolor: (theme) =>
          theme.palette.mode === "dark" ? "#34495e" : "#1976d2",
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
        <Tooltip title={board?.description}>
          <Chip
            icon={<DashboardIcon />}
            label={capitalizeFirstLetter(board?.title)}
            clickable
            sx={STYLE_COMMON}
          />
        </Tooltip>
        <Chip
          icon={<PublicIcon />}
          label={capitalizeFirstLetter(board?.type)}
          clickable
          sx={STYLE_COMMON}
        />
        <Chip
          icon={<AddToDriveIcon />}
          label="Add to google drive"
          clickable
          sx={STYLE_COMMON}
        />
        <Chip
          icon={<AutoAwesomeIcon />}
          label="Automation"
          clickable
          sx={STYLE_COMMON}
        />
        <Chip
          icon={<FilterListIcon />}
          label="Filter"
          clickable
          sx={STYLE_COMMON}
        />
      </Box>
      <Box sx={{ display: "flex", alignItems: "center", gap: 3 }}>
        <Button
          variant="outlined"
          startIcon={<AddCircleOutlineIcon />}
          sx={{
            borderColor: (theme) =>
              theme.palette.mode === "dark" ? "primary.main" : "white",
            color: (theme) =>
              theme.palette.mode === "dark" ? "primary.main" : "white",
            "&:hover": {
              borderColor: (theme) =>
                theme.palette.mode === "dark" ? "primary.main" : "white",
            },
          }}
        >
          Invite
        </Button>

        <AvatarGroup
          max={5}
          sx={{
            "& .MuiAvatar-root": {
              width: 35,
              height: 35,
              color: (theme) =>
                theme.palette.mode === "dark" ? "primary.main" : "white",
              borderColor: (theme) =>
                theme.palette.mode === "dark" ? "primary.main" : "white",
              cursor: "pointer",
              "&:first-of-type": {
                bgcolor: "#a4b0be",
              },
            },
            gap: "10px",
          }}
        >
          <Tooltip title="vanDao">
            <Avatar src="https://i.pinimg.com/originals/d0/8c/fc/d08cfc4ede88b38c1fe39020433dc889.gif" />
          </Tooltip>
          <Tooltip title="vanDao">
            <Avatar src="https://i.pinimg.com/originals/d0/8c/fc/d08cfc4ede88b38c1fe39020433dc889.gif" />
          </Tooltip>
          <Tooltip title="vanDao">
            <Avatar src="https://i.pinimg.com/originals/d0/8c/fc/d08cfc4ede88b38c1fe39020433dc889.gif" />
          </Tooltip>
          <Tooltip title="vanDao">
            <Avatar src="https://i.pinimg.com/originals/d0/8c/fc/d08cfc4ede88b38c1fe39020433dc889.gif" />
          </Tooltip>
          <Tooltip title="vanDao">
            <Avatar src="https://i.pinimg.com/originals/d0/8c/fc/d08cfc4ede88b38c1fe39020433dc889.gif" />
          </Tooltip>
          <Tooltip title="vanDao">
            <Avatar src="https://i.pinimg.com/originals/d0/8c/fc/d08cfc4ede88b38c1fe39020433dc889.gif" />
          </Tooltip>
        </AvatarGroup>
      </Box>
    </Box>
  );
};

export default BoardBar;
