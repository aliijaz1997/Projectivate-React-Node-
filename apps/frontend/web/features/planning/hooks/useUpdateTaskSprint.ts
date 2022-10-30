import { useCallback, useMemo } from "react";
import { statusCustomFieldKey } from "~/web/common/types";
import { useListProjectCustomFieldItemQuery } from "~/web/store/services/customfield.service";
import { useTaskUpdateMutation } from "~/web/store/services/tasks.service";

export function useUpdateTaskSprint(projectId: string) {
  const [updateTask, updateTaskStates] = useTaskUpdateMutation();
  const { data: customFields } = useListProjectCustomFieldItemQuery({
    projectId,
    field: statusCustomFieldKey,
  });

  const todoId = useMemo(
    () => customFields?.find((cf) => cf.name === "Todo")?.id,
    [customFields]
  );

  const updateTaskSprint = useCallback(
    ({
      projectId,
      sprintId,
      taskId,
      previousSprintId,
    }: {
      taskId: string;
      projectId: string;
      sprintId: string;
      previousSprintId: string;
    }) => {
      if (todoId) {
        updateTask({
          projectId,
          taskId,
          body: {
            sprintId,
            customFields: {
              [statusCustomFieldKey]: todoId,
            },
            previousSprints: {
              [previousSprintId]: {},
            },
          },
        });
      }
    },
    [todoId, updateTask]
  );

  return [updateTaskSprint, updateTaskStates] as [
    typeof updateTaskSprint,
    typeof updateTaskStates
  ];
}
