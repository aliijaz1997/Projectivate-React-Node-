import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { ForgetForm } from "~/web/common/types";
import { sendPasswordResetEmail } from "@firebase/auth";
import { auth } from "~/web/common/firebase/app";
import { toast } from "react-toastify";
import { Box, TextField } from "@mui/material";
import Button from "@mui/material/Button";
import useStyles from "./ForgetPassword.styles";
interface Props {
  clickHandler: () => void;
}
interface HandleSubmitProps {
  email: string;
}

export function ForgetPassword({ clickHandler }: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<ForgetForm>();
  const handleOnSubmit = ({ email }: HandleSubmitProps) => {
    sendPasswordResetEmail(auth, email)
      .then(() => {
        toast.success("Email is sent !");
        clickHandler();
      })
      .catch((error) => {
        toast.error(error.mesage);
      });
  };
  const styles = useStyles({});

  return (
    <Box sx={styles.forgetPasswordBackground}>
      <Box sx={styles.forgetPasswordContainer}>
        <Box sx={styles.forgetYourPassword}>Forgot your password</Box>
        <form onSubmit={handleSubmit(handleOnSubmit)}>
          <Controller
            name="email"
            control={control}
            defaultValue={""}
            rules={{ required: true }}
            render={({ field }) => (
              <TextField
                id="email"
                label="Enter your Email"
                fullWidth
                sx={styles.forgetPasswordTextField}
                {...field}
              />
            )}
          />

          <Box sx={styles.forgetPasswordButtonContainer}>
            <Button variant="contained" sx={styles.sendmeInstructionButton}>
              Send Me Instructions
            </Button>
          </Box>
        </form>
      </Box>
    </Box>
  );
}
