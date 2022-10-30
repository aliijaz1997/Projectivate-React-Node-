import * as React from "react";
import {
  CustomFieldItem,
  CustomFieldItemAddForm,
  ProjectCustomFields,
} from "~/web/common/types";
import { AddProjectField } from "./components/AddProjectField";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import { CustomFieldListItem } from "./components/CustomFieldListItem";
import { SerializedError } from "@reduxjs/toolkit";
import { FetchBaseQueryError } from "@reduxjs/toolkit/dist/query";
import { Box, Typography } from "@mui/material";

interface Props {
  projectId: string;
  customFields: ProjectCustomFields;
  onCustomFieldUpdate: (
    customFieldName: string,
    customFieldItemId: string,
    data: Partial<CustomFieldItem>
  ) => void;
  onCustomFieldAdd: (
    customFieldName: string,
    data: CustomFieldItemAddForm
  ) => void;

  onCustomFieldDragEnd: (customFieldName: string, result: DropResult) => void;
  updateProjectCustomFieldItemError:
    | FetchBaseQueryError
    | SerializedError
    | undefined;
}

export function ProjectSettings({
  projectId,
  customFields,
  onCustomFieldUpdate,
  onCustomFieldDragEnd,
  onCustomFieldAdd,
  updateProjectCustomFieldItemError,
}: Props) {
  const customFieldNames = React.useMemo(
    () => Object.keys(customFields),
    [customFields]
  );

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        mx: "5rem",
        mt: "1.25rem",
      }}
    >
      <Box sx={{ p: "1.25rem", border: "1px solid black" }}>
        {customFieldNames.map((fieldName) => {
          return (
            <DragDropContext
              key={fieldName}
              onDragEnd={(result) => onCustomFieldDragEnd(fieldName, result)}
            >
              <Box sx={{ mt: "1.25rem" }}>
                <CustomFieldListItem
                  projectId={projectId}
                  customFieldName={fieldName}
                  customField={customFields[fieldName]}
                  onCustomFieldAdd={onCustomFieldAdd}
                  onCustomFieldUpdate={onCustomFieldUpdate}
                  updateProjectCustomFieldItemError={
                    updateProjectCustomFieldItemError
                  }
                />
              </Box>
            </DragDropContext>
          );
        })}

        <Box sx={{ mt: "1.25rem" }}>
          <Typography
            sx={{
              fontWeight: 700,
              fontSize: "1.125rem",
              lineHeight: "1.75rem",
            }}
          >
            Add Additional Custom Fields
          </Typography>
          <Box sx={{ mt: "0.5rem" }}>
            <AddProjectField projectId={projectId} />
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
