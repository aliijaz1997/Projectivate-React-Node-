import { useCallback, useMemo } from "react";
import { statusCustomFieldKey } from "~/web/common/types";
import { useListProjectCustomFieldItemQuery } from "~/web/store/services/customfield.service";
import { useTaskUpdateMutation } from "~/web/store/services/tasks.service";

export function useMoveTaskToBacklog(projectId: string) {
  const [updateTask, updateTaskStates] = useTaskUpdateMutation();
  const { data: customFields } = useListProjectCustomFieldItemQuery({
    projectId,
    field: statusCustomFieldKey,
  });

  const backlogId = useMemo(
    () => customFields?.find((cf) => cf.name === "Backlog")?.id,
    [customFields]
  );

  const moveTaskToBacklog = useCallback(
    ({ projectId, taskId }: { taskId: string; projectId: string }) => {
      if (backlogId) {
        updateTask({
          projectId,
          taskId,
          body: {
            sprintId: null,
            customFields: {
              [statusCustomFieldKey]: backlogId,
            },
          },
        });
      }
    },
    [backlogId, updateTask]
  );

  return [moveTaskToBacklog, updateTaskStates] as [
    typeof moveTaskToBacklog,
    typeof updateTaskStates
  ];
}
