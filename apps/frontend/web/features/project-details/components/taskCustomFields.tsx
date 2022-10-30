import React, { useEffect, useState } from "react";
import { CustomFieldType, Task } from "~/web/common/types";
import {
  useListOfTasksCustomFieldItemsQuery,
  useListProjectCustomFieldItemQuery,
} from "~/web/store/services/customfield.service";
import { useTaskDetailsQuery } from "~/web/store/services/tasks.service";
import { useProjectDetailsQuery } from "~/web/store/services/projects.service";
import { Box, Button, CircularProgress, Typography } from "@mui/material";

interface Props {
  taskId: string;
  projectId: string;
}
export function TaskCustomFields({ taskId, projectId }: Props) {
  const { isLoading, data: tasksCustomFields } =
    useListOfTasksCustomFieldItemsQuery({ projectId, taskId });
  const { data: project } = useProjectDetailsQuery(projectId);
  const { data: task } = useTaskDetailsQuery(taskId);

  const customFields = React.useMemo(() => {
    return project && project.customFields;
  }, [project]);

  if (!tasksCustomFields) return <Box>No tags found</Box>;
  if (isLoading)
    return (
      <Box sx={{ display: "flex" }}>
        <CircularProgress />
      </Box>
    );
  if (!task) return <Box>No task Found</Box>;
  if (!project) return <Box>No project Found</Box>;
  return (
    <>
      {Object.keys(tasksCustomFields).map((key: string) => {
        return (
          customFields &&
          customFields[key].type === CustomFieldType.CHECKBOX && (
            <Box key={key} sx={{ p: "0.75rem", mt: "0.25rem", mx: "1.25rem" }}>
              <Typography
                sx={{
                  fontSize: "1.25rem",
                  lineHeight: "1.75rem",
                  fontWeight: 600,
                  color: "rgb(75 85 99)",
                }}
              >
                {tasksCustomFields[key].length <= 0 ? null : key}
              </Typography>
              <ShowTaskField task={task} projectId={projectId} title={key} />
            </Box>
          )
        );
      })}
    </>
  );
}

function ShowTaskField({
  projectId,
  title,
  task,
}: {
  projectId: string;
  title: string;
  task: Task;
}) {
  const { data: fieldItems } = useListProjectCustomFieldItemQuery({
    projectId,
    field: title,
  });
  const fieldItem = task.customFields[title];
  if (!fieldItems)
    return (
      <Box sx={{ display: "flex" }}>
        <CircularProgress />
      </Box>
    );
  return (
    <Box sx={{ display: "flex", gap: "0.5rem" }}>
      {fieldItems.map((f) => {
        if (Array.isArray(fieldItem)) {
          return fieldItem.map((taskFieldItem) => {
            if (taskFieldItem === f.id) {
              return (
                <Button variant="contained" key={f.id}>
                  {f.name}
                </Button>
              );
            }
          });
        } else if (fieldItem === f.id) {
          return (
            <Button variant="contained" key={f.id}>
              {f.name}
            </Button>
          );
        }
      })}
    </Box>
  );
}
