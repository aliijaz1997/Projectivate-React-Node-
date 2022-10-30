import { Box, Typography } from "@mui/material";
import Link from "next/link";
import React from "react";
import useStyles from "./templateView.styles";

export default function TemplateView() {
  const styles = useStyles({});
  return (
    <Box sx={styles.templateViewFlexContainer}>
      <Link href="/projects/templates/construction/create">
        <a style={{ textDecoration: "none" }}>
          <Box sx={styles.constructionMainContainer}>
            <Box sx={styles.consturctionAndCustomContainer}>
              <Typography sx={styles.consturctionAndCustomTypography}>
                Construction
              </Typography>
            </Box>
          </Box>
        </a>
      </Link>
      <Link href="/projects/templates/custom/create">
        <a style={{ textDecoration: "none" }}>
          <Box sx={styles.customMainContainer}>
            <Box sx={styles.consturctionAndCustomContainer}>
              <Typography sx={styles.consturctionAndCustomTypography}>
                Custom
              </Typography>
            </Box>
          </Box>
        </a>
      </Link>
    </Box>
  );
}
