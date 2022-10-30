import React from "react";
import { Task } from "~/web/common/types";
import {
  useAddFieldItemToTaskMutation,
  useListProjectCustomFieldItemQuery,
} from "~/web/store/services/customfield.service";
import { useRemoveFieldItemToTaskMutation } from "../../../store/services/customfield.service";
import {
  Box,
  Select,
  Typography,
  SelectChangeEvent,
  MenuItem,
} from "@mui/material";
import useStyles from "./dropDownCustomFields.styles";

interface Props {
  title: string;
  task: Task;
  projectId: string;
}
export function DropDownCustomField({ title, task, projectId }: Props) {
  const { data: fieldItems } = useListProjectCustomFieldItemQuery({
    projectId,
    field: title,
  });

  const [assignFieldItemToTask] = useAddFieldItemToTaskMutation();
  const [unassignFieldItemToTask] = useRemoveFieldItemToTaskMutation();
  const onchangeHandler = (e: SelectChangeEvent) => {
    if (e.target.value === "none") {
      unassignFieldItemToTask({
        projectId,
        fieldItemId: task.customFields[title] as string,
        taskId: task.id,
        field: title,
      });
      return;
    }

    assignFieldItemToTask({
      projectId,
      fieldItemId: e.target.value,
      taskId: task.id,
      field: title,
    });
  };
  const styles = useStyles({});
  if (!fieldItems) return <Box>No field Items found</Box>;
  return (
    <Box sx={styles.dropDownMainContainer}>
      <Typography sx={{ textAlign: "center" }}>{title}</Typography>
      <Select
        fullWidth
        value={
          (task.customFields[title] as string)
            ? (task.customFields[title] as string)
            : "none"
        }
        onChange={onchangeHandler}
        inputProps={{ "aria-label": "Without label" }}
      >
        <MenuItem selected value="none">
          None
        </MenuItem>
        {fieldItems.map((fieldItem) => {
          return (
            <MenuItem
              value={fieldItem.id}
              sx={{ backgroundColor: "white", color: "black" }}
              key={fieldItem.id}
            >
              {fieldItem.name}
            </MenuItem>
          );
        })}
      </Select>
    </Box>
  );
}
