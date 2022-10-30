import {
  Box,
  Button,
  Checkbox,
  Divider,
  FormControl,
  FormControlLabel,
  FormGroup,
  IconButton,
  InputAdornment,
  InputBase,
  InputLabel,
  Link,
  OutlinedInput,
  Typography,
} from "@mui/material";
import React from "react";
import Image from "next/image";
import google from "../../../public/google.png";
import facebook from "../../../public/facebook.png";
import projectivate from "../../../public/projectivate.png";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import theme from "../../../Theme/Theme";

import { useForm } from "react-hook-form";
import { FaEye, FaEyeSlash, FaGoogle } from "react-icons/fa";

import NextLink from "next/link";

import {
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "@firebase/auth";
import { auth } from "~/web/common/firebase/app";
import { useAppDispatch } from "~/web/store";
import router from "next/router";
import { toast } from "react-toastify";
export type LoginForm = {
  email: string;
  password: string;
};
import itfierslogo from "../../../public/itfierslogo.png";
import { login } from "~/web/store/slices/auth.slice";
import useStyles from "./login.styles";

interface State {
  amount: string;
  password: string;
  showPassword: boolean;
}

export function Login() {
  const [values, setValues] = React.useState<State>({
    amount: "",
    password: "",
    showPassword: false,
  });
  const [isLoading, setIsLoading] = React.useState(false);

  const handleChange =
    (prop: keyof State) => (event: React.ChangeEvent<HTMLInputElement>) => {
      setValues({ ...values, [prop]: event.target.value });
    };

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

  const dispatch = useAppDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>();

  const handleFormSubmit = (data: LoginForm) => {
    setIsLoading(true);
    signInWithEmailAndPassword(auth, data.email, data.password).then(
      (userCredentials) => {
        userCredentials.user
          .getIdToken()
          .then((idToken) => {
            setIsLoading(false);
            dispatch(login(idToken));
            router.push("/");
          })
          .catch((error) => {
            setIsLoading(false);
          });
      }
    );
  };

  const signInWithGoogle = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then((result) => {
        result.user.getIdToken().then((token) => {
          dispatch(login(token));
          router.push("/");
        });
      })
      .catch((error) => {
        const errorMessage = error.message;
        toast.error(errorMessage);
      });
  };
  const styles = useStyles({});
  return (
    <Box sx={styles.signinMainContainer}>
      <Box sx={{ marginX: "1.5rem" }}>
        <Box sx={styles.signinProjectivateLogo}>
          <Image height="55" width="130" src={projectivate} alt="google-logo" />
        </Box>

        <Typography sx={styles.signinString}>
          Sign into unlock the best of adventure
        </Typography>
      </Box>
      <Box sx={{ marginTop: "0.8rem", marginX: "1.5rem" }}>
        <Typography sx={styles.signinWith}>Sign in with</Typography>
        <Box sx={styles.signinWithButtons}>
          <Box sx={styles.signinButtonConatiner}>
            <Box sx={styles.signinWithButtonIcon}>
              <Button
                sx={styles.signinButton}
                onClick={signInWithGoogle}
                fullWidth
              >
                <Image height="23" width="23" src={google} alt="google-logo" />
              </Button>
            </Box>
          </Box>
          <Box sx={styles.signinButtonConatiner}>
            <Box sx={styles.signinWithButtonIcon}>
              <Button sx={styles.signinButton} fullWidth>
                <Image
                  height="23"
                  width="23"
                  src={facebook}
                  alt="facebook-logo"
                />
              </Button>
            </Box>
          </Box>
        </Box>
      </Box>
      <Divider sx={styles.divider}>Or continue with email</Divider>

      <Box sx={{ marginX: "1.5rem", marginTop: "1.3rem" }}>
        <form onSubmit={handleSubmit(handleFormSubmit)}>
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
              // onChange={handleChange("password")}
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
        <Box sx={styles.forgetPasswordContainer}>
          <FormGroup>
            <FormControlLabel
              control={<Checkbox size="small" color="primary" defaultChecked />}
              label="Remember me"
              sx={{ color: "rgb(89, 89, 89)" }}
            />
          </FormGroup>

          <Typography sx={{ color: "primary.100" }}>
            Forgot your password?
          </Typography>
        </Box>
        <Box sx={{ width: "100%", marginTop: "0.4rem" }}>
          <Button
            fullWidth
            variant="contained"
            size="large"
            color="primary"
            sx={{
              color: "white",
              fontWeight: "bold",
            }}
          >
            sign in
          </Button>
        </Box>
        <Divider sx={styles.dividerNotMember}>Not a Member</Divider>

        <Typography
          fontSize="1.3rem"
          textAlign="center"
          marginTop="1.3rem"
          fontWeight="bold"
          sx={{ color: "		rgb(128, 128, 128)" }}
        >
          <Link
            href="/auth/register"
            sx={{
              color: "primary.main",
              textDecoration: "none",
            }}
          >
            Join
          </Link>{" "}
          to unlock the best of productivity
        </Typography>
        <Typography
          textAlign="center"
          marginTop="1rem"
          fontSize="0.9rem"
          sx={{ color: "	rgb(115, 115, 115)" }}
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
