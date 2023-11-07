import { combineReducers } from "redux";
import { reducerCounter } from "./countReducer";
import { productReducer } from "./productReducer";
import { updateReducer } from "./updateReducer";

export const rootReducer = combineReducers({
  count: reducerCounter,
  products: productReducer,
  updateReducer: updateReducer,
});
