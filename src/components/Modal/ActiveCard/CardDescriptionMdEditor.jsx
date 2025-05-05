import { useState } from "react";
import { useColorScheme } from "@mui/material/styles";
import MDEditor from "@uiw/react-md-editor";
import rehypeSanitize from "rehype-sanitize";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import EditNoteIcon from "@mui/icons-material/EditNote";
import { useSelector } from "react-redux";
import { selectCurrentActiveBoard } from "~/redux/activeBoard/activeBoardSlice";
import { selectCurrentUser } from "~/redux/user/userSlice";

function CardDescriptionMdEditor({
  cardDescriptionProp,
  handleCardDescription,
}) {
  const board = useSelector(selectCurrentActiveBoard);
  const user = useSelector(selectCurrentUser);
  const { mode } = useColorScheme();

  const [markdownEditMode, setMarkdownEditMode] = useState(false);

  const [cardDescription, setCardDescription] = useState(cardDescriptionProp);

  const updateCardDescription = () => {
    handleCardDescription(cardDescription);
    setMarkdownEditMode(false);
    // console.log("cardDescription: ", cardDescription);
  };

  return (
    <Box sx={{ mt: -4 }}>
      {markdownEditMode ? (
        <Box sx={{ mt: 5, display: "flex", flexDirection: "column", gap: 1 }}>
          <Box data-color-mode={mode}>
            <MDEditor
              value={cardDescription}
              onChange={setCardDescription}
              previewOptions={{ rehypePlugins: [[rehypeSanitize]] }}
              height={400}
              preview="edit" //
              // hideToolbar={true}
            />
          </Box>
          <Button
            sx={{ alignSelf: "flex-end" }}
            onClick={updateCardDescription}
            className="interceptor-loading"
            type="button"
            variant="contained"
            size="small"
            color="info"
          >
            Save
          </Button>
        </Box>
      ) : (
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          {board.ownerIds.includes(user._id) ? (
            <Button
              sx={{ alignSelf: "flex-end" }}
              onClick={() => setMarkdownEditMode(true)}
              type="button"
              variant="contained"
              color="info"
              size="small"
              startIcon={<EditNoteIcon />}
            >
              Edit
            </Button>
          ) : (
            <Button sx={{ opacity: 0, cursor: "default" }}>Edit</Button>
          )}

          <Box data-color-mode={mode}>
            <MDEditor.Markdown
              source={cardDescription}
              style={{
                whiteSpace: "pre-wrap",
                padding: cardDescription ? "10px" : "0px",
                border: cardDescription
                  ? "0.5px solid rgba(0, 0, 0, 0.2)"
                  : "none",
                borderRadius: "8px",
              }}
            />
          </Box>
        </Box>
      )}
    </Box>
  );
}

export default CardDescriptionMdEditor;
