import { Condition } from "@projectivate/common";
import { useMemo } from "react";
import { statusCustomFieldKey } from "~/web/common/types";
import { useListProjectCustomFieldItemQuery } from "~/web/store/services/customfield.service";
import { useTaskListByProjectIdQuery } from "~/web/store/services/tasks.service";

export function useBacklog(projectId: string) {
  const { data: customFieldItems } = useListProjectCustomFieldItemQuery({
    projectId,
    field: statusCustomFieldKey,
  });

  const backlog = useMemo(
    () => customFieldItems?.find((cf) => cf.name === "Backlog"),
    [customFieldItems]
  );

  const { data: backlogTasks } = useTaskListByProjectIdQuery(
    {
      projectId,
      filters: {
        fields: [{ field: "status", op: Condition.EQ, value: backlog?.id! }],
      },
    },
    { skip: !backlog?.id }
  );

  const computedBacklogTasks = useMemo(
    () => backlogTasks ?? [],
    [backlogTasks]
  );

  return {
    data: {
      id: backlog?.id,
      name: backlog?.name,
      tasks: computedBacklogTasks,
    },
  };
}
