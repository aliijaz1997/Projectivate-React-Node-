import React, { FormEvent, useEffect, useState } from "react";
import { FaBars } from "react-icons/fa";
import { toast } from "react-toastify";
import { ErrorResponse } from "~/web/common/types";
import { useTaskUpdateMutation } from "~/web/store/services/tasks.service";
import {
  Box,
  Button,
  CircularProgress,
  TextareaAutosize,
  Typography,
} from "@mui/material";
import useStyles from "./description.styles";

interface DescriptionProps {
  taskId: string;
  projectId: string;
  description: string;
}
export function Description({
  taskId,
  projectId,
  description,
}: DescriptionProps) {
  const [taskUpdate, { isLoading, isError, error }] = useTaskUpdateMutation();

  useEffect(() => {
    if (isError && error && "data" in error) {
      toast.error((error.data as ErrorResponse).message);
    }
  }, [isError, error]);

  const [showDescriptionForm, setshowDescriptionForm] = useState(false);
  const [descriptions, setDescription] = useState(description);
  const toggleDescriptionInput = () => {
    setshowDescriptionForm(true);
  };

  const handleDescriptionSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    taskUpdate({ projectId, body: { description: descriptions }, taskId });
    setshowDescriptionForm(false);
  };
  const handleDescriptionChange = (e: FormEvent<HTMLTextAreaElement>) => {
    setDescription(e.currentTarget.value);
  };
  const styles = useStyles({});

  if (isLoading)
    return (
      <Box sx={{ display: "flex" }}>
        <CircularProgress />
      </Box>
    );
  return (
    <Box sx={styles.flexContainer}>
      <Box sx={{ mr: "0.75rem", mt: "0.25rem" }}>
        <FaBars style={styles.FaBars} />
      </Box>
      <Box>
        <Typography sx={styles.descriptionTypography}>Description</Typography>
        {showDescriptionForm ? (
          <form onSubmit={handleDescriptionSubmit}>
            <TextareaAutosize
              cols={31}
              minRows={3}
              onChange={handleDescriptionChange}
              value={descriptions}
            />
            <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
              <Button
                type="submit"
                size="small"
                sx={{ mt: "0.2rem", color: "white" }}
                variant="contained"
              >
                Save
              </Button>
            </Box>
          </form>
        ) : (
          <Box
            sx={styles.descriptionToggleContainer}
            onClick={toggleDescriptionInput}
          >
            {description}
          </Box>
        )}
      </Box>
    </Box>
  );
}
