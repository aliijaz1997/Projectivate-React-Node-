import React from "react";
import { DragDropContext } from "react-beautiful-dnd";
import { Project } from "~/web/common/types";
import { ListHeader } from "./components/ListHeader";
import { ListCategory } from "./components/ListCategory";
import { Box } from "@mui/material";
import { useAppSelector } from "~/web/store";

interface ListProps {
  project: Project;
}

export function ListView({ project }: ListProps) {
  const { field1: innerGroupName, field2: outerGroupName } = useAppSelector(
    (state) => state.views.currentView.groupings
  );
  return (
    <Box
      sx={{
        bgcolor: "rgb(252, 252, 252)",
      }}
    >
      <ListHeader />
      <ListCategory
        project={project}
        innerGroupName={innerGroupName}
        outerGroupName={outerGroupName}
      />
    </Box>
  );
}
