import { Box, Typography } from "@mui/material";
import React from "react";
import {
  FaClipboardList,
  FaRegCalendarAlt,
  FaUserFriends,
} from "react-icons/fa";

export function StatusBar() {
  return (
    <Box
      sx={{
        mt: "1.25rem",
        mx: "0.25rem",
        padding: { lg: "1.75rem" },
        boxSizing: "border-box",
      }}
    >
      <Typography
        sx={{
          fontSize: { xs: "1.125rem", lg: "1.5rem" },
          lineHeight: { xs: "1.75rem", lg: "2rem" },
          color: "rgb(17 24 39)",
          p: "0.25rem",
          textAlign: { xs: "center", lg: "left" },
        }}
      >
        Whats the status?
      </Typography>

      <Box sx={{ display: { lg: "flex" } }}>
        <Box sx={{ mt: "0.5rem" }}>
          <Box
            component="span"
            sx={{
              px: "0.5rem",
              py: "0.25rem",
              lineHeight: "1.25rem",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              bgcolor: "white",
              borderWidth: "1px",
              borderRadius: "0.25rem",
              "&:hover": {
                bgcolor: "rgb(220 252 231)",
                border: "1px solid rgb(187 247 208) ",
              },
            }}
          >
            <svg
              style={{
                width: "1.25rem",
                height: "1.25rem",
                color: " rgb(22 163 74)",
              }}
              viewBox="0 0 8 8"
              fill="currentColor"
            >
              <circle cx="4" cy="4" r="3" />
            </svg>
            <Box
              component="span"
              sx={{
                ml: "0.25rem",
                width: "4rem",
                fontSize: "0.875rem",
                lineHeight: "1.25rem",
                fontWeight: 500,
                color: "rgb(39 39 42)",
                textAlign: "center",
              }}
            >
              on-track
            </Box>
          </Box>
        </Box>
        <Box sx={{ mt: "0.5rem" }}>
          <Box
            component="span"
            sx={{
              px: "0.5rem",
              py: "0.25rem",
              lineHeight: "1.25rem",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              bgcolor: "white",
              borderWidth: "1px",
              borderRadius: "0.25rem",
              "&:hover": {
                bgcolor: "rgb(254 249 195)",
                border: "1px solid rgb(254 240 138)",
              },
            }}
          >
            <svg
              style={{
                width: "1.25rem",
                height: "1.25rem",
                color: "rgb(250 204 21)",
              }}
              viewBox="0 0 8 8"
              fill="currentColor"
            >
              <circle cx="4" cy="4" r="3" />
            </svg>
            <Box
              component="span"
              sx={{
                ml: "0.25rem",
                width: "4rem",
                fontSize: "0.875rem",
                lineHeight: "1.25rem",
                fontWeight: 500,
                color: "rgb(39 39 42)",
                textAlign: "center",
              }}
            >
              on-track
            </Box>
          </Box>
        </Box>
        <Box sx={{ mt: "0.5rem" }}>
          <Box
            component="span"
            sx={{
              px: "0.5rem",
              py: "0.25rem",
              lineHeight: "1.25rem",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              bgcolor: "white",
              borderWidth: "1px",
              borderRadius: "0.25rem",
              "&:hover": {
                bgcolor: "rgb(254 226 226)",
                border: "1px solid rgb(254 202 202)",
              },
            }}
          >
            <svg
              style={{
                width: "1.25rem",
                height: "1.25rem",
                color: "rgb(220 38 38)",
              }}
              viewBox="0 0 8 8"
              fill="currentColor"
            >
              <circle cx="4" cy="4" r="3" />
            </svg>
            <Box
              component="span"
              sx={{
                ml: "0.25rem",
                width: "4rem",
                fontSize: "0.875rem",
                lineHeight: "1.25rem",
                fontWeight: 500,
                color: "rgb(31 41 55)",
                textAlign: "center",
                borderRadius: "0.375rem",
              }}
            >
              on-track
            </Box>
          </Box>
        </Box>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          mt: { xs: "10rem", lg: "18rem" },
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", p: "0.25rem" }}>
          <FaRegCalendarAlt
            style={{
              height: "1.5rem",
              width: "1.5rem",
              color: "rgb(75 85 99)",
            }}
          />
          <Box
            component="span"
            sx={{
              fontSize: "0.875rem",
              lineHeight: "1.25rem",
              color: "rgb(75 85 99)",
              ml: "0.5rem",
            }}
          >
            No due date
          </Box>
        </Box>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            mt: "3rem",
            p: "0.25rem",
          }}
        >
          <FaUserFriends
            style={{
              height: "1.5rem",
              width: "1.5rem",
              color: "rgb(75 85 99)",
            }}
          />
          <Box
            component="span"
            sx={{
              fontSize: "0.875rem",
              lineHeight: "1.25rem",
              color: "rgb(75 85 99)",
              ml: "0.5rem",
            }}
          >
            You join
          </Box>
        </Box>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            mt: "3rem",
            p: "0.25rem",
          }}
        >
          <FaClipboardList
            style={{
              height: "1.5rem",
              width: "1.5rem",
              color: "rgb(75 85 99)",
            }}
          />

          <Box
            component="span"
            sx={{
              fontSize: "0.875rem",
              lineHeight: "1.25rem",
              color: "rgb(75 85 99)",
              ml: "0.5rem",
            }}
          >
            project created
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
