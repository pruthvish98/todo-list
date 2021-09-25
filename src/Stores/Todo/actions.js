import * as types from "./constants";
const actions = {
  getAllTodo: (payload) => {
    return {
      type: types.GET_ALL_TODO,
      payload,
    };
  },
  getAllTodoSuccess: (payload) => {
    return {
      type: types.GET_ALL_TODO_SUCCESS,
      payload,
    };
  },
  getAllTodoFailure: (payload) => {
    return {
      type: types.GET_ALL_TODO_FAILURE,
      payload,
    };
  },
  addTodo: (payload, history) => {
    return {
      type: types.ADD_TO_DO,
      payload: payload,
      history: history,
    };
  },
  addTodoSuccess: (payload) => {
    return {
      type: types.ADD_TODO_SUCCESS,
      payload,
    };
  },
  addTodoFailure: (payload) => {
    return {
      type: types.ADD_TODO_FAILURE,
      payload,
    };
  },
  removeTodo: (payload) => {
    return {
      type: types.REMOVE_TODO,
      payload,
    };
  },
  removeTodoSuccess: (payload) => {
    return {
      type: types.REMOVE_TODO_SUCCESS,
      payload,
    };
  },
  removeTodoFailure: (payload) => {
    return {
      type: types.REMOVE_TODO_FAILURE,
      payload,
    };
  },
  editTodo: (payload, history) => {
    return {
      type: types.EDIT_TODO,
      payload,
      history,
    };
  },
  editTodoSuccess: (payload, history) => {
    return {
      type: types.EDIT_TODO_SUCCESS,
      payload,
      history,
    };
  },
  editTodoFailure: (payload) => {
    return {
      type: types.EDIT_TODO_FAILURE,
      payload,
    };
  },
  setCurrentTodo: (payload, history) => {
    return {
      type: types.SET_CURRENT_TODO,
      payload,
      history,
    };
  },
  setCurrentTodoSuccess: (payload) => {
    return {
      type: types.SET_CURRENT_TODO_SUCCESS,
      payload,
    };
  },
  setCurrentTodoFailure: (payload) => {
    return {
      type: types.SET_CURRENT_TODO_FAILURE,
      payload,
    };
  },
};
export default actions;
