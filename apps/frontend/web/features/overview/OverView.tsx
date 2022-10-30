import { Box, Button, Typography } from "@mui/material";
import React, { useState } from "react";
import { FaLightbulb } from "react-icons/fa";
import { KeySources } from "./components/KeySources";
import { ProjectRole } from "./components/ProjectRole";
import { StatusBar } from "./components/StatusBar";

export function OverView() {
  return (
    <Box sx={{ display: "flex", minHeight: "100vh" }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          boxSizing: "border-box",
        }}
      >
        <Box sx={{ width: { sm: "83%" }, mt: "2.5rem" }}>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Box sx={{ py: "0.5rem" }}>
              <Typography
                sx={{
                  fontSize: "1.5rem",
                  lineHeight: "2rem",
                  color: "rgb(31 41 55)",
                  bgcolor: "rgb(229 231 235)",
                  textTransform: "uppercase",
                  letterSpacing: " 0.025em",
                }}
              >
                How we will collaborate
              </Typography>
            </Box>
            <Button
              sx={{
                ml: "0.5rem",
                display: "flex",
                alignItems: "center",
                fontSize: "0.75rem",
                lineHeight: "1rem",
                fontWeight: 500,
                color: "rgb(75 85 99)",
                bgcolor: "rgb(229 231 235)",
                "&:hover": {
                  bgcolor: "rgb(229 231 235)",
                },
              }}
            >
              <FaLightbulb />

              <Box
                component="span"
                sx={{
                  ml: "0.25rem",
                }}
              >
                Show Examples
              </Box>
            </Button>
          </Box>
          <Box sx={{ bgcolor: "white", height: "10rem" }}>
            We use this project to track web production requests. Please submit
            a request through the projects form. Make sure to specify priority,
            design needs, and due date.
          </Box>
          <ProjectRole />
          <KeySources />
        </Box>
      </Box>
      <Box sx={{ flex: "1 1 auto", bgcolor: " rgb(229 231 235)" }}>
        <StatusBar />
      </Box>
    </Box>
  );
}
