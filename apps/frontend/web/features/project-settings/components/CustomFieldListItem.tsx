import { Box, Typography } from "@mui/material";
import { SerializedError } from "@reduxjs/toolkit";
import { FetchBaseQueryError } from "@reduxjs/toolkit/dist/query";
import { useMemo } from "react";
import { Draggable, Droppable } from "react-beautiful-dnd";
import {
  CustomField,
  CustomFieldItem,
  CustomFieldItemAddForm,
} from "~/web/common/types";
import { AddCustomFieldItem } from "./AddCustomFieldItem";
import { EditCustomFieldItem } from "./EditCustomFieldItem";

interface Props {
  projectId: string;
  customFieldName: string;
  customField: CustomField;
  onCustomFieldUpdate: (
    customFieldName: string,
    customFieldItemId: string,
    data: Partial<CustomFieldItem>
  ) => void;
  onCustomFieldAdd: (
    customFieldName: string,
    data: CustomFieldItemAddForm
  ) => void;
  updateProjectCustomFieldItemError:
    | FetchBaseQueryError
    | SerializedError
    | undefined;
}

export function CustomFieldListItem({
  customField,
  projectId,
  onCustomFieldAdd,
  onCustomFieldUpdate,
  customFieldName,
  updateProjectCustomFieldItemError,
}: Props) {
  const sortedCustomFields = useMemo(
    () =>
      [...(customField.fieldItems ?? [])]
        .sort((a, b) => a.position - b.position)
        .filter((item) => item.name !== "Backlog"),
    [customField]
  );

  return (
    <Box>
      <Typography
        sx={{
          textAlign: "center",
          mt: "0.5rem",
          fontSize: "1.3rem",
          fontWeight: 600,
        }}
      >
        Project {customFieldName}
      </Typography>

      <Box>
        <Droppable droppableId="droppable">
          {(provided, snapshot) => (
            <Box {...provided.droppableProps} ref={provided.innerRef}>
              {sortedCustomFields.map((item, index) => (
                <Draggable key={item.id} draggableId={item.id} index={index}>
                  {(provided, snapshot) => (
                    <Box
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                    >
                      <EditCustomFieldItem
                        customFieldName={customFieldName}
                        fieldItem={item}
                        projectId={projectId}
                        onCustomFieldUpdate={onCustomFieldUpdate}
                        key={item.id}
                        updateProjectCustomFieldItemError={
                          updateProjectCustomFieldItemError
                        }
                      />
                    </Box>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </Box>
          )}
        </Droppable>
        <AddCustomFieldItem
          customFieldName={customFieldName}
          onCustomFieldAdd={onCustomFieldAdd}
        />
      </Box>
    </Box>
  );
}
