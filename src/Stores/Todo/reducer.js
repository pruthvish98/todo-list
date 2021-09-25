import * as types from "./constants";

const initialState = {
  isFethingTodo: false,
  isAddingTodo: false,
  isEditingTodo: false,
  isDeletingTodo: false,
  currentTodo: null,
  allTodo: [],
  todoList: [],
  error: null,
};
const TodoReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.GET_ALL_TODO:
      return {
        ...state,
        isFethingTodo: true,
        error: null,
      };

    case types.GET_ALL_TODO_SUCCESS:
      return {
        ...state,
        isFethingTodo: false,
        todoList: action.payload,
        error: null,
      };

    case types.GET_ALL_TODO_FAILURE:
      return {
        ...state,
        isFethingTodo: false,
        todoList: [],
        error: action.payload,
      };

    case types.ADD_TO_DO:
      return {
        ...state,
        isAddingTodo: true,
        error: null,
      };

    case types.ADD_TODO_SUCCESS:
      return {
        ...state,
        isAddingTodo: false,
        todoList: [...state.todoList, action.payload],
        error: null,
      };

    case types.ADD_TODO_FAILURE:
      return {
        ...state,
        isAddingTodo: false,
        todoList: [],
        error: action.payload,
      };

    case types.REMOVE_TODO:
      return {
        ...state,
        isDeletingTodo: true,
        error: null,
      };
    case types.REMOVE_TODO_SUCCESS:
      return {
        ...state,
        isDeletingTodo: false,
        todoList: action.payload,
        error: null,
      };
    case types.REMOVE_TODO_FAILURE:
      return {
        ...state,
        isDeletingTodo: false,
        error: action.payload,
      };

    case types.SET_CURRENT_TODO:
      return {
        ...state,
        isEditingTodo: true,
        error: null,
      };
    case types.SET_CURRENT_TODO_SUCCESS:
      return {
        ...state,
        isEditingTodo: true,
        currentTodo: action.payload,
        error: null,
      };
    case types.SET_CURRENT_TODO_FAILURE:
      return {
        ...state,
        isEditingTodo: false,
        currentTodo: null,
        error: action.payload,
      };

    case types.EDIT_TODO:
      return {
        ...state,
        isEditingTodo: true,
        error: null,
      };
    case types.EDIT_TODO_SUCCESS:
      return {
        ...state,
        isFethingTodo: false,
        isAddingTodo: false,
        isEditingTodo: false,
        isDeletingTodo: false,
        todoList: action.payload,
        error: null,
      };
    case types.EDIT_TODO_FAILURE:
      return {
        ...state,
        isEditingTodo: false,
        error: action.payload,
      };

    default:
      return state;
  }
};
export default TodoReducer;
