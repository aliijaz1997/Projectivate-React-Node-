import React, { FormEvent, useEffect, useState } from "react";
import { FaRegCommentDots } from "react-icons/fa";
import { Task } from "~/web/common/types";
import { toast } from "react-toastify";
import { useCreateCommentMutation } from "~/web/store/services/comments.service";
import {
  Box,
  Button,
  CircularProgress,
  TextareaAutosize,
  Typography,
} from "@mui/material";
import useStyles from "./addCommentForm.styles";

interface AddCommentFormProps {
  task: Task;
}
export function AddCommentForm({ task }: AddCommentFormProps) {
  const [createComment, { isLoading, isError, error }] =
    useCreateCommentMutation();

  const [comment, setComment] = useState("");

  const handleChange = (e: FormEvent<HTMLTextAreaElement>) => {
    setComment(e.currentTarget.value);
  };
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    await createComment({ body: { content: comment }, taskId: task.id });
    setComment("");
  };
  const styles = useStyles({});
  if (isLoading)
    return (
      <Box sx={{ display: "flex" }}>
        <CircularProgress />
      </Box>
    );
  return (
    <Box sx={{ display: "flex", p: "0.75rem", mt: "2.5rem" }}>
      <Box sx={{ mr: "0.75rem", mt: "0.25rem" }}>
        <FaRegCommentDots style={styles.FaRegCommentDotsIcon} />
      </Box>
      <Box sx={{ width: "16.9rem" }}>
        <Typography sx={styles.commentTypography}>Comments</Typography>
        <form onSubmit={handleSubmit}>
          <TextareaAutosize
            onChange={handleChange}
            value={comment}
            cols={31}
            minRows={3}
          />
          <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
            <Button
              type="submit"
              size="small"
              sx={{ mt: "0.5rem", color: "white" }}
              variant="contained"
            >
              Add Comment
            </Button>
          </Box>
        </form>
      </Box>
    </Box>
  );
}
