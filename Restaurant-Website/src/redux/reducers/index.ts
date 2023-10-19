import { combineReducers } from "redux";
import { reducerCounter } from "./countReducer";
import { productReducer } from "./productReducer";

export const rootReducer = combineReducers({
  count: reducerCounter,
  products: productReducer,
});
