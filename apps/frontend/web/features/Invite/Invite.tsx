import React, { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { FaTimes } from "react-icons/fa";
import { toast } from "react-toastify";
import ClearIcon from "@mui/icons-material/Clear";
import { useInviteMutation } from "~/web/store/services/invite.service";
import { ErrorResponse } from "~/web/common/types";
import { QueryStatus } from "@reduxjs/toolkit/dist/query";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { TextField, Box, CircularProgress } from "@mui/material";
import useStyles from "./invite.styles";

export type InviteForm = {
  email: string;
};
interface OpenModalProps {
  open: boolean;
  onModalClose: () => void;
}

export function Invite({ onModalClose, open }: OpenModalProps) {
  const [invite, { isLoading, error, isError, isSuccess, status }] =
    useInviteMutation();
  const styles = useStyles({});

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<InviteForm>();
  useEffect(() => {
    if (isSuccess) {
      toast.success("invite successfully");
      onModalClose();
    }
    if (isError && error && "data" in error) {
      toast.error((error.data as ErrorResponse).message);
    }
  }, [isSuccess, isError, error, onModalClose]);
  if (isLoading)
    return (
      <Box sx={{ display: "flex" }}>
        <CircularProgress />
      </Box>
    );

  return (
    <Modal open={open} onClose={onModalClose}>
      <Box sx={styles.inviteModal}>
        <Box sx={styles.inviteHeader}>
          <Box sx={styles.invitePeopleString}>Invite people to Design</Box>
          <Button onClick={onModalClose}>
            <ClearIcon sx={styles.clearIcon} />
          </Button>
        </Box>
        <Box sx={styles.inviteForm}>
          <Typography>
            Your teammates will get an email that gives them access to your
            team.
          </Typography>
          <form
            onSubmit={handleSubmit((data) => {
              invite(data);
            })}
          >
            <Controller
              name="email"
              control={control}
              defaultValue={""}
              rules={{ required: true }}
              render={({ field }) => (
                <TextField
                  label="Email address"
                  sx={styles.inviteTextField}
                  fullWidth
                  placeholder="name@company.com"
                  variant="outlined"
                  {...field}
                />
              )}
            />

            <Box sx={styles.inviteButtonContainer}>
              <Button variant="contained" sx={styles.inviteSendButton}>
                Send
              </Button>
            </Box>
          </form>
        </Box>
      </Box>
    </Modal>
  );
}
