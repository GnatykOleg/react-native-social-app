import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  signOut,
} from "firebase/auth";

import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

import { auth, storage } from "../../firebase/config";

export const handleSignUp = createAsyncThunk(
  "users/signup",
  async ({ email, password, login, photo }, { rejectWithValue, dispatch }) => {
    try {
      const { payload: photoLink } = await dispatch(uploadAvatar(photo));

      await createUserWithEmailAndPassword(auth, email, password);

      const user = await auth.currentUser;

      await updateProfile(user, {
        displayName: login,
        photoURL: photoLink,
      });

      const { uid, displayName, photoURL } = user;

      return { uid, displayName, photoURL };
    } catch (error) {
      alert(error.message);
      return rejectWithValue(error.message);
    }
  }
);

export const uploadAvatar = createAsyncThunk(
  "users/uploadAvatar",
  async (photo, { rejectWithValue }) => {
    try {
      const defaultAvatar =
        "https://as1.ftcdn.net/v2/jpg/03/53/11/00/1000_F_353110097_nbpmfn9iHlxef4EDIhXB1tdTD0lcWhG9.jpg";

      const avatar = photo ? photo : defaultAvatar;

      const response = await fetch(avatar);
      const file = await response.blob();

      const uniqueAvatarId = Date.now().toString();

      const storageRef = ref(storage, `avatar/${uniqueAvatarId}`);

      console.log("storageRef", storageRef);

      await uploadBytes(storageRef, file);

      const processedAvatar = await getDownloadURL(
        ref(storage, `avatar/${uniqueAvatarId}`)
      );

      const user = await auth.currentUser;

      if (user) {
        await updateProfile(user, {
          photoURL: processedAvatar,
        });
        return processedAvatar;
      }

      return processedAvatar;
    } catch (error) {
      alert(error.message);
      return rejectWithValue(error.message);
    }
  }
);

export const handleSignIn = createAsyncThunk(
  "users/signin",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      alert(error.message);
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
      alert(error.message);
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
      alert(error.message);
      return rejectWithValue(error.message);
    }
  }
);
