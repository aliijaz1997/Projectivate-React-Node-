import React, { FormEvent, useState } from "react";
import { useTaskCreateMutation } from "~/web/store/services/tasks.service";
import { useForm, Controller } from "react-hook-form";
import moment from "moment";
import { Box, Button, TextField } from "@mui/material";
import { TaskCreate } from "~/web/common/types";
interface AddTaskProps {
  setShowTaskForm: React.Dispatch<React.SetStateAction<boolean>>;
  projectId: string;
  categoryId: string;
  taskId: string;
}
type TaskCreateForm = Pick<TaskCreate, "title">;

function AddTask({
  projectId,
  categoryId,
  taskId,
  setShowTaskForm,
}: AddTaskProps) {
  const [taskCreate] = useTaskCreateMutation();

  const { handleSubmit, control } = useForm<TaskCreateForm>();

  return (
    <form
      onSubmit={handleSubmit((data) => {
        taskCreate({
          title: data.title,
          dateStart: new Date().toISOString(),
          dateEnd: moment(new Date()).add("days", 2).toISOString(),
          description: "Replace This",
          projectId,
          customFields: { category: categoryId },
          position: 1,
          parentId: taskId,
        });
        setShowTaskForm(false);
      })}
    >
      <Box sx={{ width: "16.7rem" }}>
        <Controller
          name="title"
          control={control}
          defaultValue={""}
          rules={{ required: true }}
          render={({ field }) => (
            <TextField
              fullWidth
              id="outlined-basic"
              label="Add Task"
              variant="outlined"
              {...field}
            />
          )}
        />
      </Box>
      <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
        <Button
          type="submit"
          size="small"
          sx={{ mt: "0.5rem", color: "white" }}
          variant="contained"
        >
          Add Task
        </Button>
      </Box>
    </form>
  );
}

export default AddTask;
