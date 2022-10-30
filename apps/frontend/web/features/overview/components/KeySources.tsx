import React from "react";
import Image from "next/image";
import picture from "./undraw_qr17.svg";
import { Box, Button, Typography } from "@mui/material";

export function KeySources() {
  return (
    <Box sx={{ mt: "5rem" }}>
      <Box component="span" sx={{ fontSize: "1.5rem", lineHeight: "2rem" }}>
        Key resources:
      </Box>

      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          borderWidth: "2px",
          borderColor: "rgb(243 244 246)",
          borderRadius: "0.375rem",
          mt: "0.75rem",
        }}
      >
        <Box>
          <Image
            src={picture}
            alt="Picture of the author"
            width={170}
            height={170}
          />
        </Box>
        <Box sx={{ my: { lg: "2.5rem" }, mx: { lg: "0.5rem" } }}>
          <Box sx={{ py: "0.75rem", px: "0.5rem" }}>
            <Typography>
              Align your team around a shared vision with a project brief and
              supporting resources.
            </Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              px: "0.5rem",
              mt: { lg: "0.5rem" },
            }}
          >
            <Button
              sx={{
                bgcolor: "rgb(147 197 253)",
                color: "white",
                fontWeight: 700,
                py: "0.5rem",
                px: "1rem",
                borderRadius: "0.25rem",
                "&:hover": {
                  bgcolor: "rgb(96 165 250)",
                },
              }}
            >
              Create project brief
            </Button>
            <Button
              sx={{
                "&:hover": {
                  bgcolor: "rgb(229 231 235)",
                  color: "white",
                  borderColor: "transparent",
                },
                color: "rgb(55 65 81)",

                fontWeight: 600,
                py: "0.5rem",
                px: "1rem",
                ml: "0.75rem",
                border: "1px solid rgb(59 130 246)",
                borderRadius: "0.25rem",
                bgcolor: "transparent",
              }}
            >
              Create project brief
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
