import { Box, List, Typography } from "@mui/material";
import React, { ReactElement } from "react";
import { Draggable, Droppable } from "react-beautiful-dnd";
import { Task } from "~/web/common/types";
import { CreateTask } from "./CreateTask";
import { Task as TaskComponent } from "./Task";
import useStyles from "./taskGroup.styles";

interface Props {
  headerTitle: string;
  tasks: Task[];
  onTaskCreate?: (title: string) => void;
  droppableId: string;
  droppableType: string;
}

export function TaskGroup({
  tasks,
  onTaskCreate,
  headerTitle,
  droppableId,
  droppableType,
}: Props): ReactElement {
  const styles = useStyles({});
  return (
    <>
      <Box sx={styles.taskGroupMainContainer}>
        <Typography sx={{ ml: "1rem", mt: "1rem", fontWeight: 700 }}>
          {headerTitle}
        </Typography>

        <Box sx={{ flex: "1 1 0%", minHeight: "0px", overflowY: "auto" }}>
          {/* unique droppable key that combines droppable type and id */}
          <Droppable droppableId={`${droppableType}_${droppableId}`}>
            {(provided, snapshot) => {
              return (
                <List
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                  sx={{ pt: "0.5rem", pb: "0.75rem", px: "0.75rem" }}
                >
                  {tasks?.map(
                    (task, index) =>
                      !task.parentId && (
                        <Draggable
                          key={task.id}
                          draggableId={task.id}
                          index={index}
                        >
                          {(provided, snapshot) => {
                            return (
                              <Box
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                                style={{
                                  ...provided.draggableProps.style,
                                }}
                              >
                                <TaskComponent key={task.id} task={task} />
                              </Box>
                            );
                          }}
                        </Draggable>
                      )
                  )}
                  {provided.placeholder}
                  {onTaskCreate && <CreateTask onTaskCreate={onTaskCreate} />}
                </List>
              );
            }}
          </Droppable>
        </Box>
      </Box>
    </>
  );
}
