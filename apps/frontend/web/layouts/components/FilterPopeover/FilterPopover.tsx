import { IconButton } from "@mui/material";
import React from "react";
import { MdFilterAlt } from "react-icons/md";
import Popover from "@mui/material/Popover";
import { FilterRuleList } from "./FilterRuleList";
import { useAppSelector } from "~/web/store";

export function FilterPopover() {
  const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null);

  const fields = useAppSelector(
    (state) => state.views.currentView.filters.fields
  );

  const handlePopoverOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  return (
    <>
      <IconButton
        sx={{
          bgcolor:
            open || fields.length > 0 ? "primary.main" : "rgb(242, 242, 242)",
          mr: "0.3rem",
          color: open || fields.length > 0 ? "white" : "",
          "&:hover": {
            bgcolor: open || fields.length > 0 ? "primary.main" : "",
          },
        }}
        aria-owns={open ? "mouse-over-popover" : undefined}
        aria-haspopup="true"
        onClick={handlePopoverOpen}
      >
        <MdFilterAlt />
      </IconButton>
      <Popover
        id="mouse-over-popover"
        open={open}
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
        onClose={handlePopoverClose}
        disableRestoreFocus
      >
        <FilterRuleList />
      </Popover>
    </>
  );
}
