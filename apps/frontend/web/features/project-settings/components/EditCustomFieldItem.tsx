import React from "react";
import { SerializedError } from "@reduxjs/toolkit";
import { FetchBaseQueryError } from "@reduxjs/toolkit/dist/query";
import { useState } from "react";
import { CustomFieldItem } from "~/web/common/types";
import { DeleteCustomFieldItem } from "./DeleteCustomFieldItem";
import { TextField, Button, IconButton, Box } from "@mui/material";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import AppRegistrationIcon from "@mui/icons-material/AppRegistration";

interface Props {
  customFieldName: string;
  fieldItem: CustomFieldItem;
  onCustomFieldUpdate: (
    customFieldName: string,
    customFieldItemId: string,
    status: Partial<CustomFieldItem>
  ) => void;
  projectId: string;
  updateProjectCustomFieldItemError:
    | FetchBaseQueryError
    | SerializedError
    | undefined;
}

export function EditCustomFieldItem({
  customFieldName,
  fieldItem,
  onCustomFieldUpdate,
  projectId,
  updateProjectCustomFieldItemError,
}: Props): JSX.Element {
  const [name, setName] = useState(fieldItem.name);
  React.useEffect(() => {
    if (updateProjectCustomFieldItemError) {
      setName(fieldItem.name);
    }
  }, [fieldItem.name, updateProjectCustomFieldItemError]);
  return (
    <Box key={fieldItem.id} sx={{ mx: "1rem", mt: "0.7rem" }}>
      <OutlinedInput
        sx={{ width: "17rem" }}
        endAdornment={
          <InputAdornment position="end">
            <IconButton
              onClick={() => {
                onCustomFieldUpdate(customFieldName, fieldItem.id, { name });
              }}
            >
              <AppRegistrationIcon />
            </IconButton>
            <DeleteCustomFieldItem
              customFieldName={customFieldName}
              fieldItemId={fieldItem.id}
              projectId={projectId}
            />
          </InputAdornment>
        }
        value={name}
        onChange={(e) => setName(e.target.value)}
        color="primary"
        disabled={fieldItem.name === "Todo" || fieldItem.name === "Done"}
      />
    </Box>
  );
}
