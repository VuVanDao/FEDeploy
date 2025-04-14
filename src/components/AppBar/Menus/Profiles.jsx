import {
  Avatar,
  Box,
  Divider,
  ListItemIcon,
  Menu,
  MenuItem,
  Tooltip,
} from "@mui/material";
import React from "react";
import GroupAddIcon from "@mui/icons-material/GroupAdd";
import SettingsIcon from "@mui/icons-material/Settings";
import LogoutIcon from "@mui/icons-material/Logout";
import { useConfirm } from "material-ui-confirm";
import { useDispatch, useSelector } from "react-redux";
import { LogoutUserAPI, selectCurrentUser } from "~/redux/user/userSlice";
import { Link } from "react-router-dom";
const Profiles = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const dispatch = useDispatch();
  const currentUser = useSelector(selectCurrentUser);
  const confirmDeleteColumn = useConfirm();
  const handleLogout = () => {
    confirmDeleteColumn({
      title: "log out ?",
      description: "logout this account?",
      // confirmationKeyword: "vandao",
    })
      .then(() => {
        dispatch(LogoutUserAPI());
      })
      .catch(() => {});
  };
  return (
    <Box>
      <Tooltip
        id="basic-button-profiles"
        aria-controls={open ? "basic-menu-profiles" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
        title="personal account"
        // endIcon={open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
      >
        <Avatar
          sx={{ width: "32px", height: "32px" }}
          src={currentUser?.avatar}
        ></Avatar>
      </Tooltip>
      <Menu
        id="basic-menu-profiles"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button-profiles",
        }}
      >
        <Link
          to={"/settings/account"}
          style={{ textDecoration: "none", color: "inherit" }}
        >
          <MenuItem
            sx={{
              "&:hover": {
                color: "success.light",
              },
            }}
          >
            <Avatar
              sx={{ width: "25px", height: "25px", mr: 2 }}
              src={currentUser?.avatar}
            />
            Profile
          </MenuItem>
        </Link>
        <Divider />
        <MenuItem>
          <ListItemIcon>
            <GroupAddIcon />
          </ListItemIcon>
          Add another account
        </MenuItem>
        <MenuItem>
          <ListItemIcon>
            <SettingsIcon />
          </ListItemIcon>
          Settings
        </MenuItem>
        <Divider />
        <MenuItem
          sx={{
            "&:hover": {
              color: "error.light",
              "& .logout-icon": {
                color: "error.light",
              },
            },
          }}
          onClick={handleLogout}
        >
          <ListItemIcon>
            <LogoutIcon className="logout-icon" />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
    </Box>
  );
};

export default Profiles;
