import { Box, IconButton, Popover } from "@mui/material";
import React from "react";
import { CgEye } from "react-icons/cg";
import { ViewList } from "./ViewList";

export function ViewsPopover() {
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
    null
  );

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  return (
    <>
      <IconButton
        onClick={handleClick}
        sx={{
          bgcolor: open ? "primary.main" : "rgb(242, 242, 242)",
          mr: "0.3rem",
          color: open ? "white" : "",
        }}
      >
        <CgEye />
      </IconButton>

      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
      >
        <ViewList />
      </Popover>
    </>
  );
}
