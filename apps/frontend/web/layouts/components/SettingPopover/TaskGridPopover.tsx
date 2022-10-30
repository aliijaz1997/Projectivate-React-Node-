import { Button, Box } from "@mui/material";
import { Popover } from "@mui/material";
import { SerializedError } from "@reduxjs/toolkit";
import { FetchBaseQueryError } from "@reduxjs/toolkit/dist/query";
import React from "react";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import {
  ProjectCustomFields,
  CustomFieldItem,
  CustomFieldItemAddForm,
} from "~/web/common/types";
import { CustomFieldListItem } from "~/web/features/project-settings/components/CustomFieldListItem";
import useStyles from "./settingPopover.styles";

export function TaskGridPopover({
  customFieldNames,
  projectId,
  onCustomFieldDragEnd,
  customFields,
  onCustomFieldAdd,
  updateProjectCustomFieldItemError,
  onCustomFieldUpdate,
}: {
  customFieldNames: string[];
  projectId: string;
  onCustomFieldDragEnd: (customFieldName: string, result: DropResult) => void;
  onCustomFieldAdd: (
    customFieldName: string,
    data: CustomFieldItemAddForm
  ) => void;
  customFields: ProjectCustomFields;
  updateProjectCustomFieldItemError:
    | FetchBaseQueryError
    | SerializedError
    | undefined;
  onCustomFieldUpdate: (
    customFieldName: string,
    customFieldItemId: string,
    data: Partial<CustomFieldItem>
  ) => void;
}) {
  const [anchorElTaskGrid, setAnchorElTaskGrid] =
    React.useState<HTMLButtonElement | null>(null);

  const handleClickTaskGrid = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorElTaskGrid(event.currentTarget);
  };
  const handleCloseTaskGrid = () => {
    setAnchorElTaskGrid(null);
  };

  const openTaskGrid = Boolean(anchorElTaskGrid);

  const styles = useStyles({ openTaskGrid });
  return (
    <>
      <Button onClick={handleClickTaskGrid} sx={styles.taskGridButton}>
        Task Grid
      </Button>
      <Popover
        open={openTaskGrid}
        anchorEl={anchorElTaskGrid}
        onClose={handleCloseTaskGrid}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        <Box sx={styles.taskGridWrapper}>
          {customFieldNames.map((fieldName) => {
            return (
              <DragDropContext
                key={fieldName}
                onDragEnd={(result) => onCustomFieldDragEnd(fieldName, result)}
              >
                <Box sx={styles.customFieldListWrapper}>
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
        </Box>
      </Popover>
    </>
  );
}
