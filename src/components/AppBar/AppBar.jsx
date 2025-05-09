import { Badge, Box, Button, Tooltip, Typography } from "@mui/material";
import React from "react";
import ModeSelect from "~/components/ModeSelect/ModeSelect";
import AppsIcon from "@mui/icons-material/Apps";
import SvgIcon from "@mui/material/SvgIcon";
import { ReactComponent as trelloIcon } from "~/assets/trello.svg";
import WorkSpaces from "./Menus/WorkSpaces";
import Recent from "./Menus/Recent";
import Started from "./Menus/Started";
import Templates from "./Menus/Templates";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import Profiles from "./Menus/Profiles";
import { Link } from "react-router-dom";
import Notifications from "./Notifications/Notifications";
import AutoCompleteSearchBoard from "./SearchBoards/AutoCompleteSearchBoard";
const AppBar = () => {
  return (
    <Box
      px={2}
      sx={{
        width: "100%",
        height: (theme) => theme.trelloCustom.appBarHeight,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        overflowX: "auto",
        bgcolor: (theme) =>
          theme.palette.mode === "dark" ? "#2c3e50" : "#1565c0",
        gap: 3,
      }}
    >
      <Box
        sx={{ display: "flex", alignItems: "center", gap: 2 }}
        component={Link}
        to="/boards"
      >
        <Tooltip title="Trello Home" arrow>
          <AppsIcon
            sx={{
              color: (theme) =>
                theme.palette.mode === "dark" ? "primary.main" : "white",
            }}
          />
        </Tooltip>
        <Link to={"/"} style={{ textDecoration: "none" }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <SvgIcon
              component={trelloIcon}
              inheritViewBox
              sx={{
                color: (theme) =>
                  theme.palette.mode === "dark" ? "primary.main" : "white",
              }}
            />
            <Typography
              variant="span"
              sx={{
                fontSize: "1.2rem",
                fontWeight: "bold",
                color: (theme) =>
                  theme.palette.mode === "dark" ? "primary.main" : "white",
              }}
            >
              Trello
            </Typography>
          </Box>
        </Link>
        <Box sx={{ display: { xs: "none", md: "flex" }, gap: 1 }}>
          <WorkSpaces />
          <Recent />
          <Started />
          <Templates />
          <Button
            variant="outlined"
            sx={{
              color: (theme) =>
                theme.palette.mode === "dark" ? "primary.main" : "white",
            }}
          >
            Create
          </Button>
        </Box>
      </Box>
      <Box sx={{ display: "flex", alignItems: "center", gap: 3 }}>
        <AutoCompleteSearchBoard />

        {/* dark-light-mode */}
        <ModeSelect />

        {/* <Tooltip title="Notification">
          <Badge variant="dot" color="warning" sx={{ cursor: "pointer" }}>
            <NotificationsIcon
              sx={{
                color: (theme) =>
                  theme.palette.mode === "dark" ? "primary.main" : "white",
              }}
            />
          </Badge>
        </Tooltip> */}

        <Notifications />

        <Tooltip title="Help">
          <Badge
            variant="dot"
            sx={{
              cursor: "pointer",
              color: (theme) =>
                theme.palette.mode === "dark" ? "primary.main" : "white",
            }}
          >
            <HelpOutlineIcon />
          </Badge>
        </Tooltip>
        <Profiles />
      </Box>
    </Box>
  );
};

export default AppBar;
