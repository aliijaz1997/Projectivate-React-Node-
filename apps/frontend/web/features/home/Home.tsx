import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useProjectListQuery } from "~/web/store/services/projects.service";
import { CreateProjectCard } from "./components/CreateProjectCard";
import { ProjectCard } from "./components/ProjectCard";
import { Box, Alert, CircularProgress } from "@mui/material";
import useStyles from "./home.styles";

export function Home() {
  const {
    isError,
    isLoading,
    isSuccess,
    data: projects,
  } = useProjectListQuery();
  const styles = useStyles({});
  if (isLoading)
    return (
      <Box sx={{ display: "flex" }}>
        <CircularProgress />
      </Box>
    );
  if (isError) return <Alert severity="error">Error occurred</Alert>;

  return (
    <Box sx={styles.homeProjectContainer}>
      <Box sx={styles.homeProjectList}>
        {projects &&
          projects.map((project, index) => (
            <ProjectCard project={project} key={index} />
          ))}
        <Box sx={styles.homeProjectCreate}>
          <CreateProjectCard />
        </Box>
      </Box>
    </Box>
  );
}
