import React, { useEffect, useState } from "react";
import router from "next/router";
import { FaAngleDown, FaList, FaPlay } from "react-icons/fa";
import { AddCommentForm } from "./components/Comments/AddCommentForm";
import { Description } from "./components/Description";
import { Tasks } from "./components/Tasks";
import { MembersListContainer } from "./components/Members/MembersListContainer";
import { Delete } from "./components/Delete";
import { AddedMember } from "./components/Members/AddedMembers";
import { Title } from "./components/Title";
import { CommentsList } from "./components/Comments/CommentsList";
import { ShowDate } from "./components/ShowDate";
import { CustomFieldType, Task } from "~/web/common/types";
import { useAppDispatch } from "~/web/store";
import { selectTask, unSelectTask } from "~/web/store/slices/detailsTask.slice";
import {
  useCreateProjectCustomFieldMutation,
  useListProjectCustomFieldQuery,
} from "~/web/store/services/customfield.service";
import CustomField from "./components/customfield";
import { TaskCustomFields } from "./components/taskCustomFields";
import { LogItem } from "./components/logItem";
import { useLogListOnTaskQuery } from "~/web/store/services/taskLog.service";
import { DropDownCustomField } from "./components/DropDownCustomField";
import { AddCustomFieldInTask } from "./components/AddCustomFieldInTask";
import { StopWatchContainer } from "./StopWatch/stopWatch.container";
import { useTaskDetailsQuery } from "~/web/store/services/tasks.service";
import { useProjectDetailsQuery } from "~/web/store/services/projects.service";
import { Box } from "@mui/material";
export interface LabelData {
  title: string;
  type: string;
}
export type LabelDataTypes = LabelData[];

export interface UserProfile {
  name: string;
  image: string;
}

interface DetailProps {
  taskId: string;
}
export function Detail({ taskId }: DetailProps) {
  const projectId = router.query.projectId as string;
  const { data: task } = useTaskDetailsQuery(taskId);
  const { data: projectCustomFields } =
    useListProjectCustomFieldQuery(projectId);
  const { data: taskLogs } = useLogListOnTaskQuery(taskId);
  const [title, setTitle] = useState("");

  const [createProjectCustomField] = useCreateProjectCustomFieldMutation();
  const handleFieldSubmit = ({ type }: { type: CustomFieldType }) => {
    createProjectCustomField({
      projectId,
      name: title,
      type,
    });
    setTitle("");
  };

  const dispatch = useAppDispatch();

  if (!taskLogs) return <Box>No logs found!</Box>;
  if (!task) return <Box>No Task Details Found</Box>;
  return (
    <Box sx={{ display: "flex" }}>
      <Box sx={{ width: "85%" }}>
        {task.Parent && (
          <Box
            sx={{ ml: "0.75rem", fontSize: "1.125rem", lineHeight: "1.75rem" }}
          >
            <ul>
              <li>
                <a
                  onClick={() => {
                    dispatch(unSelectTask());
                    dispatch(selectTask(task.Parent as Task));
                  }}
                >
                  {task.Parent.title}
                </a>
              </li>
              <li>{task.title}</li>
            </ul>
          </Box>
        )}
        <Title projectId={projectId} title={task.title} taskId={task.id} />
        <AddedMember taskId={task.id} />
        <MembersListContainer taskId={task.id} assigneeId={task.assigneeId} />
        <TaskCustomFields projectId={projectId} taskId={task.id} />
        <ShowDate
          projectId={projectId}
          dateStart={task.dateStart}
          dateEnd={task.dateEnd}
          taskId={task.id}
        />

        <Description
          description={task.description}
          taskId={task.id}
          projectId={projectId}
        />
        {task.parentId ? (
          ""
        ) : (
          <Tasks
            taskId={task.id}
            categoryId={task.customFields.category as string}
          />
        )}
        <AddCommentForm task={task} />
        <Box
          sx={{ display: "flex", p: "0.75rem", mt: "2.5rem", mx: "1.25rem" }}
        >
          <Box sx={{ mr: "0.75rem", mt: "1.5rem" }}>
            <FaList
              style={{
                width: "1.25rem",
                height: "1.25rem",
                color: "rgb(75 85 99)",
              }}
            />
          </Box>
          <Box>
            <Box
              sx={{
                fontSize: "1.25rem",
                lineHeight: "1.75rem",
                fontWeight: 600,
                color: "rgb(75 85 99)",
              }}
            >
              Actions
            </Box>
            {taskLogs && taskLogs.length > 0 && (
              <Box
                sx={{
                  overflow: "auto",
                  mmt: "0.75rem",
                  width: "24rem",
                  maxHeight: "15rem",
                  border: "4px solid rgb(75 85 99)",
                }}
              >
                {taskLogs.map((taskLog, index) => {
                  return <LogItem key={index} taskLog={taskLog} />;
                })}
              </Box>
            )}
          </Box>
        </Box>
        <Box>
          <CommentsList taskId={task.id} />
        </Box>
      </Box>
      <Box sx={{ width: "50%" }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            flexWrap: "wrap",
            p: "0.5rem",
          }}
        >
          <StopWatchContainer taskId={task.id} />
          <Delete taskId={task.id} />
          {projectCustomFields &&
            Object.entries(projectCustomFields).map(([key, value]) => {
              if (value.type === "checkbox") {
                return (
                  <CustomField
                    taskId={task.id}
                    projectId={projectId}
                    key={key}
                    title={key}
                  />
                );
              }
              return (
                <DropDownCustomField
                  projectId={projectId}
                  task={task}
                  title={key}
                  key={key}
                />
              );
            })}
          <AddCustomFieldInTask
            handleFieldSubmit={handleFieldSubmit}
            setTitle={setTitle}
            title={title}
          />
        </Box>
      </Box>
    </Box>
  );
}
