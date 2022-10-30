import { useCallback, useMemo } from "react";
import { statusCustomFieldKey } from "~/web/common/types";
import { useListProjectCustomFieldItemQuery } from "~/web/store/services/customfield.service";
import { useTaskUpdateMutation } from "~/web/store/services/tasks.service";

export function useAddTaskToSprint(projectId: string) {
  const [updateTask, updateTaskStates] = useTaskUpdateMutation();
  const { data: customFields } = useListProjectCustomFieldItemQuery({
    projectId,
    field: statusCustomFieldKey,
  });

  const todoId = useMemo(
    () => customFields?.find((cf) => cf.name === "Todo")?.id,
    [customFields]
  );

  const addTaskToSprint = useCallback(
    ({
      projectId,
      sprintId,
      taskId,
    }: {
      taskId: string;
      sprintId: string;
      projectId: string;
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
          },
        });
      }
    },
    [todoId, updateTask]
  );

  return [addTaskToSprint, updateTaskStates] as [
    typeof addTaskToSprint,
    typeof updateTaskStates
  ];
}
