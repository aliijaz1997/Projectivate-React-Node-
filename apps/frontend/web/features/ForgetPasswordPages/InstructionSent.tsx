import { Box, Typography } from "@mui/material";
import React from "react";
import useStyles from "./instructionSent.styles";

export default function InstructionSent() {
  const styles = useStyles({});
  return (
    <Box sx={styles.instuctionSentBackground}>
      <Box sx={styles.instuctionSentBorder}>
        <Box sx={styles.instructionSentText}>Instructions sent!</Box>
        <Box sx={{ mt: "2.5rem" }}>
          <Typography sx={styles.instructionSentString}>
            Instructions for resetting your password have been sent to
            <Box component="span" sx={{ color: "rgb(31,41,55)" }}>
              Email.
            </Box>
          </Typography>
        </Box>
        <Box sx={{ mt: "2.5rem" }}>
          <Typography sx={styles.instructionSentString}>
            You’ll receive this email within 5 minutes. Be sure to check your
            spam folder, too.
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}
