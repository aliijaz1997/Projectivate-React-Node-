import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { CustomFieldItemAddForm } from "~/web/common/types";
import classNames from "classnames";
import { Box, Button, TextField } from "@mui/material";

interface Props {
  className?: string;
  customFieldName: string;
  onCustomFieldAdd: (
    customFieldName: string,
    data: CustomFieldItemAddForm
  ) => void;
}

export function AddCustomFieldItem({
  className,
  onCustomFieldAdd,
  customFieldName,
}: Props) {
  const [showForm, setShowForm] = useState(false);

  const { handleSubmit, register, reset, control } =
    useForm<CustomFieldItemAddForm>();

  const divClassNames = classNames(className);

  return (
    <div className={divClassNames}>
      {showForm ? (
        <form
          onSubmit={handleSubmit((data) => {
            onCustomFieldAdd(customFieldName, data);
            setShowForm(false);
            reset();
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
      ) : (
        <Box sx={{ display: "flex", justifyContent: "center", mt: "0.5rem" }}>
          <Button
            variant="contained"
            sx={{ color: "white", width: "17rem" }}
            size="small"
            onClick={() => setShowForm(true)}
          >
            Add Field
          </Button>
        </Box>
      )}
    </div>
  );
}
