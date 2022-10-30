import React from "react";
import { Project, Task } from "~/common/types";
import {
  useTaskListByProjectIdQuery,
  useTaskReorderMutation,
} from "~/web/store/services/tasks.service";
import { BoardTaskGroup } from "./BoardTaskGroup";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import { Detail } from "../../project-details/Detail";
import { useAppSelector, useAppDispatch } from "~/web/store";
import { unSelectTask } from "~/web/store/slices/detailsTask.slice";
import { useUpdateManyFieldItemOnTaskMutation } from "~/web/store/services/customfield.service";
import { AlertForMisc } from "../../../common/components/Alert";
import {
  useBoardGroups,
  VerticalToHorizontalGroupKey,
} from "../hooks/useBoardGroups";
import { toast } from "react-toastify";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@mui/material";
import useStyles from "./view.styles";

interface BoardProps {
  project: Project;
}

export function View({ project }: BoardProps) {
  const { field1: horizontalGroupName, field2: verticalGroupName } =
    useAppSelector((state) => state.views.currentView.groupings);
  const filters = useAppSelector((state) => state.views.currentView.filters);

  const {
    data: taskList,
    isError,
    isLoading,
  } = useTaskListByProjectIdQuery({
    projectId: project.id,
    filters,
  });
  const [reorderTasks] = useTaskReorderMutation();

  const { groups, horizontalFieldItems, isMisc, verticalFieldItems } =
    useBoardGroups({
      customFields: project.customFields,
      horizontalGroupName,
      verticalGroupName,
      tasks: taskList,
    });

  const [updateManyFieldItemsOnTask, {}] =
    useUpdateManyFieldItemOnTaskMutation();

  const { selectedTask, modalOpen } = useAppSelector(
    (state) => state.detailsTask
  );

  const dispatch = useAppDispatch();

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) return;
    const taskId = result.draggableId;
    const destinationIndex = result.destination.index;
    const sourceIndex = result.source.index;
    const destinationIds = result.destination.droppableId.split("__");
    const destinationVerticalFieldItemId = destinationIds[0];
    const destinationHorizontalFieldItemId = destinationIds[1];

    const sourceIds = result.source.droppableId.split("__");
    const sourceVerticalFieldItemId = sourceIds[0];
    const sourceHorizontalFieldItemId = sourceIds[1];

    const sourceItems =
      groups[`${sourceVerticalFieldItemId}__${sourceHorizontalFieldItemId}`];

    const destinationItems: Task[] =
      groups[
        `${destinationVerticalFieldItemId}__${destinationHorizontalFieldItemId}`
      ];

    if (
      destinationVerticalFieldItemId === "misc" ||
      destinationHorizontalFieldItemId === "misc"
    )
      return toast.error("Tasks cannot be dragged into misc.");

    // Task is dragged within the same group
    if (sourceIds.join("__") === destinationIds.join("__")) {
      const draggedItem = sourceItems.at(sourceIndex);

      if (draggedItem) {
        sourceItems.splice(sourceIndex, 1);

        sourceItems.splice(destinationIndex, 0, draggedItem);
      }

      const updatedItems = sourceItems.map((item, index) => {
        return {
          taskId: item.id,
          position: index,
        };
      });

      return reorderTasks({ body: updatedItems });
    }

    const draggedItem = sourceItems.at(sourceIndex);

    if (draggedItem) {
      sourceItems.splice(sourceIndex, 1);
      destinationItems.splice(destinationIndex, 0, draggedItem);
    }

    const updatedItems = destinationItems.map((item, index) => {
      return {
        taskId: item.id,
        position: index,
      };
    });

    reorderTasks({ body: updatedItems });

    updateManyFieldItemsOnTask({
      taskId,
      projectId: project.id,
      body: {
        [horizontalGroupName]: destinationHorizontalFieldItemId,
        [verticalGroupName]: destinationVerticalFieldItemId,
      },
    });
  };

  const handleUnSelectTask = () => {
    dispatch(unSelectTask());
  };
  const styles = useStyles({});

  return (
    <Box>
      {isMisc && <AlertForMisc message="There are some task in misc" />}
      <Box>
        <Modal
          open={modalOpen}
          onClose={handleUnSelectTask}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box
            sx={{
              position: "absolute" as "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: 700,
              bgcolor: "background.paper",
              border: "2px solid #000",
              boxShadow: 24,
              p: 4,
              height: "45rem",
              overflowY: "auto",
            }}
          >
            {selectedTask && <Detail taskId={selectedTask.id} />}
          </Box>
        </Modal>
      </Box>

      <Table sx={{ width: "100%" }}>
        <TableHead>
          <TableRow
            sx={{
              bgcolor: "rgb(243 244 246)",
            }}
          >
            <TableCell />
            {horizontalFieldItems.map((category) => (
              <TableCell
                sx={{ fontWeight: 700, fontSize: "1.1rem" }}
                key={category.id}
              >
                {category.name}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody sx={{ bgcolor: "white" }}>
          <DragDropContext onDragEnd={onDragEnd}>
            {verticalFieldItems.map((verticalFieldItem) => (
              <TableRow
                key={verticalFieldItem.id}
                sx={{ verticalAlign: "top" }}
              >
                <TableCell
                  sx={{
                    px: "1rem",
                    py: "0.75rem",
                    width: "7rem",
                    bgcolor: "rgb(243,244,246)",
                    fontWeight: 600,
                    textAlign: "left",
                  }}
                >
                  {verticalFieldItem.name}
                </TableCell>

                {horizontalFieldItems.map((horizontalFieldItem) => {
                  const key: VerticalToHorizontalGroupKey = `${verticalFieldItem.id}__${horizontalFieldItem.id}`;
                  return (
                    <TableCell
                      key={key}
                      sx={{
                        px: "1rem",
                        py: "0.75rem",
                        border: "1px",
                        width: "20rem",
                      }}
                    >
                      <BoardTaskGroup
                        verticalField={verticalFieldItem.id}
                        horizontalField={horizontalFieldItem.id}
                        verticalCustomFieldName={verticalGroupName}
                        horizontalCustomFieldName={horizontalGroupName}
                        tasks={groups[key]}
                        projectId={project.id}
                      />
                    </TableCell>
                  );
                })}
              </TableRow>
            ))}
          </DragDropContext>
        </TableBody>
      </Table>
    </Box>
  );
}
