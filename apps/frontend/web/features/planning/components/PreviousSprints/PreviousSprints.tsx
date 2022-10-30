import { Box, Typography } from "@mui/material";
import React, { ReactElement } from "react";
import { PreviousSprint } from "~/web/common/types/sprint";
import { DroppableZones } from "../PlanningBody/PlanningBody.container";
import { TaskGroup } from "../TaskGroup/TaskGroup";
import useStyles from "./previousSprite.styles";

interface Props {
  previousSprints: PreviousSprint[];
}

export function PreviousSprints({ previousSprints }: Props): ReactElement {
  const styles = useStyles({});
  return (
    <Box sx={styles.previousSpriteMainContainer}>
      <Typography sx={{ mt: "1rem", fontWeight: 700 }}>
        Previous Sprints
      </Typography>

      {previousSprints.map((ps) => (
        <TaskGroup
          key={ps.id}
          droppableId={ps.id}
          droppableType={DroppableZones.PREVIOUS_SPRINTS}
          tasks={ps.tasks}
          headerTitle={ps.name}
        />
      ))}
    </Box>
  );
}
