import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Grid,
  Paper,
  TextField,
  Typography,
} from "@material-ui/core";
import moment from "moment";
import { connect } from "react-redux";
import { v4 as uuid } from "uuid";
import actions from "../../Stores/Todo/actions";
import { Redirect, useHistory } from "react-router";

const { addTodo, editTodo } = actions;

const TodoAdd = ({
  isAddingTodo,
  error,
  addTodoData,
  editTodoData,
  isEditingTodo,
  currentTodo,
  isAuthenticated,
}) => {
  const history = useHistory();

  const [data, setdata] = useState({
    id: uuid(),
    title: "",
    desc: "",
    time: moment().format("YYYY-MM-DD HH:mm:ss"),
  });
  const onChange = (e) => setdata({ ...data, [e.target.name]: e.target.value });

  useEffect(() => {
    if (isEditingTodo) {
      if (currentTodo != null) {
        setdata({
          ...currentTodo,
          time: moment().format("YYYY-MM-DD HH:mm:ss"),
        });
      }
    }
  }, [isEditingTodo, currentTodo]);

  const onSubmit = (e) => {
    e.preventDefault();
    if (isEditingTodo) {
      editTodoData(data, history);
    } else {
      addTodoData(data, history);
    }
  };

  return (
    <>
      {!isAuthenticated && <Redirect to="/" />}
      <Paper style={{ marginBottom: "20px" }}>
        <Box p="20px">
          <div>
            <h2> {isEditingTodo ? "Edit" : "Add"} Todo</h2>
          </div>

          <div>
            <form onSubmit={onSubmit}>
              <TextField
                name="title"
                label="Title"
                type="text"
                fullWidth
                autoFocus
                required
                value={data.title}
                onChange={onChange}
                style={{ marginBottom: "10px" }}
              />
              <TextField
                name="desc"
                label="Description"
                type="text"
                multiline
                rows={2}
                fullWidth
                required
                value={data.desc}
                onChange={onChange}
                style={{ marginBottom: "10px" }}
              />

              <Grid
                container
                justifyContent="space-between"
                style={{ marginTop: "10px" }}
              >
                <Button
                  type="button"
                  variant="outlined"
                  color="primary"
                  style={{ textTransform: "none" }}
                  onClick={() => history.push("/todo/list")}
                >
                  Go to list
                </Button>
                {!isAddingTodo && (
                  <Button
                    type="submit"
                    variant="outlined"
                    color="primary"
                    style={{ textTransform: "none" }}
                  >
                    {isEditingTodo ? "Update" : "Save"}
                  </Button>
                )}
              </Grid>

              {error?.error && (
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
};

const mapStateToProps = ({ TodoReducer, AuthReducer }) => ({
  isAddingTodo: TodoReducer?.isAddingTodo,
  isEditingTodo: TodoReducer?.isEditingTodo,
  currentTodo: TodoReducer?.currentTodo,
  isAuthenticated: AuthReducer?.isAuthenticated,
  error: TodoReducer?.error,
});
const mapDispatchToProps = (dispatch) => ({
  addTodoData: (...data) => dispatch(addTodo(...data)),
  editTodoData: (...data) => dispatch(editTodo(...data)),
});
export default connect(mapStateToProps, mapDispatchToProps)(TodoAdd);
