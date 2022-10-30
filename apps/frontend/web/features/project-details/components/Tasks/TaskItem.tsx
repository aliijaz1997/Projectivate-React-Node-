import React from "react";
import { Task } from "~/web/common/types";
import { useAppDispatch } from "~/web/store";
import { unSelectTask, selectTask } from "~/web/store/slices/detailsTask.slice";
import { useTaskDeleteMutation } from "~/web/store/services/tasks.service";
import moment from "moment";
import { Box, Button } from "@mui/material";

interface TodoItemProps {
  todo: Task;
  handleTodoCompleted: (id: string) => void;
}
export function TaskItem({ handleTodoCompleted, todo }: TodoItemProps) {
  const [taskDelete] = useTaskDeleteMutation();
  const dispatch = useAppDispatch();
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        gap: "0.5rem",
        cursor: "pointer",
      }}
      onClick={() => handleTodoCompleted(todo.id)}
    >
      <a
        onClick={() => {
          dispatch(unSelectTask());
          dispatch(selectTask(todo));
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Box>{todo.title}</Box>
        </Box>
      </a>
      <Box sx={{ float: "left" }}>
        <time dateTime="2019-09-14">
          {moment(new Date(todo.dateEnd)).format("MMM d")}
        </time>
        <Button
          onClick={() => {
            taskDelete(todo.id);
          }}
          size="small"
          sx={{ ml: "0.5rem", opacity: 0, "&:Hover": { opacity: 1 } }}
        >
          Delete
        </Button>
      </Box>
    </Box>
  );
}
