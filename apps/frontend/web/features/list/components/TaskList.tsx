import moment from "moment";
import React, { useState } from "react";
import {
  FaRegCheckCircle,
  FaExchangeAlt,
  FaAngleRight,
  FaUserCircle,
} from "react-icons/fa";
import { Task } from "~/web/common/types";
import {
  useAssigneeOfTasksQuery,
  useTaskDeleteMutation,
} from "~/web/store/services/tasks.service";
import { useAssigneeQuery } from "~/web/store/services/tenants.service";
import { Detail } from "../../project-details/Detail";
import { DropdownMenu } from "./ListCategory";
import { selectTask, unSelectTask } from "~/web/store/slices/detailsTask.slice";
import { useAppDispatch, useAppSelector } from "~/web/store";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import {
  Alert,
  Badge,
  Button,
  CircularProgress,
  Typography,
} from "@mui/material";
import useStyles from "./taskList.styles";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import Paper from "@mui/material/Paper";

interface ListItemsProps {
  task: Task;
}

export function TaskList({ task }: ListItemsProps) {
  const dispatch = useAppDispatch();
  const { title, id, assigneeId } = task;

  const {
    data: members,
    isLoading,
    isError,
  } = useAssigneeOfTasksQuery(task.id);
  const handleUnSelectTask = () => {
    dispatch(unSelectTask());
  };

  const { selectedTask, modalOpen } = useAppSelector(
    (state) => state.detailsTask
  );

  const [taskDelete] = useTaskDeleteMutation();
  const styles = useStyles({});
  if (isLoading)
    return (
      <Box sx={{ display: "flex" }}>
        <CircularProgress />
      </Box>
    );
  if (isError) return <Alert severity="error">Error occurred</Alert>;
  if (!members) return <Box>No members found</Box>;
  return (
    <>
      <Modal
        open={modalOpen}
        onClose={handleUnSelectTask}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={styles.taskListDetailsPageModal}>
          {selectedTask && <Detail taskId={selectedTask.id} />}
        </Box>
      </Modal>

      <Box sx={styles.innerGroupFieldTaskMainContainer}>
        <Box sx={styles.innerGroupFieldTaskContainer}>
          <Box sx={{ marginLeft: "0.25rem" }}>
            <AccountCircleIcon />
          </Box>
          <Box sx={{ width: "5rem" }}>
            <Typography sx={styles.innerGroupFieldTitleName}>
              {title}
            </Typography>
          </Box>

          <Box sx={styles.DropdownAndDetailsButtonContainer}>
            <Box sx={{ marginLeft: "4rem" }}>
              <DropdownMenu
                onDelete={() => {
                  taskDelete(id);
                }}
              />
            </Box>

            <Button onClick={() => dispatch(selectTask(task))}>Detail</Button>
          </Box>
        </Box>

        <Box sx={styles.statusContainer}>
          <Box sx={{ padding: "0.5rem" }}>
            {members && members.length > 0 ? (
              <Box
                sx={{ width: "10rem", display: "flex", alignItems: "center" }}
              >
                <AccountCircleIcon sx={{ width: "1rem" }} />
                {members.map((member) => (
                  <Typography sx={{ ml: "0.5rem" }} key={member.id}>
                    {member.displayName}
                  </Typography>
                ))}
              </Box>
            ) : (
              <Paper sx={styles.noAssigneTypographyPaper}>
                <AccountCircleIcon sx={{ width: "1rem" }} />
                <Typography
                  sx={{
                    ml: "0.5rem",
                  }}
                >
                  No Assignee
                </Typography>
              </Paper>
            )}
          </Box>

          <Paper
            sx={{
              padding: "0.4rem",
            }}
          >
            <Typography
              sx={{
                width: "8rem",
                textAlign: "center",
              }}
            >
              {moment(task.dateStart).format("MMM-D")}
              {moment(task.dateEnd).format("MMM-D")}
            </Typography>
          </Paper>

          <Paper
            sx={{
              padding: "0.4rem",
              ml: "0.5rem",
            }}
          >
            <Typography sx={{ width: "9rem", textAlign: "center" }}>
              High
            </Typography>
          </Paper>
          <Paper sx={styles.upgradeTypographyPaper}>
            <Typography sx={{ textAlign: "center" }}>upgrade</Typography>
          </Paper>
        </Box>
      </Box>
    </>
  );
}
