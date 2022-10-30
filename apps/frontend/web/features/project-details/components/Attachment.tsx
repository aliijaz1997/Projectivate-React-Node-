import React from "react";
import { FaLink } from "react-icons/fa";
import { CardButton } from "./CardButton";
import { Checkbox, Fade, Menu, MenuItem } from "@mui/material";
const label = { inputProps: { "aria-label": "Checkbox demo" } };

function Attachment() {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <div>
      <Menu
        MenuListProps={{
          "aria-labelledby": "fade-button",
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        TransitionComponent={Fade}
      >
        <MenuItem
          onClick={handleClose}
          className=" p-2 flex flex-row justify-center border-b-2 mb-1"
        >
          Members
        </MenuItem>
        <MenuItem
          onClick={handleClose}
          className="px-3 hover:bg-gray-100 flex flex-row justify-between"
        >
          Member
          <Checkbox {...label} color="primary" className="self-center" />
        </MenuItem>
        <MenuItem
          onClick={handleClose}
          className="px-3 hover:bg-gray-100 flex flex-row justify-between"
        >
          Member
          <Checkbox {...label} color="primary" className="self-center" />
        </MenuItem>
      </Menu>
    </div>
  );
}

export default Attachment;
