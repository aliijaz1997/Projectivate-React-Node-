import moment from "moment";
import React, { useMemo } from "react";
import { DropResult } from "react-beautiful-dnd";
import { toast } from "react-toastify";
import { statusCustomFieldKey } from "~/web/common/types";
import { CurrentSprintRes } from "~/web/common/types/sprint";
import store, { useAppDispatch, useAppSelector } from "~/web/store";
import { selectTask, unSelectTask } from "~/web/store/slices/detailsTask.slice";
import { usePreviousSprintsQuery } from "~/web/store/services/sprints.service";
import {
  tasksApi,
  useTaskCreateMutation,
} from "~/web/store/services/tasks.service";
import { useAddTaskToSprint } from "../../hooks/useAddTaskToSprint";
import { useBacklog } from "../../hooks/useBacklog";
import { useMoveTaskToBacklog } from "../../hooks/useMoveTaskToBacklog";
import { useUpdateTaskSprint } from "../../hooks/useUpdateTaskSprint";
import { PlanningBody } from "./PlanningBody";
import { Box } from "@mui/material";

interface Props {
  projectId: string;
  currentSprint: CurrentSprintRes | null;
}

export enum DroppableZones {
  PREVIOUS_SPRINTS = "PreviousSprints",
  BACKLOG = "Backlog",
  CURRENT_SPRINT = "CurrentSprint",
}

export function PlanningBodyContainer({ projectId, currentSprint }: Props) {
  const { data: backlog } = useBacklog(projectId);
  const [addTaskToSprint, {}] = useAddTaskToSprint(projectId);
  const [moveTaskToBacklog] = useMoveTaskToBacklog(projectId);
  const [movePreviousToCurrentSprint] = useUpdateTaskSprint(projectId);
  const [taskCreate] = useTaskCreateMutation();
  const { data: previousSprints } = usePreviousSprintsQuery(projectId);

  const dispatch = useAppDispatch();

  const computedPreviousSprints = useMemo(
    () => previousSprints ?? [],
    [previousSprints]
  );

  const onDragEnd = async (result: DropResult) => {
    if (!result.destination) return;

    const [destinationType, destinationId] =
      result.destination.droppableId.split("_");

    const [sourceType, sourceId] = result.source.droppableId.split("_");

    const taskId = result.draggableId;

    // if you are dragging and dropping from one previous sprint to another. It should not be allowed.
    if (
      destinationType === DroppableZones.PREVIOUS_SPRINTS &&
      sourceType === DroppableZones.PREVIOUS_SPRINTS
    ) {
      toast.error("Operation Not Permitted");
      return;
    }

    // if you are dragging from previous sprints to backlog. It should not be allowed
    if (
      sourceType === DroppableZones.PREVIOUS_SPRINTS &&
      destinationType === DroppableZones.BACKLOG
    ) {
      toast.error("Operation Not Permitted");
      return;
    }

    if (
      sourceType === DroppableZones.BACKLOG &&
      destinationType === DroppableZones.CURRENT_SPRINT
    ) {
      if (currentSprint?.id) {
        addTaskToSprint({ projectId, taskId, sprintId: currentSprint.id });
        const { data: task } = await dispatch(
          tasksApi.endpoints.taskDetails.initiate(taskId)
        );

        if (task && Object.keys(task.customFields).length < 2) {
          dispatch(selectTask(task));
          toast.info("Please add one more field");
        }
      }
    }

    if (
      sourceType === DroppableZones.CURRENT_SPRINT &&
      destinationType === DroppableZones.BACKLOG
    ) {
      moveTaskToBacklog({
        projectId,
        taskId,
      });
    }

    if (
      sourceType === DroppableZones.PREVIOUS_SPRINTS &&
      destinationType === DroppableZones.CURRENT_SPRINT
    ) {
      movePreviousToCurrentSprint({
        previousSprintId: sourceId,
        sprintId: destinationId,
        projectId,
        taskId,
      });
    }
  };

  const onTaskCreate = (title: string) => {
    if (backlog.id) {
      taskCreate({
        title,
        customFields: {
          [statusCustomFieldKey]: backlog.id,
        },
        dateStart: moment(new Date()).toISOString(),
        dateEnd: moment(new Date()).add(2, "day").toISOString(),
        position: 0,
        description: "Change This",
        projectId,
      });
    }
  };

  return (
    <Box sx={{ mt: "1.25rem" }}>
      <PlanningBody
        backlogTasks={backlog.tasks}
        onDragEnd={onDragEnd}
        onTaskCreate={onTaskCreate}
        currentSprint={currentSprint}
        previousSprints={computedPreviousSprints}
      />
    </Box>
  );
}
