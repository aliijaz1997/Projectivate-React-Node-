import { Box } from "@mui/material";
import React, { ReactElement } from "react";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import { Task } from "~/web/common/types";
import { CurrentSprintRes, PreviousSprint } from "~/web/common/types/sprint";
import { Backlog } from "../Backlog/Backlog";
import { CurrentSprint } from "../CurrentSprint/CurrentSprint";
import { PreviousSprints } from "../PreviousSprints/PreviousSprints";

interface Props {
  currentSprint?: CurrentSprintRes | null;
  previousSprints: PreviousSprint[];
  onDragEnd: (result: DropResult) => void;
  onTaskCreate: (title: string) => void;
  backlogTasks: Task[];
}

export function PlanningBody({
  backlogTasks,
  onDragEnd,
  onTaskCreate,
  previousSprints,
  currentSprint,
}: Props): ReactElement {
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Box sx={{ display: "flex" }}>
        <Backlog onTaskCreate={onTaskCreate} tasks={backlogTasks} />
        {currentSprint && (
          <CurrentSprint
            currentSprintId={currentSprint.id}
            tasks={currentSprint.tasks}
          />
        )}
        <PreviousSprints previousSprints={previousSprints} />
      </Box>
    </DragDropContext>
  );
}
