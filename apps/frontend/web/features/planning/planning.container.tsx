import { useEffect, useMemo } from "react";
import { toast } from "react-toastify";
import { ErrorResponse, Project } from "~/web/common/types";
import { SprintCreate } from "~/web/common/types/sprint";
import { useAppDispatch, useAppSelector } from "~/web/store";
import { unSelectTask } from "~/web/store/slices/detailsTask.slice";
import {
  useCreateSprintMutation,
  useCurrentSprintQuery,
} from "~/web/store/services/sprints.service";
import { Detail } from "../project-details/Detail";
import { Planning } from "./planning";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";

interface Props {
  project: Project;
}

export function PlanningContainer({ project }: Props) {
  const projectId = useMemo(() => project.id, [project.id]);
  const { selectedTask, modalOpen } = useAppSelector(
    (state) => state.detailsTask
  );

  const dispatch = useAppDispatch();

  const { data: currentSprint } = useCurrentSprintQuery(projectId, {
    skip: !projectId,
  });

  const computedCurrentSprint = useMemo(
    () => currentSprint ?? null,
    [currentSprint]
  );

  const [
    createSprint,
    { isError: isCreateSprintError, error: createSprintError },
  ] = useCreateSprintMutation();

  useEffect(() => {
    if (
      isCreateSprintError &&
      createSprintError &&
      "data" in createSprintError
    ) {
      toast.error((createSprintError.data as ErrorResponse).message);
    }
  }, [createSprintError, isCreateSprintError]);

  const onSprintCreate = (data: SprintCreate) => {
    createSprint({
      projectId,
      body: data,
    });
  };

  return (
    <>
      <Planning
        currentSprint={computedCurrentSprint}
        projectId={projectId}
        onSprintCreate={onSprintCreate}
      />
      {selectedTask && (
        <Modal open={modalOpen} onClose={() => dispatch(unSelectTask())}>
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
            <Detail taskId={selectedTask.id} />
          </Box>
        </Modal>
      )}
    </>
  );
}
