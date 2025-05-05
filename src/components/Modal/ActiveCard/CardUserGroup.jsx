import { useState } from "react";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";
import Popover from "@mui/material/Popover";
import AddIcon from "@mui/icons-material/Add";
import Badge from "@mui/material/Badge";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { selectCurrentActiveBoard } from "~/redux/activeBoard/activeBoardSlice";
import { useSelector } from "react-redux";
import { CARD_MEMBER_ACTION } from "~/utils/constants";
import { selectCurrentUser } from "~/redux/user/userSlice";

function CardUserGroup({ cardMemberIds = [], onUpdateCardMember }) {
  const [anchorPopoverElement, setAnchorPopoverElement] = useState(null);
  const isOpenPopover = Boolean(anchorPopoverElement);
  const popoverId = isOpenPopover ? "card-all-users-popover" : undefined;
  const handleTogglePopover = (event) => {
    if (!anchorPopoverElement) setAnchorPopoverElement(event.currentTarget);
    else setAnchorPopoverElement(null);
  };
  //lay activeBoard tu redux muc dich la lay toan bo thong tin nhung thanh vien cua board
  const board = useSelector(selectCurrentActiveBoard);
  const user = useSelector(selectCurrentUser);

  //thanh vien trong card phai la tap con thanh vien trong board
  //vi the dua vao board.FE_AllUsers va cardMemberIds.memberIds de lay ra cac member cua card, boi trong activeCard moi chi luu id
  const FE_CardMembers = board.FE_AllUsers?.filter((user) =>
    cardMemberIds.includes(user._id)
  );
  // console.log("🚀 ~ CardUserGroup ~ FE_CardMembers:", FE_CardMembers);

  const handleUpdateCardMember = (user) => {
    //tao 1 bien incomingCardInfo gui cho BE , voi 2 tt la userId va action la xoa khoi card (remove) or them vao card (add)
    const incomingCardInfo = {
      userId: user._id,
      action: cardMemberIds.includes(user?._id)
        ? CARD_MEMBER_ACTION.REMOVE
        : CARD_MEMBER_ACTION.ADD,
    };
    onUpdateCardMember(incomingCardInfo);
  };

  return (
    <Box sx={{ display: "flex", gap: "4px", flexWrap: "wrap" }}>
      {/* Hiển thị các user là thành viên của card */}
      {FE_CardMembers.map((user, index) => (
        <Tooltip title={user?.username} key={index}>
          <Avatar
            sx={{ width: 34, height: 34, cursor: "pointer" }}
            alt={user?.displayName}
            src={user?.avatar}
          />
        </Tooltip>
      ))}
      {/* Nút này để mở popover thêm member */}
      {board.ownerIds.includes(user._id) ? (
        <Tooltip title="Add new member">
          <Box
            aria-describedby={popoverId}
            onClick={handleTogglePopover}
            sx={{
              width: 36,
              height: 36,
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "14px",
              fontWeight: "600",
              borderRadius: "50%",
              color: (theme) =>
                theme.palette.mode === "dark" ? "#90caf9" : "#172b4d",
              bgcolor: (theme) =>
                theme.palette.mode === "dark"
                  ? "#2f3542"
                  : theme.palette.grey[200],
              "&:hover": {
                color: (theme) =>
                  theme.palette.mode === "dark" ? "#000000de" : "#0c66e4",
                bgcolor: (theme) =>
                  theme.palette.mode === "dark" ? "#90caf9" : "#e9f2ff",
              },
            }}
          >
            <AddIcon fontSize="small" />
          </Box>
        </Tooltip>
      ) : (
        ""
      )}

      {/* Khi Click vào + ở trên thì sẽ mở popover hiện toàn bộ users trong board để người dùng Click chọn thêm vào card  */}
      <Popover
        id={popoverId}
        open={isOpenPopover}
        anchorEl={anchorPopoverElement}
        onClose={handleTogglePopover}
        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
      >
        <Box
          sx={{
            p: 2,
            maxWidth: "260px",
            display: "flex",
            flexWrap: "wrap",
            gap: 1.5,
          }}
        >
          {board.FE_AllUsers.map((user, index) => (
            <Tooltip title={user?.username} key={index}>
              <Badge
                sx={{ cursor: "pointer" }}
                overlap="rectangular"
                anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                badgeContent={
                  cardMemberIds.includes(user?._id) ? (
                    <CheckCircleIcon
                      fontSize="small"
                      sx={{ color: "#27ae60" }}
                    />
                  ) : (
                    ""
                  )
                }
                onClick={() => handleUpdateCardMember(user)}
              >
                <Avatar
                  sx={{ width: 34, height: 34 }}
                  alt={user?.displayName}
                  src={user?.avatar}
                />
              </Badge>
            </Tooltip>
          ))}
        </Box>
      </Popover>
    </Box>
  );
}

export default CardUserGroup;
