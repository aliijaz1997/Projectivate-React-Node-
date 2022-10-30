import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { FaEye } from "react-icons/fa";
import { ConfirmCodeForm } from "~/web/common/types";
import {
  Box,
  Button,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  TextField,
  Typography,
} from "@mui/material";
import useStyles from "./passwordConfirm.styles";
import Image from "next/image";
import projectivate from "../../../public/projectivate.png";
import { VisibilityOff, Visibility } from "@mui/icons-material";
interface State {
  password: string;
  showPassword: boolean;
}

export function PasswordConfirm() {
  const [passwordShown, setPasswordShown] = useState(false);
  const togglePasswordVisiblity = () => {
    setPasswordShown(!passwordShown);
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<ConfirmCodeForm>();
  const [confirmationCode, setConfirmationCode] = React.useState<State>({
    password: "",
    showPassword: false,
  });
  const [newPassword, setNewPassword] = React.useState<State>({
    password: "",
    showPassword: false,
  });

  const handleConfirmationCode =
    (prop: keyof State) => (event: React.ChangeEvent<HTMLInputElement>) => {
      setConfirmationCode({ ...confirmationCode, [prop]: event.target.value });
    };

  const handleClickShowConfirmationCode = () => {
    setConfirmationCode({
      ...confirmationCode,
      showPassword: !confirmationCode.showPassword,
    });
  };
  const handleNewPassword =
    (prop: keyof State) => (event: React.ChangeEvent<HTMLInputElement>) => {
      setNewPassword({ ...newPassword, [prop]: event.target.value });
    };

  const handleClickShowNewPassword = () => {
    setNewPassword({
      ...newPassword,
      showPassword: !newPassword.showPassword,
    });
  };

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  const styles = useStyles({});
  return (
    <Box sx={styles.passwordConfirmationContainer}>
      <Box sx={styles.passwordConfirmationBorder}>
        <Box sx={styles.passwordConfirmationLogoContainer}>
          <Image height="55" width="130" src={projectivate} alt="google-logo" />
        </Box>
        <form onSubmit={handleSubmit((data) => {})}>
          <Box sx={styles.passwordTextFieldContainer}>
            <Controller
              name="username"
              control={control}
              defaultValue={""}
              rules={{ required: true }}
              render={({ field }) => (
                <TextField
                  label=" Username"
                  id="Password"
                  variant="outlined"
                  type="text"
                  {...field}
                />
              )}
            />

            <FormControl sx={{ mt: "0.7rem" }} variant="outlined">
              <InputLabel htmlFor="ConfirmationCode">
                Confirmation Code
              </InputLabel>
              <Controller
                name="code"
                control={control}
                defaultValue={""}
                rules={{ required: true }}
                render={({ field }) => (
                  <OutlinedInput
                    id="passwordConfirmation"
                    type={confirmationCode.showPassword ? "text" : "password"}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowConfirmationCode}
                          onMouseDown={handleMouseDownPassword}
                          edge="end"
                        >
                          {confirmationCode.showPassword ? (
                            <VisibilityOff />
                          ) : (
                            <Visibility />
                          )}
                        </IconButton>
                      </InputAdornment>
                    }
                    label="Confirmation Code"
                    {...field}
                  />
                )}
              />
            </FormControl>

            <FormControl sx={{ mt: "0.7rem" }} variant="outlined">
              <InputLabel htmlFor="new-password">New Password</InputLabel>
              <Controller
                name="newPassword"
                control={control}
                defaultValue={""}
                rules={{ required: true }}
                render={({ field }) => (
                  <OutlinedInput
                    id="confirmPassword"
                    type={newPassword.showPassword ? "text" : "password"}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowNewPassword}
                          onMouseDown={handleMouseDownPassword}
                          edge="end"
                        >
                          {newPassword.showPassword ? (
                            <VisibilityOff />
                          ) : (
                            <Visibility />
                          )}
                        </IconButton>
                      </InputAdornment>
                    }
                    label="New Password"
                    {...field}
                  />
                )}
              />
            </FormControl>
          </Box>
          <Typography sx={styles.passwordCharacter}>
            Passwords must have at least 8 characters.
          </Typography>
          <Box sx={styles.passwordChangeButtonContainer}>
            <Button variant="contained" sx={styles.passwordChangeButton}>
              Change Password
            </Button>
          </Box>
        </form>
      </Box>
    </Box>
  );
}
