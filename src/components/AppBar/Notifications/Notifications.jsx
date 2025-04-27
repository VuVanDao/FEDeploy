import { useEffect, useState } from "react";
import moment from "moment";
import Badge from "@mui/material/Badge";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Tooltip from "@mui/material/Tooltip";
import Button from "@mui/material/Button";
import Chip from "@mui/material/Chip";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Divider from "@mui/material/Divider";
import GroupAddIcon from "@mui/icons-material/GroupAdd";
import DoneIcon from "@mui/icons-material/Done";
import NotInterestedIcon from "@mui/icons-material/NotInterested";
import { useDispatch, useSelector } from "react-redux";
import {
  addNotifications,
  fetchInvitationsAPI,
  selectCurrentNotification,
  updateBoardInvitationAPI,
  updateCurrentNotifications,
} from "~/redux/notification/notificationsSlice";

import { selectCurrentUser } from "~/redux/user/userSlice";
import { useNavigate } from "react-router-dom";
import { socketIoInstance } from "~/socketClient";

const BOARD_INVITATION_STATUS = {
  PENDING: "PENDING",
  ACCEPTED: "ACCEPTED",
  REJECTED: "REJECTED",
};

function Notifications() {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClickNotificationIcon = (event) => {
    setAnchorEl(event.currentTarget);

    //khi click vao thong bao thi set lai thong bao newNotification ve false
    setNewNotification(false);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  //lay du lieu notification tu trong redux
  const notifications = useSelector(selectCurrentNotification);

  const currentUser = useSelector(selectCurrentUser);
  const [newNotification, setNewNotification] = useState(false);

  //fetch cac invitation
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchInvitationsAPI());

    //tao 1 function xu li real time
    const onReceiveNewInvitation = (invitation) => {
      //neu user hiewn tai dang dang nhap trong redux la thang invitee trong invitation
      if (invitation.inviteeId === currentUser._id) {
        //them ban ghi invitation moi vao redux
        dispatch(addNotifications(invitation));
        //cap nhat trang thai co tb den
        setNewNotification(true);
      }
    };
    //lang nghe su kien realTime co ten FE_USER_INVITED_TO_BOARD tu server gui ve
    socketIoInstance.on("FE_USER_INVITED_TO_BOARD", onReceiveNewInvitation);

    return () => {
      socketIoInstance.off("FE_USER_INVITED_TO_BOARD", onReceiveNewInvitation);
    };
  }, [dispatch, currentUser._id]);

  const navigate = useNavigate();
  //cap nhat trang thai cua 1 loi moi join board
  const updateBoardInvitation = (status, invitationId) => {
    dispatch(updateBoardInvitationAPI({ status, invitationId })).then((res) => {
      // console.log("🚀 ~ dispatch ~ res:", res);
      if (
        res?.payload?.boardInvitation?.status ===
        BOARD_INVITATION_STATUS.ACCEPTED
      ) {
        navigate(`/boards/${res?.payload?.boardInvitation?.boardId}`);
      }
    });
  };

  return (
    <Box>
      <Tooltip title="Notifications">
        <Badge
          color="warning"
          // variant="none"
          variant={newNotification ? "dot" : "none"}
          sx={{ cursor: "pointer" }}
          id="basic-button-open-notification"
          aria-controls={open ? "basic-notification-drop-down" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
          onClick={handleClickNotificationIcon}
        >
          <NotificationsNoneIcon
            sx={{
              // color: 'white'
              color: (theme) =>
                theme.palette.mode === "dark" ? "primary.main" : "white",
            }}
          />
        </Badge>
      </Tooltip>

      <Menu
        sx={{ mt: 2 }}
        id="basic-notification-drop-down"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{ "aria-labelledby": "basic-button-open-notification" }}
      >
        {(!notifications || notifications.length === 0) && (
          <MenuItem sx={{ minWidth: 200 }}>
            You do not have any new notifications.
          </MenuItem>
        )}
        {notifications?.map((notifications, index) => (
          <Box key={index}>
            <MenuItem
              sx={{
                minWidth: 200,
                maxWidth: 360,
                overflowY: "auto",
              }}
            >
              <Box
                sx={{
                  maxWidth: "100%",
                  wordBreak: "break-word",
                  whiteSpace: "pre-wrap",
                  display: "flex",
                  flexDirection: "column",
                  gap: 1,
                }}
              >
                {/* Nội dung của thông báo */}
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <Box>
                    <GroupAddIcon fontSize="small" />
                  </Box>
                  <Box>
                    <strong>{notifications?.inviter?.displayName}</strong> had
                    invited you to join the board
                    <strong>{notifications?.board?.title}</strong>
                  </Box>
                </Box>

                {/* Khi Status của thông báo này là PENDING thì sẽ hiện 2 Button */}
                {notifications?.boardInvitation?.status ===
                  BOARD_INVITATION_STATUS.PENDING && (
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 1,
                      justifyContent: "flex-end",
                    }}
                  >
                    <Button
                      className="interceptor-loading"
                      type="submit"
                      variant="contained"
                      color="success"
                      size="small"
                      onClick={() =>
                        updateBoardInvitation(
                          BOARD_INVITATION_STATUS.ACCEPTED,
                          notifications?._id
                        )
                      }
                    >
                      Accept
                    </Button>
                    <Button
                      className="interceptor-loading"
                      type="submit"
                      variant="contained"
                      color="secondary"
                      size="small"
                      onClick={() =>
                        updateBoardInvitation(
                          BOARD_INVITATION_STATUS.REJECTED,
                          notifications?._id
                        )
                      }
                    >
                      Reject
                    </Button>
                  </Box>
                )}

                {/* Khi Status của thông báo này là ACCEPTED hoặc REJECTED thì sẽ hiện thông tin đó lên */}

                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                    justifyContent: "flex-end",
                  }}
                >
                  {notifications?.boardInvitation?.status ===
                    BOARD_INVITATION_STATUS.ACCEPTED && (
                    <Chip
                      icon={<DoneIcon />}
                      label="Accepted"
                      color="success"
                      size="small"
                    />
                  )}

                  {notifications?.boardInvitation?.status ===
                    BOARD_INVITATION_STATUS.REJECTED && (
                    <Chip
                      icon={<NotInterestedIcon />}
                      label="Rejected"
                      size="small"
                    />
                  )}
                </Box>

                {/* Thời gian của thông báo */}
                <Box sx={{ textAlign: "right" }}>
                  <Typography variant="span" sx={{ fontSize: "13px" }}>
                    {moment(notifications?.createdAt).format("llll")}
                  </Typography>
                </Box>
              </Box>
            </MenuItem>
            {/* Cái đường kẻ Divider sẽ không cho hiện nếu là phần tử cuối */}
            {index !== notifications.length - 1 && <Divider />}
          </Box>
        ))}
      </Menu>
    </Box>
  );
}

export default Notifications;
