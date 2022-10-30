import * as React from "react";
import moment from "moment";
import { FaEllipsisH } from "react-icons/fa";
import classNames from "classnames";
import {
  useDeleteCommentMutation,
  useUpdateCommentMutation,
} from "~/web/store/services/comments.service";
import { Box, Typography, Button } from "@mui/material";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";
import useStyles from "./commentListItems.styles";
interface CommentsProps {
  content: string;
  name: string;
  createdAt: string;
  id: string;
  taskId: string;
}

export function CommentListItem({
  id,
  createdAt,
  content,
  taskId,
  name,
}: CommentsProps) {
  const [commentContent, setCommentContent] = React.useState(content);
  const [updateComment] = useUpdateCommentMutation();
  const [editable, setEditable] = React.useState(false);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCommentContent(e.target.value);
  };
  function Date(date: string) {
    return moment(date).format("DD MMM, YYYY HH:mm:ss");
  }
  return (
    <Box sx={{ display: "flex", p: "0.75rem", mt: "0.5rem", mx: "1.25rem" }}>
      <img
        src="https://cdn.pixabay.com/photo/2021/05/31/05/55/naruto-6297820_960_720.jpg"
        style={{ height: 40, width: 40 }}
        alt="user"
      />

      <Box sx={{ width: "100%", ml: "0.5rem" }}>
        <Box sx={{ display: "flex", gap: "0.5rem" }}>
          <Typography sx={{ fontWeight: 700 }}>{name}</Typography>
          <Typography>{Date(createdAt.toString())}</Typography>
        </Box>
        <Box sx={{ py: "0.5rem", borderBottom: "2px solid rgb(156 163 175)" }}>
          {!editable ? (
            <p
              onClick={() => {
                setEditable(true);
              }}
            >
              {content}
            </p>
          ) : (
            <TextField
              type="text"
              value={commentContent}
              onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
                if (e.key === "Enter") {
                  updateComment({
                    commentId: id,
                    body: { content: commentContent },
                  });
                  setEditable(false);
                }
              }}
              onChange={handleChange}
            />
          )}
        </Box>
      </Box>
      <DropdownMenu
        commentContent={commentContent}
        commentId={id}
        setEditable={setEditable}
        taskId={taskId}
      />
    </Box>
  );
}
interface DropDownMenuProps {
  commentId: string;
  setEditable: (any: boolean) => void;
  commentContent: string;
  taskId: string;
}
function DropdownMenu({
  commentId,
  commentContent,
  setEditable,
  taskId,
}: DropDownMenuProps) {
  const [deleteComment] = useDeleteCommentMutation();
  const [updateComment] = useUpdateCommentMutation();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const styles = useStyles({});

  return (
    <div>
      <Button>
        <FaEllipsisH style={styles.FaEllipsisHIcon} aria-hidden="true" />
      </Button>

      <Menu
        id="demo-positioned-menu"
        aria-labelledby="demo-positioned-button"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
      >
        <MenuItem
          onClick={async () => {
            await deleteComment({ commentId });
          }}
        >
          Delete
        </MenuItem>
        <MenuItem
          onClick={async () => {
            await updateComment({
              body: { content: commentContent },
              commentId,
            });

            setEditable(false);
          }}
        >
          Update
        </MenuItem>
      </Menu>
    </div>
  );
}
