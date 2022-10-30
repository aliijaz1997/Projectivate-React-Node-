import React, { useState } from "react";
import { FaSortDown, FaSortUp } from "react-icons/fa";
import { Task } from "~/web/common/types";
import { ListTaskCreateForm } from "./ListTaskCreateForm";
import { TaskList } from "./TaskList";
import { Draggable, Droppable } from "react-beautiful-dnd";
import { Box, Typography, Button } from "@mui/material";
import useStyles from "./taskGroup.styles";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
interface Props {
  innerFieldId: string;
  outerFieldId: string;
  innerFieldName: string;
  outerCustomFieldGroupName: string;
  innerCustomFieldGroupName: string;
  tasks: Task[];
  projectId: string;
  taskList: Task[] | undefined;
}
export function TaskGroup({
  innerFieldId,
  outerFieldId,
  innerFieldName,
  outerCustomFieldGroupName,
  innerCustomFieldGroupName,
  tasks,
  projectId,
  taskList,
}: Props) {
  const [hiddeInner, sethiddeInner] = useState(true);
  const hiddeInnerHandler = () => {
    sethiddeInner(!hiddeInner);
  };
  const styles = useStyles({});
  return (
    <>
      <Box sx={styles.innerGroupFieldContainer}>
        <Typography sx={styles.innerGroupFieldTypography}>
          {innerFieldName}
        </Typography>

        <Button onClick={hiddeInnerHandler}>
          {hiddeInner ? (
            <ArrowDropDownIcon sx={styles.arrowDropIcon} />
          ) : (
            <ArrowDropUpIcon sx={styles.arrowDropIcon} />
          )}
        </Button>
      </Box>
      {hiddeInner && (
        <>
          {tasks.map((item, index) => (
            <Draggable draggableId={item.id} key={item.id} index={index}>
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
                    <TaskList task={item} />
                  </Box>
                );
              }}
            </Draggable>
          ))}
          <Box sx={styles.listTaskCreateContainer}>
            <ListTaskCreateForm
              projectId={projectId}
              outerId={outerFieldId}
              innerId={innerFieldId}
              outerCustomFieldName={outerCustomFieldGroupName}
              innerCustomFieldName={innerCustomFieldGroupName}
              totalTasks={taskList ? taskList.length : 0}
            />
          </Box>
        </>
      )}
    </>
  );
}
