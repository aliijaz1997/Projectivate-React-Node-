import { Button, IconButton, Typography } from "@mui/material";
import { GENERIC_VIEW_CONSTANT, View } from "@projectivate/common";
import { useRouter } from "next/router";
import React from "react";
import {
  useChangeCurrentViewMutation,
  useDeleteViewMutation,
} from "~/web/store/services/views.service";
import DeleteIcon from "@mui/icons-material/Delete";
import { Box } from "@mui/system";
import { useAppSelector } from "~/web/store";
import useStyles from "./ViewListItem.styles";

export function ViewListItem({ item }: { item: View }) {
  const [deleteView] = useDeleteViewMutation();
  const [changeCurrentView] = useChangeCurrentViewMutation();
  const router = useRouter();

  const projectId = router.query.projectId as string;
  const currentViewId = useAppSelector((state) => state.views.currentView.id);

  const styles = useStyles({
    active: currentViewId === item.id,
  });

  const handleItemClick = () => {
    if (projectId) {
      changeCurrentView({
        projectId,
        viewId: item.id,
      });
    }
  };

  const handleDelete = () => {
    if (projectId) {
      deleteView({
        projectId: projectId,
        viewId: item.id,
      });
    }
  };

  return (
    <Box sx={styles.wrapper}>
      <Box onClick={handleItemClick}>
        <Typography sx={styles.title}>{item.name}</Typography>
      </Box>
      {item.name !== GENERIC_VIEW_CONSTANT && (
        <IconButton size="small" onClick={handleDelete}>
          <DeleteIcon />
        </IconButton>
      )}
    </Box>
  );
}
