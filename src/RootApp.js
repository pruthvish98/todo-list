import React, { Suspense, useEffect, useState } from "react";
import { connect } from "react-redux";
import { Route, Switch, useHistory } from "react-router-dom";
import actions from "./Stores/Auth/actions";
import Login from "./Containers/Login";
import { Button, Container, Grid, Typography } from "@material-ui/core";
import { Skeleton } from "@mui/material";
import NotFoundPage from "./Containers/NotFound/index";
import Todo from "./Containers/Todo/index";
import TodoList from "./Containers/TodoList/index";

const { check, logout } = actions;

function RootApp({
  isAuthenticated,
  checkAuth,
  isAuthenticating,
  logout,
  user,
}) {
  const history = useHistory();
  const [authFallback, setAuthFallback] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      checkAuth(token, history);
      setAuthFallback(false);
      history.push("/todo/list");
    } else {
      setAuthFallback(false);
      history.push("/");
    }
  }, [checkAuth, history]);

  useEffect(() => {
    if (isAuthenticated) {
      setTimeout(() => {
        setAuthFallback(false);
      }, 1000);
    }
  }, [isAuthenticated, isAuthenticating]);

  return (
    <>
      <Suspense fallback={<Skeleton />}>
        {authFallback || isAuthenticating ? (
          <>
            <Skeleton />
          </>
        ) : (
          <>
            <Grid
              container
              justifyContent="flex-end"
              style={{ marginTop: "10px" }}
            >
              {user?.name && (
                <Typography variant={"h6"}> {user.name} </Typography>
              )}
              {isAuthenticated && (
                <Button
                  type="button"
                  variant="outlined"
                  color="primary"
                  style={{ textTransform: "none" }}
                  onClick={() => logout(history)}
                >
                  Logout
                </Button>
              )}
            </Grid>
            <Container maxWidth="xs" style={{ paddingTop: "2rem" }}>
              <Switch>
                <Route path="/" exact component={Login} />

                <Route path="/login" component={Login} />

                <Route exact path="/to-do/add" component={Todo} />

                <Route exact path="/todo/list" component={TodoList} />

                <Route component={NotFoundPage} />
              </Switch>
            </Container>
          </>
        )}
      </Suspense>
    </>
  );
}

const mapStateToProps = ({ AuthReducer }) => ({
  isAuthenticated: AuthReducer.isAuthenticated,
  isAuthenticating: AuthReducer.isAuthenticating,
  user: AuthReducer.user,
});
const mapDispatchToProps = (dispatch) => ({
  checkAuth: (...params) => dispatch(check(...params)),
  logout: (data) => dispatch(logout(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(RootApp);
