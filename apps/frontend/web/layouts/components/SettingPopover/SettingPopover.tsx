import {
  IconButton,
  List,
  ListItemButton,
  Button,
  ListItem,
  Box,
} from "@mui/material";
import { Popover } from "@mui/material";
import { SerializedError } from "@reduxjs/toolkit";
import { FetchBaseQueryError } from "@reduxjs/toolkit/dist/query";
import React from "react";
import { DropResult } from "react-beautiful-dnd";
import { MdOutlineSettingsSuggest } from "react-icons/md";
import {
  ProjectCustomFields,
  CustomFieldItem,
  CustomFieldItemAddForm,
  Project,
} from "~/web/common/types";
import { CustomFieldPopover } from "./CustomFieldPopover";
import useStyles from "./settingPopover.styles";
import { TaskGridPopover } from "./TaskGridPopover";

interface Props {
  project: Project;
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

export function SettingPopover({
  project,
  customFields,
  onCustomFieldUpdate,
  onCustomFieldDragEnd,
  onCustomFieldAdd,
  updateProjectCustomFieldItemError,
}: Props) {
  const [anchorElMain, setAnchorElMain] =
    React.useState<HTMLButtonElement | null>(null);

  const customFieldNames = React.useMemo(
    () => Object.keys(customFields),
    [customFields]
  );

  const handleClickMain = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorElMain(event.currentTarget);
  };
  const handleCloseMain = () => {
    setAnchorElMain(null);
  };

  const openMain = Boolean(anchorElMain);

  const styles = useStyles({});
  return (
    <>
      <IconButton sx={styles.settingsIcon} onClick={handleClickMain}>
        <MdOutlineSettingsSuggest />
      </IconButton>
      <Popover
        open={openMain}
        anchorEl={anchorElMain}
        onClose={handleCloseMain}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        <Box sx={styles.settingsWrapper}>
          <Button sx={styles.generalButton}>General</Button>
          <TaskGridPopover
            customFieldNames={customFieldNames}
            customFields={customFields}
            onCustomFieldAdd={onCustomFieldAdd}
            onCustomFieldDragEnd={onCustomFieldDragEnd}
            onCustomFieldUpdate={onCustomFieldUpdate}
            projectId={project.id}
            updateProjectCustomFieldItemError={
              updateProjectCustomFieldItemError
            }
          />
          <CustomFieldPopover
            customFieldNames={customFieldNames}
            projectId={project.id}
          />
        </Box>
      </Popover>
    </>
  );
}
