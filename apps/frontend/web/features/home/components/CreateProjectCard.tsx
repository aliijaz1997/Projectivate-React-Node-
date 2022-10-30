import NextLink from "next/link";
import React from "react";
import { FaPlus } from "react-icons/fa";
import { Box, Link } from "@mui/material";
import useStyles from "./CreateProjectCard.styles";
export function CreateProjectCard() {
  const styles = useStyles({});
  return (
    <NextLink href="/projects/templates">
      <Link>
        <Box sx={styles.ProjectCardCreateBorder}>
          <Box sx={styles.projectCardCreatIcon}>
            <FaPlus style={styles.projectCardIcon} data-testid="plus-icon" />
          </Box>
        </Box>
      </Link>
    </NextLink>
  );
}
