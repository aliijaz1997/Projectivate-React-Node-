import React, { ReactElement } from "react";
import { Task } from "~/web/common/types";
import { DroppableZones } from "../PlanningBody/PlanningBody.container";
import { TaskGroup } from "../TaskGroup/TaskGroup";

interface Props {
  currentSprintId: string;
  tasks: Task[];
}

export function CurrentSprint({ tasks, currentSprintId }: Props): ReactElement {
  return (
    <TaskGroup
      droppableType={DroppableZones.CURRENT_SPRINT}
      droppableId={currentSprintId}
      headerTitle="Current Sprint"
      tasks={tasks}
    />
  );
}
