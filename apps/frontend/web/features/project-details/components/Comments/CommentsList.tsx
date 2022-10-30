import { Box, CircularProgress } from "@mui/material";
import React, { useMemo } from "react";
import { Comment } from "~/web/common/types";
import { useListCommentsQuery } from "~/web/store/services/comments.service";
import { CommentListItem } from "./commentListItems";

interface CommentsListProps {
  taskId: string;
}
export function CommentsList({ taskId }: CommentsListProps) {
  const { isError, isLoading, data } = useListCommentsQuery({ taskId });

  if (isLoading)
    return (
      <Box sx={{ display: "flex" }}>
        <CircularProgress />
      </Box>
    );

  return (
    <Box sx={{ mb: "3rem" }}>
      {data &&
        data.map((comment: Comment) => (
          <CommentListItem
            content={comment.content}
            name={comment.user.displayName!}
            createdAt={comment.createdAt}
            id={comment.id}
            key={comment.id}
            taskId={taskId}
          />
        ))}
    </Box>
  );
}
