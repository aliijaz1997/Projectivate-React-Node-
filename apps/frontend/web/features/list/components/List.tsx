import React, { useState } from "react";
import { FaSortUp, FaSortDown } from "react-icons/fa";
import { CustomFieldItem, Task } from "~/web/common/types";
import { TaskGroup } from "./TaskGroup";
import { Draggable, Droppable } from "react-beautiful-dnd";
import { Box, Button, Typography } from "@mui/material";
import useStyles from "./list.styles";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
interface Props {
  outerFieldName: string;
  innerFieldItems: CustomFieldItem[];
  outerCustomFieldGroupName: string;
  innerCustomFieldGroupName: string;
  outerFieldId: string;
  groupsData: Record<string, Record<string, Task[]>>;
  projectId: string;
  taskList: Task[] | undefined;
}

export function List({
  outerFieldName,
  innerFieldItems,
  groupsData,
  projectId,
  innerCustomFieldGroupName,
  outerCustomFieldGroupName,
  outerFieldId,
  taskList,
}: Props) {
  const [showList, setShowList] = useState(true);

  const taskHandler = () => {
    setShowList(!showList);
  };
  const styles = useStyles({});
  return (
    <Box sx={styles.listContainer}>
      <Box sx={styles.outerFieldNameContainer}>
        <Typography sx={styles.outerFieldNameTypography}>
          {outerFieldName}
        </Typography>
        <Button
          size="small"
          onClick={taskHandler}
          sx={{ "&:hover": { bgcolor: "transparent" }, bgcolor: "transparent" }}
        >
          {showList ? (
            <ArrowDropUpIcon sx={styles.arrowDropIcon} />
          ) : (
            <ArrowDropDownIcon sx={styles.arrowDropIcon} />
          )}
        </Button>
      </Box>
      {showList && (
        <>
          {innerFieldItems.map((innerField, index) => {
            const tasks = groupsData[outerFieldName][innerField.name];
            return (
              <Droppable
                droppableId={`${outerFieldId}__${innerField.id}`}
                key={innerField.id}
              >
                {(provided, snapshot) => {
                  return (
                    <Box {...provided.droppableProps} ref={provided.innerRef}>
                      <TaskGroup
                        tasks={tasks}
                        innerFieldName={innerField.name}
                        projectId={projectId}
                        outerFieldId={outerFieldId}
                        innerFieldId={innerField.id}
                        outerCustomFieldGroupName={outerCustomFieldGroupName}
                        innerCustomFieldGroupName={innerCustomFieldGroupName}
                        taskList={taskList}
                      />
                    </Box>
                  );
                }}
              </Droppable>
            );
          })}
        </>
      )}
    </Box>
  );
}
