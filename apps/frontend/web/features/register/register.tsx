import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Checkbox,
  CircularProgress,
  Divider,
  FormControl,
  FormControlLabel,
  FormGroup,
  IconButton,
  InputAdornment,
  InputLabel,
  Link,
  OutlinedInput,
  Typography,
} from "@mui/material";

import Image from "next/image";
import google from "../../../public/google.png";
import facebook from "../../../public/facebook.png";
import projectivate from "../../../public/projectivate.png";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import theme from "../../../Theme/Theme";
import { useRouter } from "next/router";

import { useForm, Controller } from "react-hook-form";
import { toast } from "react-toastify";

import NextLink from "next/link";
import { useRegisterMutation } from "~/web/store/services/auth.service";

import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
} from "@firebase/auth";
import { auth } from "~/web/common/firebase/app";
import { useAppDispatch } from "~/web/store";
import { ErrorResponse } from "~/web/common/types";
import itfierslogo from "../../../public/itfierslogo.png";
import useStyles from "./register.styles";

export type RegisterForm = {
  email: string;
  password: string;
};
interface State {
  amount: string;
  password: string;
  showPassword: boolean;
}
export function Register() {
  const [values, setValues] = useState<State>({
    amount: "",
    password: "",
    showPassword: false,
  });
  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    });
  };
  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };
  const [passwordShown, setPasswordShown] = useState(false);
  const dispatch = useAppDispatch();
  const [isLoading, setIsLoading] = useState(false);

  const togglePasswordVisiblity = () => {
    setPasswordShown(!passwordShown);
  };

  const router = useRouter();

  const [registerUser, { isError, error }] = useRegisterMutation();
  useEffect(() => {
    if (isError && error && "data" in error) {
      toast.error((error.data as ErrorResponse).message);
    }
  }, [isError, error]);

  const { tenantId } = router.query;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterForm>();

  const handleOnSubmit = (data: RegisterForm) => {
    setIsLoading(true);
    createUserWithEmailAndPassword(auth, data.email, data.password)
      .then((userCredential) => {
        toast.success("Successfully Registered ");

        registerUser({
          email: data.email,
          userId: userCredential.user.uid,
          tenantId: tenantId as string | undefined,
        })
          .unwrap()
          .then(() => {
            sendEmailVerification(userCredential.user)
              .then(() => {
                toast.success("Successfully Sent Email. Please confirm email");
                router.push("/auth/email-sent");
                setIsLoading(false);
              })
              .catch((error) => {
                toast.error(error.message);
                setIsLoading(false);
              });
          })
          .catch((error) => {
            toast.error(error.message);
            setIsLoading(false);
          });
      })
      .catch((error) => {
        toast.error(error.message);
        setIsLoading(false);
      });
  };
  const styles = useStyles({});
  if (isLoading)
    return (
      <Box sx={{ display: "flex" }}>
        <CircularProgress />
      </Box>
    );

  return (
    <Box sx={styles.signupMainContainer}>
      <Box sx={{ marginX: "1.5rem" }}>
        <Box sx={styles.signupProjectivateLogo}>
          <Image height="55" width="130" src={projectivate} alt="google-logo" />
        </Box>

        <Typography sx={styles.signupString}>
          Sign into unlock the best of adventure
        </Typography>
      </Box>
      <Box sx={{ marginTop: "0.8rem", marginX: "1.5rem" }}>
        <Typography sx={styles.signupWith}>Sign in with</Typography>
        <Box sx={styles.signupWithButtons}>
          <Box sx={styles.signupButtonConatiner}>
            <Box sx={styles.signupWithButtonIcon}>
              <IconButton sx={styles.signupButton}>
                <Image height="23" width="23" src={google} alt="google-logo" />
              </IconButton>
            </Box>
          </Box>
          <Box sx={styles.signupButtonConatiner}>
            <Box sx={styles.signupWithButtonIcon}>
              <IconButton sx={styles.signupButton}>
                <Image
                  height="23"
                  width="23"
                  src={facebook}
                  alt="facebook-logo"
                />
              </IconButton>
            </Box>
          </Box>
        </Box>
      </Box>
      <Divider sx={styles.divider}>Or continue with email</Divider>
      <Box sx={{ marginX: "1.5rem", marginTop: "1.3rem" }}>
        <form onSubmit={handleSubmit(handleOnSubmit)}>
          <FormControl
            sx={{ width: "100%" }}
            variant="outlined"
            size="small"
            color="primary"
          >
            <InputLabel htmlFor="outlined-adornment-password">
              Email address
            </InputLabel>
            <OutlinedInput
              id="outlined-adornment-password"
              label="Email address"
              {...register("email", { required: true })}
            />
          </FormControl>
          <FormControl
            sx={{ marginTop: "1rem", width: "100%" }}
            variant="outlined"
            size="small"
            color="primary"
          >
            <InputLabel htmlFor="outlined-adornment-password">
              Password
            </InputLabel>
            <OutlinedInput
              id="outlined-adornment-password"
              type={values.showPassword ? "text" : "password"}
              value={values.password}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {values.showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
              label="Password"
              {...register("password", { required: true })}
            />
          </FormControl>
        </form>

        <FormGroup>
          <FormControlLabel
            control={<Checkbox size="small" color="primary" defaultChecked />}
            label="Agree with Terams & Privacy Policy"
          />
        </FormGroup>

        <Box sx={{ width: "100%", marginTop: "0.7rem" }}>
          <Button
            fullWidth
            variant="contained"
            color="primary"
            size="large"
            sx={{ color: "white", fontWeight: "bold" }}
          >
            join now
          </Button>
        </Box>
        <Divider sx={styles.dividerAlreadyMember}>Already a Member</Divider>

        <Typography
          fontSize="1.3rem"
          textAlign="center"
          marginTop="1.3rem"
          fontWeight="bold"
          sx={{ color: "	rgb(115, 115, 115)" }}
        >
          <Link
            href="/auth/login"
            sx={{
              color: "primary.main",
              textDecoration: "none",
              cursor: "pointer",
            }}
          >
            Sign in
          </Link>{" "}
          to unlock the best of productivity
        </Typography>
        <Typography
          textAlign="center"
          marginTop="1rem"
          fontSize="0.9rem"
          sx={{ color: "rgb(89, 89, 89)" }}
        >
          By proceeding, you agree to our
          <Link href="#" sx={{ color: "primary.main", textDecoration: "none" }}>
            Terms of use{" "}
          </Link>
          and confirm you have read our
        </Typography>
        <Typography textAlign="center" fontSize="0.9rem">
          <Link href="#" sx={{ color: "primary.main", textDecoration: "none" }}>
            Privacy and Cookie Statement
          </Link>
        </Typography>
        <Typography
          sx={{
            maxWidth: "25rem",
            textAlign: "center",
            marginX: "auto",
            fontSize: "0.9rem",
            color: "	rgb(115, 115, 115)",
          }}
        >
          This is protected by reCAPTCHA and the Google{" "}
          <Link href="#" sx={{ color: "primary.main", textDecoration: "none" }}>
            Privacy Policy
          </Link>{" "}
          and{" "}
          <Link href="#" sx={{ color: "primary.main", textDecoration: "none" }}>
            Terms of Service
          </Link>{" "}
          apply.
        </Typography>
      </Box>
    </Box>
  );
}
