import { Box, Typography } from "@mui/material";
import Link from "next/link";
import React from "react";
import { FaListUl } from "react-icons/fa";
import { Project } from "~/common/types";
import useStyles from "./projectCard.styles";
interface ProjectCardProps {
  project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
  const styles = useStyles({});
  return (
    <Link href={`/projects/${project.id}/board`}>
      <a style={{ width: "9rem", textDecoration: "none" }}>
        <Box sx={styles.ProjectCardTransition}>
          <Box sx={styles.projectCardBody}>
            <FaListUl style={styles.projectCardIcon} />
            <Typography sx={styles.projectName}>{project.name}</Typography>
          </Box>
        </Box>
      </a>
    </Link>
  );
}
