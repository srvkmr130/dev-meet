import {
  combineReducers,
  configureStore,
  getDefaultMiddleware,
} from "@reduxjs/toolkit";
import authReducer from "../features/auth";

const reducer = combineReducers({
  auth: authReducer,
});

const middleware = [
  ...getDefaultMiddleware({
    serializableCheck: false,
  }),
];

export default configureStore({
  reducer,
  middleware,
});
