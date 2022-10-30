import { Box, Button, MenuItem, Select, TextField } from "@mui/material";
import React from "react";
import { CustomFieldType } from "~/web/common/types";

interface Props {
  handleFieldSubmit: ({ type }: { type: CustomFieldType }) => void;
  setTitle: React.Dispatch<React.SetStateAction<string>>;
  title: string;
}

export function AddCustomFieldInTask({
  title,
  handleFieldSubmit,
  setTitle,
}: Props) {
  const [value, setValue] = React.useState<string>("checkbox");
  return (
    <Box>
      <TextField
        size="small"
        label="Add Custom Field"
        variant="outlined"
        onChange={(e) => {
          setTitle(e.target.value);
        }}
        value={title}
      />
      <Select
        sx={{ mt: "0.5rem" }}
        fullWidth
        value={value}
        inputProps={{ "aria-label": "Without label" }}
        onChange={(e) => {
          setValue(e.target.value);
        }}
      >
        <MenuItem value="checkbox">CheckBox</MenuItem>
        <MenuItem value="dropdown">DropDown</MenuItem>
      </Select>
      <Box sx={{ display: "flex", justifyContent: "flex-end", py: "0.5rem" }}>
        <Button
          variant="contained"
          onClick={() => {
            if (value === "checkbox") {
              handleFieldSubmit({ type: CustomFieldType.CHECKBOX });
              return;
            }
            handleFieldSubmit({ type: CustomFieldType.DROPDOWN });
          }}
          sx={{ mt: "0.5rem", color: "white" }}
          size="small"
          type="submit"
        >
          Create Field
        </Button>
      </Box>
    </Box>
  );
}
