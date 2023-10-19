import { legacy_createStore as createStore } from "redux";
import { rootReducer } from "./reducers";

export const store = createStore(rootReducer);

// ==> typescript

//cấu hình type cho các state mà mình sẽ lấy ở component
export type RootState = ReturnType<typeof store.getState>;

//cấu hình dispatch
export type AppDispatch = typeof store.dispatch;
