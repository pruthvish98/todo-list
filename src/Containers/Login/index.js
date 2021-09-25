import React, { useState } from "react";
import {
  Box,
  Button,
  Grid,
  InputAdornment,
  Paper,
  TextField,
  Backdrop,
  CircularProgress,
  Typography,
} from "@material-ui/core";
import PersonOutlineOutlinedIcon from "@material-ui/icons/PersonOutlineOutlined";
import VisibilityOffIcon from "@material-ui/icons/VisibilityOff";
import VisibilityIcon from "@material-ui/icons/Visibility";
import actions from "../../Stores/Auth/actions";
import { connect } from "react-redux";
import { Redirect, useHistory } from "react-router-dom";
import { compose } from "redux";
import { Skeleton } from "@mui/material";

const loginAction = actions.login;

function Login({ login, isLoggingIn, error, isAuthenticated }) {
  const [show, setShow] = useState(0);
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });
  const history = useHistory();
  const onChange = (e) =>
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  const onSubmit = (e) => {
    e.preventDefault();
    login(credentials, history);
  };
  return (
    <>
      {isAuthenticated && <Redirect to="/todo/list" />}
      {isLoggingIn && (
        <Backdrop open>
          <CircularProgress color="inherit" />
        </Backdrop>
      )}
      <Paper style={{ marginBottom: "20px" }}>
        <Box p="20px">
          <div>
            <h1>Todo App</h1>
          </div>
          <div>
            <form onSubmit={onSubmit}>
              <TextField
                name="email"
                label="Email"
                type="email"
                fullWidth
                autoFocus
                required
                value={credentials.email}
                onChange={onChange}
                style={{ marginBottom: "10px" }}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="start">
                      <PersonOutlineOutlinedIcon />
                    </InputAdornment>
                  ),
                }}
              />
              <TextField
                name="password"
                label="Password"
                type={show ? "text" : "password"}
                fullWidth
                required
                value={credentials.password}
                onChange={onChange}
                style={{ marginBottom: "10px" }}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="start">
                      {show ? (
                        <VisibilityIcon onClick={() => setShow(false)} />
                      ) : (
                        <VisibilityOffIcon onClick={() => setShow(true)} />
                      )}
                    </InputAdornment>
                  ),
                }}
              />

              <Grid
                container
                justifyContent="flex-end"
                style={{ marginTop: "10px" }}
              >
                <Button
                  type="submit"
                  variant="outlined"
                  color="primary"
                  style={{ textTransform: "none" }}
                >
                  Login
                </Button>
              </Grid>

              {isLoggingIn ? (
                <Skeleton />
              ) : (
                <Typography varient="subtitle2" style={{ color: "red" }}>
                  {error?.error !== undefined ? error.error : ""}
                </Typography>
              )}
            </form>
          </div>
        </Box>
      </Paper>
    </>
  );
}

const mapStateToProps = ({ AuthReducer }) => ({
  isAuthenticated: AuthReducer.isAuthenticated,
  isLoggingIn: AuthReducer.isLoggingIn,
  error: AuthReducer.error,
});
function mapDispatchToProps(dispatch) {
  return {
    login: (...args) => dispatch(loginAction(...args)),
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect)(Login);
