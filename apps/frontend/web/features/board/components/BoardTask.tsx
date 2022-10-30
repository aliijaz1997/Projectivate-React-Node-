import React, { Fragment, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useTaskDeleteMutation } from "~/web/store/services/tasks.service";
import { ErrorResponse, Task } from "~/web/common/types";
import { useAppDispatch, useAppSelector } from "~/web/store";
import moment from "moment";
import { Box, ListItem, Typography } from "@mui/material";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import CircularProgress from "@mui/material/CircularProgress";
import Avatar from "@mui/material/Avatar";
import { SubTaskList } from "./SubTaskList";
import { Divider } from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/router";
import useStyles from "./boardTask.styles";

interface BoardCardListItemsProps {
  task: Task;
}

export function BoardTask({ task }: BoardCardListItemsProps) {
  const { title, dateEnd, id } = task;
  const [taskDelete, { isLoading, error, isError, isSuccess, status }] =
    useTaskDeleteMutation();

  const router = useRouter();
  const projectId = router.query.projectId as string;

  const isGroupView = useAppSelector((state) => state.boardView.isGroupView);

  useEffect(() => {
    if (isError && error && "data" in error) {
      toast.error((error.data as ErrorResponse).message);
    }
  }, [isError, error]);
  if (isLoading)
    return (
      <Box sx={{ display: "flex" }}>
        <CircularProgress />
      </Box>
    );
  return (
    <ListItem>
      <Box
        sx={{
          bgcolor: "white",
          borderRadius: "0.4rem",
          display: "flex",
          flexDirection: "column",
          minWidth: "17rem",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            padding: " 0.35rem",
          }}
        >
          <DropdownMenu
            onDelete={() => {
              taskDelete(id);
            }}
          />
        </Box>
        <Link href={`/projects/${projectId}/board/${id}`}>
          <Box
            sx={{
              paddingBottom: "1.25rem",
              paddingLeft: "1rem",
              paddingRight: "1rem",
            }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                mt: "0.3rem",
              }}
            >
              <Typography
                sx={{
                  fontSize: "0.875rem",
                  lineHeight: "1.25rem",
                  fontWeight: 500,
                  color: "rgb(17, 24, 39, 1)",
                }}
              >
                {title}
              </Typography>
              <Box component="span">
                <Avatar
                  sx={{ height: "1.5rem", width: "1.5rem" }}
                  src=""
                  alt={id}
                />
              </Box>
            </Box>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "baseline",
              }}
            >
              <Box
                sx={{
                  fontSize: "0.875rem",
                  lineHeight: "1.25rem",
                  color: " rgb(75, 85, 99,1)",
                }}
              >
                {moment(dateEnd).format("MMM DD")}
              </Box>
            </Box>
          </Box>
        </Link>
        {isGroupView && (
          <>
            <Divider />
            <SubTaskList taskId={task.id} />
          </>
        )}
      </Box>
    </ListItem>
  );
}
const ITEM_HEIGHT = 48;

function DropdownMenu({ onDelete }: { onDelete: () => void }) {
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
      <IconButton
        aria-label="more"
        id="long-button"
        aria-controls={open ? "long-menu" : undefined}
        aria-expanded={open ? "true" : undefined}
        aria-haspopup="true"
        onClick={handleClick}
        sx={styles.moreHorizIconButton}
      >
        <MoreHorizIcon />
      </IconButton>
      <Menu
        id="long-menu"
        MenuListProps={{
          "aria-labelledby": "long-button",
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        PaperProps={{
          style: {
            maxHeight: ITEM_HEIGHT * 4.5,
            width: "17ch",
          },
        }}
      >
        <MenuItem key="Delete" onClick={() => onDelete()}>
          Delete
        </MenuItem>
      </Menu>
    </>
  );
}
