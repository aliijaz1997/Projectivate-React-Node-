import { Box, Button, List, TextField } from "@mui/material";
import React, { ReactElement, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { useClickOutside } from "~/web/common/hooks/useClickOutside";
import { TaskCreate } from "~/web/common/types";

interface Props {
  onTaskCreate: (title: string) => void;
}

type TaskCreateForm = Pick<TaskCreate, "title">;

export function CreateTask({ onTaskCreate }: Props): ReactElement {
  const [showForm, setShowForm] = useState(false);
  const { handleSubmit, register, reset, control } = useForm<TaskCreateForm>();
  const clickOutsideRef = React.useRef(null);

  useClickOutside(clickOutsideRef, () => {
    setShowForm(false);
  });

  return showForm ? (
    <List ref={clickOutsideRef}>
      <a href="#" className="block bg-whiterounded-md shadow ">
        <form
          onSubmit={handleSubmit((data) => {
            onTaskCreate(data.title);
            setShowForm(false);
            reset();
          })}
        >
          <Box sx={{ width: "17rem", ml: "1rem" }}>
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
                  fullWidth
                />
              )}
            />
          </Box>
        </form>
      </a>
    </List>
  ) : (
    <Box sx={{ mt: "0.4rem", width: "16rem", mx: "auto" }}>
      <Button
        variant="outlined"
        size="small"
        fullWidth
        onClick={() => setShowForm(true)}
      >
        Add Task
      </Button>
    </Box>
  );
}
