import { configureStore, combineReducers } from "@reduxjs/toolkit";

import {
  authSlice,
  // dashboardSlice
} from "./auth/authSlice";

const rootReducer = combineReducers({
  [authSlice.name]: authSlice.reducer,
  //   [dashboard.name]: dashboard.reducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});
