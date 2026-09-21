import { combineReducers } from "redux";
import certificate from "./certificate";
import { sample } from "./sample";

export const createRootReducer = combineReducers({
  certificate,
  sample,
});

export type RootState = ReturnType<typeof createRootReducer>;
