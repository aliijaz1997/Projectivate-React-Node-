import React, { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { toast } from "react-toastify";
import {
  ErrorResponse,
  CustomFieldCreate,
  categoryCustomFieldKey,
} from "~/web/common/types";
import { useAddCustomFieldItemToProjectMutation } from "~/web/store/services/customfield.service";
import { Box, Button, TextField, CircularProgress } from "@mui/material";
import useStyles from "./listCategoryForm.styles";

interface Props {
  projectId: string;
  totalCategories: number;
}

type CategoryCreateForm = Pick<CustomFieldCreate, "name">;

export function ListCategoryForm({ projectId, totalCategories }: Props) {
  const [showForm, setShowForm] = useState(false);
  const [
    addCustomFieldItemToProject,
    { isError, error, isSuccess, isLoading },
  ] = useAddCustomFieldItemToProjectMutation();

  const { handleSubmit, register, reset, control } =
    useForm<CategoryCreateForm>();

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
    <Box
      sx={{
        ml: "0.75rem",
        flexShrink: 0,
        display: "flex",
        flexDirection: "column",
        width: "20rem",
        bgcolor: "rgb(243,244,246)",
        borderRadius: "0.375rem",
      }}
    >
      <form
        onSubmit={handleSubmit((data) => {
          addCustomFieldItemToProject({
            field: categoryCustomFieldKey,
            name: data.name,
            projectId,
          });
        })}
      >
        <Controller
          name="name"
          control={control}
          defaultValue={""}
          rules={{ required: true }}
          render={({ field }) => (
            <TextField variant="outlined" label="Add Section" {...field} />
          )}
        />
      </form>
    </Box>
  ) : (
    <Box sx={{ ml: "0.75rem", width: "20rem", borderRadius: "0.375rem" }}>
      <Button size="small" onClick={() => setShowForm(true)}>
        Add Section
      </Button>
    </Box>
  );
}
