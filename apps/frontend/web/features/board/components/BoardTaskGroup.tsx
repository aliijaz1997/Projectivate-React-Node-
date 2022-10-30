import React, { useMemo } from "react";
import { Task, CustomFieldItem } from "~/web/common/types";
import { BoardTask } from "./BoardTask";
import { BoardCreateTaskForm } from "./BoardTaskCreateForm";
import { Draggable, Droppable } from "react-beautiful-dnd";
import { Box, List } from "@mui/material";
import useStyles from "./boardTaskGroup.styles";

interface Props {
  tasks: Task[];
  verticalCustomFieldName: string;
  horizontalCustomFieldName: string;
  verticalField: string;
  horizontalField: string;
  projectId: string;
}

export function BoardTaskGroup({
  tasks,
  verticalField,
  horizontalCustomFieldName,
  verticalCustomFieldName,
  horizontalField,
  projectId,
}: Props) {
  const verticalToHorizontalGroupKey = useMemo(
    // category to status id. used to link tasks with both. used in updating drag and drop position.
    () => `${verticalField}__${horizontalField}`,
    [horizontalField, verticalField]
  );
  const customFields = {
    [horizontalCustomFieldName]: horizontalField,
    [verticalCustomFieldName]: verticalField,
  };
  const styles = useStyles({});
  return (
    <Box sx={styles.boardTaskGroupContainer}>
      <Box sx={{ flex: "1 1 0%", minHeight: 0, overflowY: "auto" }}>
        <Droppable droppableId={verticalToHorizontalGroupKey}>
          {(provided, snapshot) => {
            return (
              <List {...provided.droppableProps} ref={provided.innerRef}>
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
                              <BoardTask key={task.id} task={task} />
                            </Box>
                          );
                        }}
                      </Draggable>
                    )
                )}
                {provided.placeholder}

                {!verticalToHorizontalGroupKey.includes("misc") && (
                  <BoardCreateTaskForm
                    projectId={projectId}
                    customFields={customFields}
                    totalTasks={tasks ? tasks.length : 0}
                  />
                )}
              </List>
            );
          }}
        </Droppable>
      </Box>
    </Box>
  );
}
