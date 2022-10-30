import React from "react";
import { FaCalendarCheck } from "react-icons/fa";
import { CardButton } from "./CardButton";
import { Box, ListItem, Menu, MenuItem, Typography } from "@mui/material";
import Fade from "@mui/material/Fade";
import useStyles from "./dueDate.styles";
export function DueDate() {
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
    <div>
      <CardButton icon={<FaCalendarCheck />} tabIndex={3}>
        <Box component="span">Due Date</Box>
      </CardButton>

      <Menu
        MenuListProps={{
          "aria-labelledby": "fade-button",
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        TransitionComponent={Fade}
      >
        <MenuItem onClick={handleClose} sx={styles.dueDateTypography}>
          Due Date
        </MenuItem>
      </Menu>
    </div>
  );
}
