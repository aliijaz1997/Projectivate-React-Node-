import classNames from "classnames";
import React, { useEffect, useState } from "react";
import { FaTrash } from "react-icons/fa";
import { toast } from "react-toastify";
import { ErrorResponse } from "~/web/common/types";
import { useDeleteProjectCustomFieldItemMutation } from "~/web/store/services/customfield.service";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import DeleteIcon from "@mui/icons-material/Delete";
import { IconButton } from "@mui/material";

interface Props {
  customFieldName: string;
  className?: string;
  projectId: string;
  fieldItemId: string;
}

export function DeleteCustomFieldItem({
  customFieldName,
  fieldItemId,
  projectId,
  className,
}: Props) {
  const [
    deleteProjectCustomFieldItem,
    {
      isError: isDeleteProjectCustomFieldItemError,
      isLoading: isDeleteProjectCustomFieldItemLoading,
      isSuccess: isDeleteProjectCustomFieldItemSuccess,
      error: deleteProjectCustomFieldItemError,
    },
  ] = useDeleteProjectCustomFieldItemMutation();

  useEffect(() => {
    if (
      isDeleteProjectCustomFieldItemError &&
      deleteProjectCustomFieldItemError &&
      "data" in deleteProjectCustomFieldItemError
    ) {
      toast.error(
        (deleteProjectCustomFieldItemError.data as ErrorResponse).message
      );
    }
  }, [deleteProjectCustomFieldItemError, isDeleteProjectCustomFieldItemError]);

  const classes = classNames(
    "ml-2 text-2xl cursor-pointer text-error",
    className
  );

  const [open, setOpen] = useState(false);

  return (
    <>
      <IconButton className={classes} onClick={() => setOpen(true)}>
        <DeleteIcon />
      </IconButton>

      <Modal
        open={open}
        onClose={() => {
          setOpen(false);
        }}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            position: "absolute" as "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 700,
            bgcolor: "background.paper",
            border: "2px solid #000",
            boxShadow: 24,
            p: 4,
            height: "45rem",
            overflowY: "auto",
          }}
        >
          <Box
            sx={{
              mt: "0.75rem",
              ml: "0.75rem",
              mr: "0.75rem",
              color: " rgb(31 41 55)",
            }}
          >
            Please make sure that you want to delete it with content in it
          </Box>
          <Box
            sx={{
              fontWeight: 300,
              fontSize: "0.75rem",
              lineHeight: "1rem",
              fontStyle: "italic",
            }}
          >
            Note: After deleting you will not be able to retrieve
          </Box>
          <Box sx={{ float: "right", p: "0.75rem" }}>
            <Button
              onClick={() => {
                deleteProjectCustomFieldItem({
                  field: customFieldName,
                  fieldItemId: fieldItemId,
                  projectId,
                  body: { keepTasks: false },
                });
              }}
              size="small"
            >
              Yes, Delete All
            </Button>
            <Button
              onClick={() => {
                deleteProjectCustomFieldItem({
                  field: customFieldName,
                  fieldItemId: fieldItemId,
                  projectId,
                  body: { keepTasks: true },
                });
              }}
              size="small"
              type="button"
            >
              Delete Group only
            </Button>
          </Box>
        </Box>
      </Modal>
    </>
  );
}
