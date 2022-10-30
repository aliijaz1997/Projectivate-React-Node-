import { Box } from "@mui/material";
import { useMemo } from "react";
import { CurrentSprintRes, SprintCreate } from "~/web/common/types/sprint";
import { PlanningBodyContainer } from "./components/PlanningBody/PlanningBody.container";
import { PlanningTopbar } from "./components/PlanningTopbar/PlanningTopbar";

interface Props {
  projectId: string;
  onSprintCreate: (data: SprintCreate) => void;
  currentSprint: CurrentSprintRes | null;
}

export function Planning({ projectId, onSprintCreate, currentSprint }: Props) {
  const isButtonDisabled = useMemo(() => !!currentSprint, [currentSprint]);

  return (
    <Box>
      <PlanningTopbar
        buttonDisabled={isButtonDisabled}
        onSprintCreate={onSprintCreate}
      />
      <PlanningBodyContainer
        projectId={projectId}
        currentSprint={currentSprint}
      />
    </Box>
  );
}
