import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import { Invite } from "~/web/features/Invite/Invite";
interface Props {
  drawer: JSX.Element;
  container: (() => HTMLElement) | undefined;
  handleDrawerToggle: () => void;
  open: boolean;
}
const drawerWidth = 240;
export function SideBar({
  drawer,
  container,
  open,
  handleDrawerToggle,
}: Props) {
  return (
    <Box
      component="nav"
      sx={{ width: { md: drawerWidth }, flexShrink: { sm: 0 } }}
      aria-label="mailbox folders"
    >
      {/* The implementation can be swapped with js to avo  id SEO duplication of links. */}
      <Drawer
        container={container}
        variant="temporary"
        open={open}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile.
        }}
        sx={{
          display: { xs: "block", md: "none" },
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            width: 240,
          },
        }}
      >
        {drawer}
      </Drawer>
      <Drawer
        variant="permanent"
        sx={{
          display: { xs: "none", md: "block" },
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            width: 240,
          },
        }}
        open
      >
        {drawer}
      </Drawer>
    </Box>
  );
}
