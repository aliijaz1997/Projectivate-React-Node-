import React, { ReactElement } from "react";
import { Task } from "~/web/common/types";
import { DroppableZones } from "../PlanningBody/PlanningBody.container";
import { TaskGroup } from "../TaskGroup/TaskGroup";

interface Props {
  tasks: Task[];
  onTaskCreate: (title: string) => void;
}

export function Backlog({ tasks, onTaskCreate }: Props): ReactElement {
  return (
    <TaskGroup
      droppableType={DroppableZones.BACKLOG}
      droppableId={DroppableZones.BACKLOG}
      headerTitle={"Backlog"}
      onTaskCreate={onTaskCreate}
      tasks={tasks}
    />
  );
}
