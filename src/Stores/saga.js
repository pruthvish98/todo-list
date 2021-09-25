import { all } from "redux-saga/effects";
import AuthSagas from "./Auth/saga";
import todoSagas from "./Todo/saga";
export default function* rootSaga() {
  yield all([AuthSagas(), todoSagas()]);
}
