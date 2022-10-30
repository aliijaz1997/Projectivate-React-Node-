import { useMemo, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { useCreateProjectCustomFieldMutation } from "~/web/store/services/customfield.service";
import { CustomFieldAddForm, CustomFieldType } from "~/web/common/types";
import { TextField, Button, Select, MenuItem, Box } from "@mui/material";

interface Props {
  projectId: string;
}

export function AddProjectField({ projectId }: Props) {
  const [showForm, setShowForm] = useState(false);

  const customFieldTypes = useMemo(() => Object.values(CustomFieldType), []);

  const { handleSubmit, register, reset, control } =
    useForm<CustomFieldAddForm>();
  const [createProjectCustomField] = useCreateProjectCustomFieldMutation();

  return (
    <Box sx={{ mt: "0.75rem" }}>
      {showForm ? (
        <form
          style={{ display: "flex" }}
          onSubmit={handleSubmit((data) => {
            createProjectCustomField({
              name: data.name.toLowerCase(),
              projectId,
              type: data.type,
            });
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
              <TextField
                className="flex-grow"
                variant="outlined"
                autoComplete="off"
                label="Add Section"
                {...field}
              />
            )}
          />

          <Select
            displayEmpty
            {...register("type", { required: true })}
            inputProps={{ "aria-label": "Without label" }}
          >
            {customFieldTypes.map((item) => {
              return (
                <MenuItem value={item} key={item}>
                  {item}
                </MenuItem>
              );
            })}
          </Select>
        </form>
      ) : (
        <Button
          variant="contained"
          sx={{ color: "white", width: "14.5rem" }}
          fullWidth
          onClick={() => setShowForm(true)}
        >
          Add Custom Field
        </Button>
      )}
    </Box>
  );
}
