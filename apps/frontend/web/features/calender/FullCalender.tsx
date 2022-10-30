import Calendar, { EventClickArg, EventDropArg } from "@fullcalendar/react";
import React, { useEffect, useState } from "react";
import dayGridPlugin from "@fullcalendar/daygrid";
import styles from "./Fullcalendar.module.scss";
import interactionPlugin, {
  EventResizeDoneArg,
} from "@fullcalendar/interaction";
import { ErrorResponse, Project, Task } from "~/web/common/types";
import {
  useTaskListByProjectIdQuery,
  useTaskUpdateMutation,
} from "~/web/store/services/tasks.service";
import moment from "moment";
import { Detail } from "../project-details/Detail";
import { toast } from "react-toastify";
import { Box, Alert, CircularProgress, Toolbar } from "@mui/material";
import Modal from "@mui/material/Modal";
import timeGridPlugin from "@fullcalendar/timegrid";
import { useRouter } from "next/router";
import useStyles from "./fullCalender.styles";

interface CalenderProps {
  project: Project;
}

export default function FullCalendar({ project }: CalenderProps) {
  const router = useRouter();
  const projectId = router.query.projectId as string;
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [selectedItem, setSelectedItem] = useState<Task | null>(null);
  const {
    isError: isTaskListError,
    isLoading: isTaskListLoading,
    error: taskListError,
    data: taskList,
  } = useTaskListByProjectIdQuery({ projectId: project.id });

  const [taskUpdate, { isError, error, isLoading }] = useTaskUpdateMutation();
  const styles = useStyles({});
  useEffect(() => {
    if (isError && error && "data" in error) {
      toast.error((error.data as ErrorResponse).message);
    }
  }, [isError, error]);
  if (isLoading)
    return (
      <Box sx={{ display: "flex" }}>
        <CircularProgress />
      </Box>
    );
  if (!taskList) return <div>No tasks</div>;
  if (isTaskListError) return <Alert severity="error"> Error occurred</Alert>;

  const onEventResize = ({ event }: EventResizeDoneArg) => {
    if (!event.start || !event.end) return;
    taskUpdate({
      taskId: event.id,
      projectId: project.id,
      body: {
        dateStart: event.start.toISOString(),
        dateEnd: event.end.toISOString(),
      },
    });
  };

  const onEventDrop = ({ event }: EventDropArg) => {
    if (!event.start || !event.end) return;
    const currentItem = taskList.find((t: { id: string }) => t.id === event.id);
    if (!currentItem) return;
    taskUpdate({
      taskId: event.id,
      projectId: project.id,
      body: {
        dateStart: event.start.toISOString(),
        dateEnd: event.end.toISOString(),
      },
    });
  };

  const onEventClick = ({ event }: EventClickArg) => {
    const currentItem = taskList.find((t: { id: string }) => t.id === event.id);
    if (!currentItem) return;
    setSelectedItem(currentItem);
    setOpen(true);
  };

  return (
    <>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={styles.fullCalenderModal}>
          {selectedItem && <Detail taskId={selectedItem.id} />}
        </Box>
      </Modal>

      <Calendar
        plugins={[dayGridPlugin, interactionPlugin, timeGridPlugin]}
        initialView="dayGridMonth"
        headerToolbar={{
          left: "prev,next today",
          center: "title",
          right: "dayGridMonth,timeGridWeek",
        }}
        eventResizableFromStart={true}
        droppable={true}
        editable={true}
        eventClick={onEventClick}
        eventResize={(event) => {
          onEventResize(event);
        }}
        eventDrop={onEventDrop}
        events={taskList.map(
          (task: {
            id: string;
            dateStart: moment.MomentInput;
            dateEnd: moment.MomentInput;
            title: string;
          }) => ({
            id: task.id,
            start: moment(task.dateStart).format("YYYY-MM-DD"),
            end: moment(task.dateEnd).format("YYYY-MM-DD"),
            title: task.title,
          })
        )}
      />
    </>
  );
}
