import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateCurrentUser,
  updateProfile,
  onAuthStateChanged,
  getAuth,
  signOut,
} from "firebase/auth";

import { auth } from "../../firebase/config";

export const handleSignUp = createAsyncThunk(
  "users/signup",
  async ({ email, password, login }, { rejectWithValue }) => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);

      const user = await auth.currentUser;

      await updateProfile(user, {
        displayName: login,
      });

      const { uid, displayName } = user;

      return { uid, displayName };
    } catch (error) {
      console.log(error.message);
      return rejectWithValue(error.message);
    }
  }
);

export const handleSignIn = createAsyncThunk(
  "users/signin",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      // const { user } = await signInWithEmailAndPassword(auth, email, password);
      await signInWithEmailAndPassword(auth, email, password);
      // return user;
    } catch (error) {
      console.log(error.message);

      return rejectWithValue(error.message);
    }
  }
);

export const handleSignOut = createAsyncThunk(
  "users/signout",
  async (_, { rejectWithValue }) => {
    try {
      await signOut(auth);
    } catch (error) {
      console.log(error.message);
      return rejectWithValue(error.message);
    }
  }
);

export const authStateChangeUser = createAsyncThunk(
  "users/changeUser",
  async (data, { rejectWithValue }) => {
    try {
      return data;
    } catch (error) {
      console.log("error.message", error.message);
      return rejectWithValue(error.message);
    }
  }
);
