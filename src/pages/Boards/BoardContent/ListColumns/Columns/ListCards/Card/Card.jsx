import React from "react";
import GroupsIcon from "@mui/icons-material/Groups";
import ModeCommentIcon from "@mui/icons-material/ModeComment";
import InsertLinkIcon from "@mui/icons-material/InsertLink";
import { Button } from "@mui/material";
import {
  Card as MuiCard,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

const Card = ({ card }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: card._id, data: { ...card } });
  const dndKitCardStyles = {
    transform: CSS.Translate.toString(transform),
    transition,
    touchAction: "none",
    opacity: isDragging ? 0.5 : undefined,
    border: isDragging ? "1px solid #2ecc71" : undefined,
  };

  return (
    <>
      <MuiCard
        ref={setNodeRef}
        style={dndKitCardStyles}
        {...attributes}
        {...listeners}
        sx={{
          cursor: "pointer",
          boxShadow: "0 14px 28px 0 rgba(0, 0, 0, 0.05)",
          bgcolor: (theme) =>
            theme.palette.mode === "dark" ? "black" : "white",
          color: (theme) => (theme.palette.mode === "dark" ? "white" : "black"),
          overflow: "unset",
          opacity: card?.FE_placeholderCard ? "0" : "1",
          // overflow: card?.FE_placeholderCard ? "none" : "block",
          height: card?.FE_placeholderCard ? "0px" : "unset",
        }}
      >
        {card?.cover && (
          <CardMedia
            sx={{
              height: 140,
              backgroundSize: "content",
            }}
            image={card?.cover}
            title="frieren"
          />
        )}

        <CardContent
          sx={{
            "&:last-child": {
              p: 0.5,
            },
          }}
        >
          <Typography>{card?.title}</Typography>
        </CardContent>
        <CardActions sx={{ p: "0 4px 8px 4px" }}>
          <Button
            size="small"
            startIcon={<GroupsIcon />}
            sx={{
              color: (theme) =>
                theme.palette.mode === "dark" ? "white" : "#1565c0",
            }}
          >
            {!!card?.memberIds?.length ? card?.memberIds?.length : 0}
          </Button>

          <Button
            size="small"
            startIcon={<ModeCommentIcon />}
            sx={{
              color: (theme) =>
                theme.palette.mode === "dark" ? "white" : "#1565c0",
            }}
          >
            {!!card?.comments?.length ? card?.comments?.length : 0}
          </Button>
          <Button
            size="small"
            startIcon={<InsertLinkIcon />}
            sx={{
              color: (theme) =>
                theme.palette.mode === "dark" ? "white" : "#1565c0",
            }}
          >
            {!!card?.attachments?.length ? card?.attachments?.length : 0}
          </Button>
        </CardActions>
      </MuiCard>
    </>
  );
};

export default Card;
