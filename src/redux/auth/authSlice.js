import { createSlice } from "@reduxjs/toolkit";

import {
  handleSignUp,
  authStateChangeUser,
  handleSignOut,
  handleSignIn,
  uploadAvatar,
} from "./authOperations";

const initialState = {
  userId: null,
  nickname: null,
  email: null,
  loading: false,
  error: null,
  stateChange: null,
  avatar: null,
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
      (store, { payload: { displayName, uid, photoURL } }) => {
        store.loading = false;
        store.error = null;
        store.nickname = displayName;
        store.avatar = photoURL;
        store.userId = uid;
      }
    );
    builder.addCase(handleSignUp.rejected, (store, { payload }) => {
      store.error = payload;
      store.loading = false;
    });

    // SignIn

    builder.addCase(handleSignIn.pending, (store, _) => {
      store.loading = true;
    });
    builder.addCase(handleSignIn.fulfilled, (store, { payload }) => {
      store.loading = false;
      store.error = null;
    });
    builder.addCase(handleSignIn.rejected, (store, { payload }) => {
      store.error = payload;
      store.loading = false;
    });

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
      store.email = null;
    });
    builder.addCase(handleSignOut.rejected, (store, { payload }) => {
      store.error = payload;
      store.loading = false;
    });

    // Auth State Change

    builder.addCase(authStateChangeUser.pending, (store, _) => {
      store.loading = true;
    });
    builder.addCase(
      authStateChangeUser.fulfilled,
      (
        store,

        { payload: { displayName, uid, stateChange, email, photoURL } }
      ) => {
        store.loading = false;
        store.error = null;
        store.nickname = displayName;
        store.userId = uid;
        store.stateChange = stateChange;
        store.email = email;
        store.avatar = photoURL;
      }
    );
    builder.addCase(authStateChangeUser.rejected, (store, { payload }) => {
      store.error = payload;
      store.loading = false;
    });

    builder.addCase(uploadAvatar.pending, (store, _) => {
      store.loading = true;
    });
    builder.addCase(uploadAvatar.fulfilled, (store, { payload }) => {
      store.loading = false;
      store.error = null;
      store.avatar = payload;
    });
    builder.addCase(uploadAvatar.rejected, (store, { payload }) => {
      store.error = payload;
      store.loading = false;
    });
  },
});
