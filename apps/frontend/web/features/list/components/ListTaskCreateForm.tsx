import React, { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { toast } from "react-toastify";
import { ErrorResponse, TaskCreate } from "~/web/common/types";
import { useTaskCreateMutation } from "~/web/store/services/tasks.service";
import {
  Box,
  Button,
  CircularProgress,
  ListItem,
  TextField,
} from "@mui/material";

interface ListTaskCreateFormProps {
  projectId: string;
  outerId: string;
  innerId: string;
  totalTasks: number;
  outerCustomFieldName: string;
  innerCustomFieldName: string;
}

type TaskCreateForm = Pick<TaskCreate, "title">;

export function ListTaskCreateForm({
  projectId,
  outerId,
  totalTasks,
  innerId,
  outerCustomFieldName,
  innerCustomFieldName,
}: ListTaskCreateFormProps) {
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
  if (isLoading)
    return (
      <Box sx={{ display: "flex" }}>
        <CircularProgress />
      </Box>
    );
  return showForm ? (
    <ListItem style={{ marginTop: "0.75rem" }}>
      <form
        onSubmit={handleSubmit((data) => {
          taskCreate({
            title: data.title,
            dateStart: new Date().toISOString(),
            dateEnd: new Date().toISOString(),
            description: "Replace This",
            projectId,
            customFields: {
              [outerCustomFieldName]: outerId,
              [innerCustomFieldName]: innerId,
            },
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
              label="Add Section"
              size="small"
              sx={{ margin: "0.25rem", borderStyle: "none" }}
              {...field}
            />
          )}
        />
      </form>
    </ListItem>
  ) : (
    <Button
      sx={{ color: "black", mx: "3rem" }}
      size="small"
      onClick={() => setShowForm(true)}
    >
      Add Task
    </Button>
  );
}
