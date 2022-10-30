import { Box, Typography, Alert, CircularProgress } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useAssigneeOfTasksQuery } from "~/web/store/services/tasks.service";
import { useAssigneeQuery } from "~/web/store/services/tenants.service";
import useStyles from "./addedMember.styles";
import MemberItem from "./MemberListItem";

interface AddedMembersProps {
  taskId: string;
}

export function AddedMember({ taskId }: AddedMembersProps) {
  const { data: members, isLoading, isError } = useAssigneeOfTasksQuery(taskId);
  const styles = useStyles({});
  if (isLoading)
    return (
      <Box sx={{ display: "flex" }}>
        <CircularProgress />
      </Box>
    );
  if (isError) return <Alert severity="error">Error occurred</Alert>;
  if (!members) return <Box>No members Found</Box>;
  return (
    <Box sx={{ p: "0.75rem", mt: "1rem", mx: "1.25rem" }}>
      <Typography sx={styles.assigneeTypography}>Assignee</Typography>
      {members.map((m) => {
        return (
          <Box sx={{ display: "flex", gap: "0.5rem" }} key={m.id}>
            <MemberItem member={m} taskId={taskId} />
          </Box>
        );
      })}
    </Box>
  );
}
