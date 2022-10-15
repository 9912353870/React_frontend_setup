import React, { useState, useEffect } from "react";
import env from "react-dotenv";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import {
  CustomImage,
  CustomTextField,
  CustomSnackbar,
} from "../common/components/ui";
import logo from "../assets/logo.svg";
import { isValidEmail, redirectToPage } from "../Utils/utils";
import EYLeftBanner from "../assets/EYLeftBanner.PNG";
import { Alert } from "@mui/material";
import { postRequest } from "../common/apirequests/baseapirequests";

const theme = createTheme();

export default function SignInSide() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [otp, setOTP] = useState("");
  const [isOtpSent, setOtpSent] = useState(false);
  const [enableFP, setEnableFP] = useState(false);
  const [fpemail, setFpEmail] = useState("");
  const [snackData, setSnackData] = useState({ isOpen: false, msg: "" });
  const intialErrorState = {
    name: {
      field: "name",
      error: false,
    },
    email: {
      field: "email",
      error: false,
    },
    password: {
      field: "password",
      error: false,
    },
    otp: {
      field: "otp",
      error: false,
    },
    fpemail: {
      field: "fpemail",
      error: false,
    },
  };
  const [errorStatus, setErrorStatus] = useState(intialErrorState);

  const loginUser = async () => {
    setErrorStatus({
      ...errorStatus,
      name: { error: !name },
      email: { error: !isValidEmail(email) },
      password: { error: !password },
    });
    if (!name) {
      setSnackData({ isOpen: true, msg: "Please enter a valid User name!" });
      return;
    }
    if (!isValidEmail(email)) {
      setSnackData({ isOpen: true, msg: "Please enter a valid email id!" });
      return;
    }
    if (!password) {
      setSnackData({ isOpen: true, msg: "Please enter a valid password!" });
      return;
    }
    let loginrequest = await postRequest("v1/user/login", {
      email,
      password,
    });

    // loginrequest = {
    //   uid: 1,
    //   first_name: "test",
    //   last_name: "user",
    //   email: "test@user.com",
    //   refresh:
    //     "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTY2NTkyMjc0NSwiaWF0IjoxNjY1ODM2MzQ1LCJqdGkiOiJlM2E3OTE4ZWI1MTI0MjMzYWQzMjQ4MmIxMGEwZTQ3NiIsInVzZXJfaWQiOjF9.g3GwOewt-7uQoay2olKiyTNOkmeVuftZNZwQeveysFY",
    //   access:
    //     "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjY1ODM5OTQ1LCJpYXQiOjE2NjU4MzYzNDUsImp0aSI6IjE3MjQ4YjYyNDg3MTRmOTA4ZmE1ZTY1ODU3ZjQ1ZTlhIiwidXNlcl9pZCI6MX0.pAm848wEqNMTW4JdwAyHiwmF5Vi5m4nkUwcUTT6uVkA",
    //   user_type: [],
    //   send: "verification otp sent successfully",
    // };

    if (loginrequest.send) {
      // setSnackData({isOpen: true, msg: 'OTP sent successfully!'});
      localStorage.setItem("uid", loginrequest.uid);

      localStorage.setItem("refresh", loginrequest.refresh);
      localStorage.setItem("access", loginrequest.access);
      localStorage.setItem("currentTab", "one");

      localStorage.setItem(
        "fullname",
        loginrequest.first_name + " " + loginrequest.last_name
      );
      localStorage.setItem("user_type", loginrequest.user_type);

      setSnackData({
        isOpen: true,
        msg: "Logged in successfully!",
        type: "success",
      });
      //setOtpSent(true);
    } else {
      setSnackData({ isOpen: true, msg: "Something went wrong!" });
    }

    setOtpSent(true);
  };

  const verifyOTP = () => {
    if (!/^\d{4}$/gm.test(otp)) {
      setSnackData({ isOpen: true, msg: "Please enter a valid otp!" });
      setErrorStatus({ ...errorStatus, otp: { error: true } });
      return;
    }

    redirectToPage("/dashboard");
  };

  const submitFpEmail = () => {
    setErrorStatus({
      ...errorStatus,
      fpemail: { error: !isValidEmail(fpemail) },
    });
    if (!isValidEmail(fpemail)) {
      setSnackData({ isOpen: true, msg: "Please enter a valid email id!" });
      return;
    } else {
      let resetPassword = postRequest("v1/user/send-password-link/", {
        email: fpemail,
      });
      // resetPassword = {
      //   success: "an email hase bin sent to reset password",
      // };

      if (resetPassword?.success) {
        setSnackData({
          isOpen: true,
          msg: resetPassword?.success,
          type: "success",
        });
        setFpEmail("");
        setEnableFP(false);
      } else {
        setSnackData({ isOpen: true, msg: "Something went wrong!" });
      }
      return;
    }
  };

  useEffect(() => {}, []);

  return (
    <ThemeProvider theme={theme}>
      <Grid container component="main" sx={{ height: "100vh" }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={6}
          sx={{
            backgroundImage: `url(${EYLeftBanner})`,
            backgroundRepeat: "no-repeat",
            backgroundColor: "white",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <Grid
          item
          xs={12}
          sm={8}
          md={6}
          component={Paper}
          elevation={6}
          square
          sx={{ background: "#2e2e38" }}
        >
          <Box
            sx={{
              my: 8,
              mx: 12,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <img
              src={logo}
              alt="EY Logo"
              class="responsive"
              style={{ maxWidth: "100px", maxHeight: "150px" }}
            />
            <Box component="form" noValidate sx={{ mt: 1, pt: 1 }}>
              {!enableFP && !isOtpSent && (
                <>
                  <CustomTextField
                    id="name"
                    placeholder="Name"
                    action={(e) => {
                      setName(e.target.value);
                    }}
                    variant="outlined"
                    value={name}
                    errorStatus={errorStatus?.name?.error}
                  />
                  <CustomTextField
                    id="email"
                    placeholder="Email"
                    action={(e) => {
                      setEmail(e.target.value);
                    }}
                    variant="outlined"
                    value={email}
                    errorStatus={errorStatus?.email?.error}
                  />
                  <CustomTextField
                    id="password"
                    placeholder="Password"
                    action={(e) => {
                      setPassword(e.target.value);
                    }}
                    variant="outlined"
                    type="password"
                    value={password}
                    errorStatus={errorStatus?.password?.error}
                  />
                  <FormControlLabel
                    control={<Checkbox value="remember" color="primary" />}
                    label="Remember me"
                  />
                  <Button
                    type="button"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2, color: "black", background: "yellow" }}
                    onClick={() => {
                      loginUser();
                    }}
                  >
                    Sign In
                  </Button>

                  <Grid container>
                    <Grid item xs>
                      <Link
                        href="#"
                        variant="body2"
                        onClick={() => setEnableFP(true)}
                      >
                        Forgot password?
                      </Link>
                    </Grid>
                    <Grid item>
                      <Link href="#" variant="body2">
                        {"Don't have an account? Sign Up"}
                      </Link>
                    </Grid>
                  </Grid>
                </>
              )}
              {enableFP && !isOtpSent && (
                <>
                  <CustomTextField
                    id="fpUserEmail"
                    placeholder="Enter Mail Id"
                    action={(e) => {
                      setFpEmail(e.target.value);
                    }}
                    variant="outlined"
                    value={fpemail}
                    errorStatus={errorStatus?.fpemail?.error}
                  />
                  <Button
                    type="button"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2, color: "black", background: "yellow" }}
                    onClick={() => {
                      submitFpEmail();
                    }}
                  >
                    Submit
                  </Button>
                </>
              )}
              {isOtpSent && !enableFP && (
                <>
                  <CustomTextField
                    id="otp"
                    placeholder="OTP"
                    action={(e) => {
                      setOTP(e.target.value);
                    }}
                    variant="outlined"
                    value={otp}
                    errorStatus={errorStatus?.otp?.error}
                  />
                  <Button
                    type="button"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2, color: "black", background: "yellow" }}
                    onClick={() => {
                      verifyOTP();
                    }}
                  >
                    Verify OTP
                  </Button>
                </>
              )}
            </Box>
          </Box>
        </Grid>
        <CustomSnackbar
          isOpen={snackData?.isOpen}
          msg={snackData?.msg}
          onClose={() => {
            setSnackData({ isOpen: false, msg: "" });
          }}
          type={snackData.type || "error"}
        />
      </Grid>
    </ThemeProvider>
  );
}
