import React, { useEffect } from "react";
import {
  Box,
  Button,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@material-ui/core";
import { connect, useSelector } from "react-redux";

import actions from "../../Stores/Todo/actions";
import { useHistory } from "react-router";
import { Skeleton } from "@mui/material";

const { getAllTodo, removeTodo, editTodo, setCurrentTodo } = actions;

const TodoList = ({
  getTodoList,
  isFethingTodo,
  todoList,
  removeTodo,
  isEditingTodo,
  isDeletingTodo,
  isAddingTodo,
  setCurrentTodo,
}) => {
  const history = useHistory();
  const token = useSelector((state) => state.AuthReducer.token);

  useEffect(() => {
    getTodoList(token);
  }, [token, getTodoList]);

  useEffect(() => {
    getTodoList(token);
  }, [isEditingTodo, isDeletingTodo, isAddingTodo, getTodoList, token]);

  return (
    <>
      <h1>Todo List</h1>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={12}>
          <Button
            type="button"
            variant="outlined"
            color="primary"
            style={{ textTransform: "none" }}
            onClick={() => history.push("/to-do/add")}
          >
            Todo Add
          </Button>
        </Grid>
        <Grid item xs={12} sm={12}>
          <Box
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell> Title </TableCell>
                  <TableCell> Description </TableCell>
                  <TableCell> Time </TableCell>
                  <TableCell> Actions </TableCell>
                </TableRow>
              </TableHead>

              {isFethingTodo || isDeletingTodo || isAddingTodo ? (
                <Skeleton />
              ) : todoList && todoList.length > 0 ? (
                todoList &&
                todoList.map((todo) => {
                  if (todo.token === token) {
                    return (
                      <TableBody key={todo.id}>
                        <TableRow>
                          <TableCell> {todo.title}</TableCell>
                          <TableCell> {todo.desc}</TableCell>
                          <TableCell> {todo.time}</TableCell>
                          <TableCell>
                            <Button
                              type="button"
                              variant="outlined"
                              color="primary"
                              style={{ textTransform: "none" }}
                              onClick={() => setCurrentTodo(todo.id, history)}
                            >
                              Edit
                            </Button>
                            <Button
                              type="button"
                              variant="outlined"
                              color="secondary"
                              style={{ textTransform: "none" }}
                              onClick={() => removeTodo(todo.id)}
                            >
                              Delete
                            </Button>
                          </TableCell>
                        </TableRow>
                      </TableBody>
                    );
                  } else {
                    return "";
                  }
                })
              ) : (
                <TableBody>
                  <TableRow>
                    <TableCell>No Todo found</TableCell>
                  </TableRow>
                </TableBody>
              )}
            </Table>
          </Box>
        </Grid>
      </Grid>
    </>
  );
};

const mapStateToProps = ({ TodoReducer, AuthReducer }) => ({
  isFethingTodo: TodoReducer?.isFethingTodo,
  isDeletingTodo: TodoReducer?.isDeletingTodo,
  isAddingTodo: TodoReducer?.isAddingTodo,
  isEditingTodo: TodoReducer?.isEditingTodo,
  todoList: TodoReducer?.todoList,
});
const mapDispatchToProps = (dispatch) => ({
  getTodoList: (...data) => dispatch(getAllTodo(...data)),
  removeTodo: (...data) => dispatch(removeTodo(...data)),
  editTodo: (...data) => dispatch(editTodo(...data)),
  setCurrentTodo: (...data) => dispatch(setCurrentTodo(...data)),
});
export default connect(mapStateToProps, mapDispatchToProps)(TodoList);
