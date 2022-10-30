import React from "react";
import { ProjectCustomFields, Task } from "~/web/common/types";

// vertical to horizontal group id. used to link tasks with both. used in updating drag and drop position.
// vertical id comes first and then horizontal id
export type VerticalToHorizontalGroupKey = `${string}__${string}`;

interface Props {
  tasks: Task[] | undefined;
  verticalGroupName: string;
  horizontalGroupName: string;
  customFields: ProjectCustomFields;
}

export function useBoardGroups({
  tasks,
  verticalGroupName,
  horizontalGroupName,
  customFields,
}: Props) {
  const updatedTasks = React.useMemo(() => {
    return (
      tasks?.map((task) => {
        // if two customfields are already assigned to the task then no need go ahead.
        if (Object.keys(task.customFields).length >= 2) return task;

        // loop over all the custom field names and add misc field to the current task if the group name is not assigned to task.
        const updatedTask = Object.keys(customFields).reduce((acc, curr) => {
          if (!acc.customFields[curr]) {
            // add misc field to current task.
            return {
              ...acc,
              customFields: {
                ...acc.customFields,
                [curr]: "misc",
              },
            };
          }
          return acc;
        }, task);

        // return the updated task with misc.
        return updatedTask;
      }) ?? []
    );
  }, [customFields, tasks]);

  const verticalTasksWithMisc = React.useMemo(
    () =>
      updatedTasks.filter(
        (task) => task.customFields[verticalGroupName] === "misc"
      ),
    [updatedTasks, verticalGroupName]
  );

  const horizontalTasksWithMisc = React.useMemo(
    () =>
      updatedTasks.filter(
        (task) => task.customFields[horizontalGroupName] === "misc"
      ),
    [updatedTasks, horizontalGroupName]
  );

  const horizontalFieldItems = React.useMemo(() => {
    const items = customFields[horizontalGroupName].fieldItems ?? [];

    const miscField = {
      id: "misc",
      name: "Misc",
      position: items.length + 1,
      visibility: true,
    };

    return horizontalTasksWithMisc.length > 0 ? [...items, miscField] : items;
  }, [horizontalGroupName, customFields, horizontalTasksWithMisc.length]);

  const verticalFieldItems = React.useMemo(() => {
    const items = customFields[verticalGroupName].fieldItems ?? [];

    const miscField = {
      id: "misc",
      name: "Misc",
      position: items.length + 1,
      visibility: true,
    };

    return verticalTasksWithMisc.length > 0 ? [...items, miscField] : items;
  }, [customFields, verticalGroupName, verticalTasksWithMisc.length]);

  const groups = React.useMemo(() => {
    const localGroups: Record<VerticalToHorizontalGroupKey, Task[]> = {};

    for (const verticalFieldItem of verticalFieldItems) {
      for (const horizontalFieldItem of horizontalFieldItems) {
        const key: VerticalToHorizontalGroupKey = `${verticalFieldItem.id}__${horizontalFieldItem.id}`;

        localGroups[key] = [];
      }
    }

    for (const task of updatedTasks) {
      const key: VerticalToHorizontalGroupKey = `${task.customFields[verticalGroupName]}__${task.customFields[horizontalGroupName]}`;

      if (localGroups[key]) {
        localGroups[key].push(task);
      }
    }
    return localGroups;
  }, [
    verticalFieldItems,
    horizontalFieldItems,
    updatedTasks,
    verticalGroupName,
    horizontalGroupName,
  ]);

  return {
    groups,
    horizontalFieldItems,
    verticalFieldItems,
    isMisc:
      horizontalTasksWithMisc.length > 0 || verticalTasksWithMisc.length > 0,
  };
}
