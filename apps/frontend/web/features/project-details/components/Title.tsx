import React, { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { FaRegListAlt } from "react-icons/fa";
import { toast } from "react-toastify";
import { ErrorResponse, Task } from "~/web/common/types";
import { useTaskUpdateMutation } from "~/web/store/services/tasks.service";
import { Box, CircularProgress, TextField, Typography } from "@mui/material";
import useStyles from "./title.styles";

interface TitleProps {
  title: string;
  taskId: string;
  projectId: string;
}

type TaskEditTitleForm = Pick<Task, "title">;

export function Title({ title, projectId, taskId }: TitleProps) {
  const [canEdit, setCanEdit] = useState(false);
  const { register, handleSubmit, control } = useForm<TaskEditTitleForm>({
    defaultValues: {
      title: title,
    },
  });
  const [taskUpdate, { isLoading, isError, isSuccess, error }] =
    useTaskUpdateMutation();
  const styles = useStyles({});
  useEffect(() => {
    if (isError && error && "data" in error) {
      toast.error((error.data as ErrorResponse).message);
    }
    if (isSuccess) setCanEdit(false);
  }, [error, isError, isSuccess]);
  if (isLoading)
    return (
      <Box sx={{ display: "flex" }}>
        <CircularProgress />
      </Box>
    );
  return (
    <Box sx={styles.titleContainer}>
      <Box sx={{ ml: "0.875rem", mt: "0.125rem" }}>
        <FaRegListAlt style={styles.FaRegListAltIcon} />
      </Box>

      {canEdit ? (
        <form
          onSubmit={handleSubmit((data) => {
            taskUpdate({
              projectId,
              body: {
                title: data.title,
              },
              taskId: taskId,
            });
          })}
        >
          <Controller
            name="title"
            control={control}
            defaultValue={""}
            rules={{ required: true }}
            render={({ field }) => <TextField variant="outlined" {...field} />}
          />
        </form>
      ) : (
        <Typography
          sx={styles.titleTypography}
          onClick={() => setCanEdit(true)}
        >
          {title}
        </Typography>
      )}
    </Box>
  );
}
