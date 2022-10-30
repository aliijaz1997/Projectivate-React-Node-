import { Box, Button } from "@mui/material";
import React from "react";
import { FaUserCircle } from "react-icons/fa";

export function ProjectRole() {
  return (
    <Box sx={{ bgcolor: "white", mt: "3rem", minWidth: "0px" }}>
      <Box sx={{ mb: "0.75rem" }}>
        <Box component="span" sx={{ fontSize: "1.5rem", lineHeight: "2rem" }}>
          Project roles:
        </Box>
      </Box>
      <Box sx={{ display: "flex", flexWrap: "wrap" }}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            p: "0.25rem",
            width: "auto",
          }}
        >
          <Box sx={{ mx: "0.5rem" }}>
            <FaUserCircle
              style={{
                height: "2rem",
                width: "2rem",
                color: "rgb(229 231 235)",
              }}
            />
          </Box>
          <Box
            sx={{
              width: "100%",
              pl: "0.25rem",
              pr: "1rem",
              py: "0.75rem",
              lineHeight: " 1.25rem",
            }}
          >
            <Button sx={{ color: "black" }}>Show Examples</Button>
          </Box>
        </Box>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            p: "0.25rem",
            width: "auto",
            ml: { lg: "1rem" },
          }}
        >
          <Box sx={{ mx: "0.5rem" }}>
            <FaUserCircle
              style={{
                height: "2rem",
                width: "2rem",
                color: "rgb(107 114 128)",
              }}
            />
          </Box>
          <Box
            sx={{
              width: "100%",
              pl: "0.25rem",
              pr: "1rem",
              py: "0.75rem",
              lineHeight: "1.25rem",
            }}
          >
            <Button sx={{ color: "black" }}>Show Examples</Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
