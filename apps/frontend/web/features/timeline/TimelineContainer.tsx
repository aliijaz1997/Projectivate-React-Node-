import React, { useEffect, useMemo, useState } from "react";
import { ErrorResponse, Project, Task } from "~/web/common/types";
import {
  useTaskListByProjectIdQuery,
  useTaskUpdateMutation,
} from "~/web/store/services/tasks.service";
import Timeline, {
  DateHeader,
  TimelineHeaders,
  TodayMarker,
} from "react-calendar-timeline";
import moment from "moment";
import { Detail } from "../project-details/Detail";
import "react-calendar-timeline/lib/Timeline.css";
import { toast } from "react-toastify";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import { Alert, CircularProgress } from "@mui/material";
import { useAppSelector } from "~/web/store";
import useStyles from "./timelineContainer.styles";

interface TimelineProps {
  project: Project;
}

export function TimelinePage({ project }: TimelineProps) {
  const [open, setOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<Task | null>(null);

  const { field1 } = useAppSelector(
    (state) => state.views.currentView.groupings
  );
  const filters = useAppSelector((state) => state.views.currentView.filters);
  const {
    isError: isTaskListError,
    isLoading: isTaskListLoading,
    error: taskListError,
    data: taskList,
  } = useTaskListByProjectIdQuery({ projectId: project.id, filters });

  const horizontalGroupName = useAppSelector(
    (state) => state.views.currentView.groupings.field1
  );

  const [taskUpdate, { isError: isTaskUpdateError, error }] =
    useTaskUpdateMutation();

  const fieldItems = useMemo(
    () => project.customFields[field1].fieldItems ?? [],
    [field1, project.customFields]
  );

  useEffect(() => {
    if (isTaskUpdateError && error && "data" in error) {
      toast.error((error.data as ErrorResponse).message);
    }
  }, [isTaskUpdateError, error]);
  const styles = useStyles({});
  if (isTaskListLoading)
    return (
      <Box sx={{ display: "flex" }}>
        <CircularProgress />
      </Box>
    );

  if (isTaskListError) return <Alert severity="error">Error occurred</Alert>;
  if (!taskList) return <div>No tasks</div>;

  const groups = fieldItems.map((tg) => ({
    id: tg.id,
    title: tg.name,
    height: 65,
  }));

  const tasks = taskList.map((task) => ({
    id: task.id,
    group: task.customFields[field1] as string,
    start_time: moment(task.dateStart),
    end_time: moment(task.dateEnd),
    title: task.title,
    itemProps: {
      style: {
        background: "#F5F5F5",
        color: "black",
        border: "1px solid black",
        borderRadius: "3px",
        fontSize: " 15px",
      },
    },
  }));
  const onItemResize = (
    itemId: string,
    endTimeOrStartTime: number,
    edge: "left" | "right"
  ) => {
    // update End date time
    if (edge === "right") {
      taskUpdate({
        projectId: project.id,
        taskId: itemId as string,
        body: {
          dateEnd: new Date(endTimeOrStartTime).toISOString(),
        },
      });
    }

    // update Start date time
    if (edge === "left") {
      taskUpdate({
        projectId: project.id,
        taskId: itemId as string,
        body: {
          dateStart: new Date(endTimeOrStartTime).toISOString(),
        },
      });
    }
  };

  const onItemMove = (
    itemId: string,
    dragTime: number,
    newGroupOrder: number
  ) => {
    const fieldItemId = fieldItems[newGroupOrder].id;
    const currentItem = taskList.find((t: { id: string }) => t.id === itemId);
    if (!currentItem) return;
    taskUpdate({
      projectId: project.id,
      taskId: itemId as string,
      body: {
        dateStart: new Date(dragTime).toISOString(),
        dateEnd: new Date(
          dragTime +
            (new Date(currentItem.dateEnd).getTime() -
              new Date(currentItem.dateStart).getTime())
        ).toISOString(),
        customFields: {
          ...currentItem.customFields,
          [horizontalGroupName]: fieldItemId,
        },
      },
    });
  };

  const onItemSelect = (itemId: string) => {
    const currentItem = taskList.find((t: { id: string }) => t.id === itemId);
    if (!currentItem) return;
    setSelectedItem(currentItem);
  };

  const onItemClick = (itemId: string) => {
    setOpen(true);
  };

  const onModalClose = () => setOpen(false);
  const twoSeconds = 2000;
  return (
    <>
      <Modal
        open={open}
        onClose={onModalClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={styles.timelineModal}>
          {selectedItem && <Detail taskId={selectedItem.id} />}
        </Box>
      </Modal>

      <Timeline
        groups={groups}
        items={tasks}
        itemHeightRatio={0.75}
        stackItems
        canResize="both"
        defaultTimeStart={moment().add(-10, "day")}
        defaultTimeEnd={moment().add(10, "day")}
        onItemClick={onItemClick}
        onItemSelect={onItemSelect}
        onItemMove={onItemMove}
        onItemResize={onItemResize}
        lineHeight={40}
      >
        <TimelineHeaders style={{ background: "#A9A9A9" }}>
          <DateHeader unit="primaryHeader" />
          <DateHeader />
        </TimelineHeaders>
        <TodayMarker interval={twoSeconds} date={new Date()} />
      </Timeline>
    </>
  );
}
