// package imports
import { useState } from "react";
import {
  Box,
  Button,
  TextField,
  useMediaQuery,
  Typography,
  useTheme,
  InputAdornment,
  IconButton,
} from "@mui/material";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { Visibility } from "@mui/icons-material";
import { VisibilityOff } from "@mui/icons-material";
import { Formik } from "formik";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setlogin } from "state";
import Dropzone from "react-dropzone";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// components imports
import FlexBetween from "components/FlexBetween";

// function and validator imports
import validateRegister from "validators/registerValidator";
import validateLogin from "validators/loginValidator";
import { loginApi, registerApi } from "apis/authAPIs";

const initiativeRegister = {
  name: "",
  email: "",
  contact: "",
  password: "",
  location: "",
  occupation: "",
  profilePic: "",
};

const initiativeLogin = {
  email: "",
  password: "",
};

const Form = () => {
  const [pageType, setPageType] = useState("login");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { palette } = useTheme();

  const isNonMobile = useMediaQuery("(min-width: 600px)");
  const isLogin = pageType === "login";
  const isRegister = pageType === "register";

  const saveLogin = async (values, onSubmitProps) => {
    const logggedIN = await loginApi(values);
    console.log(logggedIN, "res");

    if (logggedIN.status === 200) {
      toast.success(logggedIN.data.msg, {
        position: "top-right",
        autoClose: 5000,
      });
    } else {
      toast.error(logggedIN.data.msg, {
        position: "top-right",
        autoClose: 5000,
      });
    }
    onSubmitProps.resetForm();

    if (logggedIN.status === 200) {
      dispatch(
        setlogin({
          token: logggedIN.data.token,
          user: logggedIN.data.data,
        })
      );
      navigate("/home");
    }
  };

  const saveRegister = async (values, onSubmitProps) => {
    const formData = new FormData();

    for (let value in values) {
      formData.append(value, values[value]);
    }

    const registeredUser = await registerApi(values);
    if (registeredUser.status === 200) {
      toast.success(registeredUser.data.msg, {
        position: "top-right",
        autoClose: 5000,
      });
    } else {
      toast.error(registeredUser.data.msg, {
        position: "top-right",
        autoClose: 5000,
      });
    }

    onSubmitProps.resetForm();

    if (registeredUser) {
      dispatch(
        setlogin({
          token: registeredUser.data.token,
          user: registeredUser.data.data,
        })
      );
    }
    navigate("/home");
  };

  const handleFormSubmit = async (values, onSubmitProps) => {
    if (isLogin) {
      await saveLogin(values, onSubmitProps);
    } else {
      await saveRegister(values, onSubmitProps);
    }
  };

  return (
    <Formik
      onSubmit={handleFormSubmit}
      initialValues={isLogin ? initiativeLogin : initiativeRegister}
      validationSchema={isLogin ? validateLogin : validateRegister}
    >
      {({
        values,
        errors,
        touched,
        handleChange,
        handleBlur,
        handleSubmit,
        setFieldValue,
        resetForm,
      }) => (
        <form onSubmit={handleSubmit}>
          <ToastContainer />
          <Box
            display="grid"
            gap="30px"
            gridTemplateColumns="repeat(4, minmax(0, 1fr))"
            sx={{
              "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
            }}
          >
            {isRegister && (
              <>
                <TextField
                  label="Full Name"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.name}
                  name="name"
                  error={Boolean(touched.name && errors.name)}
                  helperText={touched.name && errors.name}
                  sx={{ gridColumn: "span 2" }}
                />
                <TextField
                  label="Contact"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.contact}
                  name="contact"
                  error={Boolean(touched.contact && errors.contact)}
                  helperText={touched.contact && errors.contact}
                  sx={{ gridColumn: "span 2" }}
                />
                <TextField
                  label="Location"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.location}
                  name="location"
                  error={Boolean(touched.location && errors.location)}
                  helperText={touched.location && errors.location}
                  sx={{ gridColumn: "span 4" }}
                />
                <TextField
                  label="Your Occupation"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.occupation}
                  name="occupation"
                  error={Boolean(touched.occupation && errors.occupation)}
                  helperText={touched.occupation && errors.occupation}
                  sx={{ gridColumn: "span 4" }}
                />
                <Box
                  gridColumn="span 4"
                  border={`1px solid ${palette.neutral.medium}`}
                  borderRadius="5px"
                  p="1rem"
                >
                  <Dropzone
                    acceptedFiles=".jpg,.jpeg,.png"
                    multiple={false}
                    onDrop={(acceptedFiles) =>
                      setFieldValue("profilePic", acceptedFiles[0])
                    }
                  >
                    {({ getRootProps, getInputProps }) => (
                      <Box
                        {...getRootProps()}
                        border={`1px solid ${palette.primary.main}`}
                        p="1rem"
                        sx={{ "& :hover": { cursor: "pointer" } }}
                      >
                        <input {...getInputProps()} />
                        {!values.profilePic ? (
                          <p>
                            Drag 'n' drop some files here, or click to select
                            files
                          </p>
                        ) : (
                          <FlexBetween>
                            <Typography>{values.profilePic.name}</Typography>
                            <EditOutlinedIcon />
                          </FlexBetween>
                        )}
                      </Box>
                    )}
                  </Dropzone>
                </Box>
              </>
            )}
            <TextField
              label="Email"
              type="email"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.email}
              name="email"
              error={Boolean(touched.email && errors.email)}
              helperText={touched.email && errors.email}
              sx={{ gridColumn: "span 4" }}
            />
            <TextField
              label="Your Password"
              type={showPassword ? "text" : "password"}
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.password}
              name="password"
              error={Boolean(touched.password && errors.password)}
              helperText={touched.password && errors.password}
              sx={{ gridColumn: "span 4" }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={() =>
                        setShowPassword(showPassword ? false : true)
                      }
                    >
                      {showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </Box>
          {/* Buttons */}
          <Box>
            <Button
              fullWidth
              type="submit"
              sx={{
                m: "2rem 0",
                p: "1rem",
                backgroundColor: palette.primary.main,
                color: palette.background.alt,
                "&:hover": { color: palette.primary.main },
              }}
            >
              {isLogin ? "Login" : "Register"}
            </Button>
            <Typography
              onClick={() => {
                setPageType(isLogin ? "register" : "login");
                resetForm();
              }}
              sx={{
                textDecoration: "underline",
                color: palette.primary.main,
                "&:hover": {
                  cursor: "pointer",
                  color: palette.primary.light,
                },
              }}
            >
              {isLogin
                ? "Don't have an account? Sign up here"
                : "Already have an account? Login here"}
            </Typography>
          </Box>
        </form>
      )}
    </Formik>
  );
};

export default Form;
