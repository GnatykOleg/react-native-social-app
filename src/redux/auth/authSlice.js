import { createSlice } from "@reduxjs/toolkit";

import {
  handleSignIn,
  handleSignUp,
  authStateChangeUser,
  handleSignOut,
} from "./authOperations";

const initialState = {
  userId: null,
  nickname: null,
  loading: false,
  error: null,
  stateChange: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    // Registration

    builder.addCase(handleSignUp.pending, (store, _) => {
      store.loading = true;
    });
    builder.addCase(
      handleSignUp.fulfilled,
      (store, { payload: { displayName, uid } }) => {
        store.loading = false;
        store.error = null;
        store.nickname = displayName;
        store.userId = uid;
      }
    );
    builder.addCase(handleSignUp.rejected, (store, { payload }) => {
      store.error = payload;
      store.loading = false;
    });

    // Login

    // builder.addCase(handleSignIn.pending, (store, action) => {
    //   store.loading = true;
    // });
    // builder.addCase(handleSignIn.fulfilled, (store, action) => {
    //   store.loading = false;
    //   store.error = null;

    //   store.nickname = action.payload.displayName;
    //   store.userId = action.payload.uid;
    // });
    // builder.addCase(handleSignIn.rejected, (store, action) => {
    //   store.error = action.payload;
    //   store.loading = false;
    // });

    // SignOut

    builder.addCase(handleSignOut.pending, (store, _) => {
      store.loading = true;
    });
    builder.addCase(handleSignOut.fulfilled, (store, _) => {
      store.loading = false;
      store.error = null;
      store.userId = null;
      store.nickname = null;
      store.stateChange = null;
    });
    builder.addCase(handleSignOut.rejected, (store, { payload }) => {
      store.error = payload;
      store.loading = false;
    });

    // ChangeUser

    builder.addCase(authStateChangeUser.pending, (store, _) => {
      store.loading = true;
    });
    builder.addCase(
      authStateChangeUser.fulfilled,
      (
        store,
        action
        // { payload: { displayName, uid, stateChange } }
      ) => {
        console.log("action", action);
        store.loading = false;
        store.error = null;
        store.nickname = action.payload.displayName;
        store.userId = action.payload.uid;
        store.stateChange = action.payload.stateChange;
      }
    );
    builder.addCase(authStateChangeUser.rejected, (store, { payload }) => {
      store.error = payload;
      store.loading = false;
    });

    // Auth State Change
  },
});
