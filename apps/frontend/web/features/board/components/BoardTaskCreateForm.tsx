import React, { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import {
  ErrorResponse,
  TaskCreate,
  TaskCustomFields,
} from "~/web/common/types";
import { useTaskCreateMutation } from "~/web/store/services/tasks.service";
import { toast } from "react-toastify";
import moment from "moment";
import {
  Box,
  Button,
  CircularProgress,
  ListItem,
  TextField,
} from "@mui/material";
import useStyles from "./boardTaskCreateForm.styles";

interface BoardTaskCreateFormProps {
  projectId: string;
  customFields: TaskCustomFields;
  totalTasks: number;
}

type TaskCreateForm = Pick<TaskCreate, "title">;

export const BoardCreateTaskForm = ({
  projectId,
  customFields,
  totalTasks,
}: BoardTaskCreateFormProps) => {
  const [showForm, setShowForm] = useState(false);
  const [taskCreate, { isError, isSuccess, isLoading, error }] =
    useTaskCreateMutation();
  const { handleSubmit, register, reset, control } = useForm<TaskCreateForm>();

  useEffect(() => {
    if (isSuccess) {
      setShowForm(false);
      reset();
    }
    if (isError && error && "data" in error) {
      toast.error((error.data as ErrorResponse).message);
    }
  }, [isSuccess, reset, isError, error]);
  const styles = useStyles({});
  if (isLoading)
    return (
      <Box sx={{ display: "flex" }}>
        <CircularProgress />
      </Box>
    );

  return showForm ? (
    <ListItem>
      <form
        onSubmit={handleSubmit((data) => {
          taskCreate({
            title: data.title,
            dateStart: new Date().toISOString(),
            dateEnd: moment(new Date()).add(2, "days").toISOString(),
            description: "Replace This",
            projectId,
            customFields,
            position: totalTasks + 1,
          });
        })}
      >
        <Controller
          name="title"
          control={control}
          defaultValue={""}
          rules={{ required: true }}
          render={({ field }) => (
            <TextField
              variant="outlined"
              label="Add Task"
              {...field}
              sx={{ width: "17rem" }}
            />
          )}
        />
      </form>
    </ListItem>
  ) : (
    <Box sx={styles.addTaskButtonContainer}>
      <Button
        variant="outlined"
        fullWidth
        size="small"
        onClick={() => setShowForm(true)}
      >
        Add Task
      </Button>
    </Box>
  );
};
