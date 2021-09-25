import { all, put, select, takeLatest } from "redux-saga/effects";
import * as types from "./constants";
import actions from "./actions";

const {
  getAllTodoSuccess,
  getAllTodoFailure,
  addTodoSuccess,
  addTodoFailure,
  removeTodoSuccess,
  removeTodoFailure,
  editTodoSuccess,
  editTodoFailure,
  setCurrentTodoFailure,
  setCurrentTodoSuccess,
} = actions;

export function* getAllTodo({ payload }) {
  const todoList = yield select((state) => state?.TodoReducer?.todoList);

  let data = todoList;

  try {
    yield put(getAllTodoSuccess(data));
  } catch (e) {
    yield put(getAllTodoFailure("Error while getting todo!"));
  }
}

export function* addTODO({ payload, history }) {
  const token = yield select((state) => state?.AuthReducer?.token);
  const data = { ...payload, token: token };
  try {
    yield put(addTodoSuccess(data));
    history.push("/todo/list");
  } catch (e) {
    yield put(addTodoFailure("Error while adding todo!"));
  }
}

export function* removeTODO({ payload, history }) {
  const todoList = yield select((state) => state?.TodoReducer?.todoList);

  let data = todoList.filter((val) => val.id !== payload);

  try {
    yield put(removeTodoSuccess(data));
    // history.push("/todo/list");
  } catch (e) {
    yield put(removeTodoFailure("Error while removing todo!"));
  }
}

export function* editTODO({ payload, history }) {
  const token = yield select((state) => state?.AuthReducer?.token);
  const todoList = yield select((state) => state?.TodoReducer?.todoList);
  const payloadData = { ...payload, token: token };

  let data = todoList.filter((val) => val.id !== payload.id);

  data = data.concat(payloadData);

  try {
    yield put(editTodoSuccess(data));
    history.push("/todo/list");
  } catch (e) {
    yield put(editTodoFailure("Error while editing todo!"));
  }
}

export function* setCurrentTodo({ payload, history }) {
  const todoList = yield select((state) => state?.TodoReducer?.todoList);
  let data = todoList.filter((val) => val.id === payload);

  try {
    if (data.length > 0) {
      yield put(setCurrentTodoSuccess(data[0]));
      history.push("/to-do/add");
    } else {
      yield put(setCurrentTodoFailure("Error while editing todo!"));
    }
  } catch (e) {
    yield put(setCurrentTodoFailure("Error while editing todo!"));
  }
}

export function* getTodoFlow() {
  yield takeLatest(types.GET_ALL_TODO, getAllTodo);
}

export function* addTodoFlow() {
  yield takeLatest(types.ADD_TO_DO, addTODO);
}

export function* removeTodoFlow() {
  yield takeLatest(types.REMOVE_TODO, removeTODO);
}

export function* editTodoFlow() {
  yield takeLatest(types.EDIT_TODO, editTODO);
}

export function* setCurrentTodoFlow() {
  yield takeLatest(types.SET_CURRENT_TODO, setCurrentTodo);
}

export default function* todoSaga() {
  yield all([
    getTodoFlow(),
    addTodoFlow(),
    removeTodoFlow(),
    editTodoFlow(),
    setCurrentTodoFlow(),
  ]);
}
