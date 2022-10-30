import classNames from "classnames";
import React, { Fragment, useMemo, useState } from "react";
import { FaEllipsisH, FaPlus, FaSortDown, FaSortUp } from "react-icons/fa";
import { Task } from "~/web/common/types";
import { useTaskListByProjectIdQuery } from "~/web/store/services/tasks.service";
import { Project } from "~/web/common/types";
import { List } from "./List";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import { useUpdateManyFieldItemOnTaskMutation } from "~/web/store/services/customfield.service";
import { Alert, Box } from "@mui/material";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import useStyles from "./listCategory.styles";

interface Props {
  project: Project;
  innerGroupName: string;
  outerGroupName: string;
}

export function ListCategory({
  project,
  innerGroupName,
  outerGroupName,
}: Props) {
  const outerFieldItems = useMemo(
    () => project.customFields[outerGroupName].fieldItems ?? [],
    [project.customFields, outerGroupName]
  );

  const innerFieldItems = useMemo(
    () => project.customFields[innerGroupName].fieldItems ?? [],
    [innerGroupName, project.customFields]
  );

  const { data: taskList, isError } = useTaskListByProjectIdQuery({
    projectId: project.id,
  });

  const groupsData = useMemo(() => {
    const tasks: Record<string, Record<string, Task[]>> = {};
    for (const outerFieldItem of outerFieldItems) {
      tasks[outerFieldItem.name] = {};

      for (const innerFieldItem of innerFieldItems) {
        tasks[outerFieldItem.name][innerFieldItem.name] = [];
        for (const task of taskList ?? []) {
          if (
            task.customFields[innerGroupName] === innerFieldItem.id &&
            task.customFields[outerGroupName] === outerFieldItem.id
          ) {
            tasks[outerFieldItem.name][innerFieldItem.name].push(task);
          }
        }
      }
    }
    return tasks;
  }, [
    outerFieldItems,
    innerFieldItems,
    taskList,
    innerGroupName,
    outerGroupName,
  ]);

  const [updateManyFieldItemsOnTask, {}] =
    useUpdateManyFieldItemOnTaskMutation();
  const onDragEnd = (result: DropResult) => {
    if (!result.destination) return;
    const taskId = result.draggableId;
    const ids = result.destination.droppableId.split("__");
    const outerFieldItemId = ids[1];
    const innerFieldItemId = ids[0];
    updateManyFieldItemsOnTask({
      taskId,
      projectId: project.id,
      body: {
        [outerGroupName]: innerFieldItemId,
        [innerGroupName]: outerFieldItemId,
      },
    });
  };
  if (isError) return <Alert severity="error">Error occurred</Alert>;

  return (
    <>
      <Box sx={{ margin: "0.5rem" }}>
        <DragDropContext onDragEnd={onDragEnd}>
          {outerFieldItems.map((outerField) => (
            <List
              key={outerField.id}
              outerFieldName={outerField.name}
              innerFieldItems={innerFieldItems}
              groupsData={groupsData}
              projectId={project.id}
              outerFieldId={outerField.id}
              outerCustomFieldGroupName={outerGroupName}
              innerCustomFieldGroupName={innerGroupName}
              taskList={taskList}
            />
          ))}
        </DragDropContext>
      </Box>
    </>
  );
}

export function DropdownMenu({ onDelete }: { onDelete: () => void }) {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const styles = useStyles({});
  return (
    <>
      <Button
        onClick={handleClick}
        id="demo-positioned-button"
        aria-controls={open ? "demo-positioned-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
      >
        <MoreHorizIcon sx={styles.moreHorizIcon} />
      </Button>

      <Menu
        id="demo-positioned-menu"
        aria-labelledby="demo-positioned-button"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
      >
        <MenuItem onClick={() => onDelete()}> Delete</MenuItem>
      </Menu>
    </>
  );
}
