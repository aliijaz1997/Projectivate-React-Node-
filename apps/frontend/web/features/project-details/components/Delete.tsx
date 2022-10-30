import React, { useState } from "react";
import { FaRegTrashAlt } from "react-icons/fa";
import { useTaskDeleteMutation } from "~/web/store/services/tasks.service";
import { CardButton } from "./CardButton";
import { unSelectTask, selectTask } from "~/web/store/slices/detailsTask.slice";
import { useAppDispatch } from "~/web/store";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { CircularProgress } from "@mui/material";
import useStyles from "./delete.styles";

interface DeleteProps {
  taskId: string;
}
export function Delete({ taskId }: DeleteProps) {
  const [openModal, setOpenModal] = useState(false);

  const dispatch = useAppDispatch();
  const handleUnSelectTask = () => {
    dispatch(unSelectTask());
  };

  const [taskDelete, { isLoading, isSuccess }] = useTaskDeleteMutation();
  if (isSuccess) {
    handleUnSelectTask();
  }

  if (isLoading)
    return (
      <Box sx={{ display: "flex" }}>
        <CircularProgress />
      </Box>
    );
  return (
    <>
      <Button
        variant="contained"
        sx={{ mt: "0.3rem", color: "white" }}
        onClick={() => {
          setOpenModal(true);
        }}
        startIcon={<FaRegTrashAlt />}
      >
        Delete
      </Button>
      <Modal
        open={openModal}
        onClose={() => {
          setOpenModal(false);
        }}
      >
        <DeleteConfirmation
          setOpenModal={setOpenModal}
          taskDelete={taskDelete}
          taskId={taskId}
        />
      </Modal>
    </>
  );
}

interface DeleteConfirmation {
  setOpenModal: (any: boolean) => void;
  taskDelete: (taskId: string) => void;
  taskId: string;
}
function DeleteConfirmation({
  setOpenModal,
  taskDelete,
  taskId,
}: DeleteConfirmation) {
  const styles = useStyles({});
  return (
    <Box sx={styles.deleteModal}>
      <Typography sx={styles.makeSureTypography}>
        Are you sure , you want to delete it?
      </Typography>
      <Typography sx={styles.noteTypography}>
        Note: After deleting you will not be able to retrieve
      </Typography>
      <Box sx={{ float: "right", p: "0.75rem" }}>
        <Button
          onClick={() => {
            taskDelete(taskId);
          }}
          size="small"
        >
          Delete
        </Button>
        <Button
          onClick={() => {
            setOpenModal(false);
          }}
          size="small"
          type="button"
        >
          Cancel
        </Button>
      </Box>
    </Box>
  );
}
