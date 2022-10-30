import React from "react";
import { Box, Button } from "@mui/material";
interface CardButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon: React.ReactNode;
  tabIndex?: number;
}
export function CardButton({
  icon,
  children,
  tabIndex,
  ...props
}: CardButtonProps) {
  return (
    <>
      <Button
        variant="contained"
        sx={{
          mt: "0.5rem",
          p: "0.5rem",
          display: "flex",
          justifyContent: "flex-start",
          flexWrap: "nowrap",
        }}
        size="small"
        fullWidth
        tabIndex={tabIndex}
      >
        <Box sx={{ pr: "0.5rem" }}>{icon}</Box>
        <Box sx={{ fontSize: "1rem", lineheight: " 1.5rem" }}>{children}</Box>
      </Button>
    </>
  );
}
