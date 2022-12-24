import { createAsyncThunk } from "@reduxjs/toolkit";

import { firestore, storage } from "../../firebase/config";
import {
  collection,
  getDocs,
  where,
  query,
  getDoc,
  addDoc,
  doc,
} from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

export const createPost = createAsyncThunk(
  "posts/createPost",
  async (
    { photo, nickname, email, userId, name, coords },
    { rejectWithValue, dispatch }
  ) => {
    try {
      const { payload: photoLink } = await dispatch(uploadPhoto(photo));

      const coordinations = await coords;

      const docRef = await addDoc(collection(firestore, "posts"), {
        photoLink,
        name,
        coordinations,
        userId,
        nickname,
        email,
      });

      await dispatch(getAllPosts());
      console.log("Document written with ID: ", docRef.id);
    } catch (error) {
      alert(error.message);
      return rejectWithValue(error.message);
    }
  }
);

export const getAllPosts = createAsyncThunk(
  "posts/allPosts",
  async (_, { rejectWithValue }) => {
    try {
      const docRef = collection(firestore, "posts");

      const querySnapshot = await getDocs(docRef);

      const postsFromServer = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        docID: doc.id,
      }));

      return postsFromServer;
    } catch (error) {
      alert(error.message);
      return rejectWithValue(error.message);
    }
  }
);

export const getUserPosts = createAsyncThunk(
  "posts/userPosts",
  async (userId, { rejectWithValue }) => {
    try {
      const docRef = query(
        collection(firestore, "posts"),
        where("userId", "==", userId)
      );

      const querySnapshot = await getDocs(docRef);

      const userPostsFromServer = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        docId: doc.id,
      }));

      return userPostsFromServer;
    } catch (error) {
      alert(error.message);
      return rejectWithValue(error.message);
    }
  }
);

export const uploadPhoto = createAsyncThunk(
  "posts/uploadPhoto",
  async (photo, { rejectWithValue }) => {
    try {
      const response = await fetch(photo);

      const file = await response.blob();

      const uniquePostId = Date.now().toString();

      const storageRef = ref(storage, `postImage/${uniquePostId}`);

      await uploadBytes(storageRef, file);

      const processedPhoto = await getDownloadURL(
        ref(storage, `postImage/${uniquePostId}`)
      );
      return processedPhoto;
    } catch (error) {
      alert(error.message);
      return rejectWithValue(error.message);
    }
  }
);

export const createComment = createAsyncThunk(
  "posts/createComment",
  async ({ postId, comment, nickname }, { rejectWithValue, dispatch }) => {
    try {
      const docRef = doc(firestore, "posts", postId);

      const today = new Date();

      const dateCreate = today.toLocaleString().slice(0, -3);
      console.log("dateCreate", dateCreate);

      await addDoc(collection(docRef, "comments"), {
        comment,
        nickname,
        dateCreate,
      });

      await dispatch(getPostComments({ postId }));
    } catch (error) {
      alert(error.message);
      return rejectWithValue(error.message);
    }
  }
);

export const getPostComments = createAsyncThunk(
  "posts/getPostComments",
  async ({ postId }, { rejectWithValue }) => {
    try {
      const docRef = doc(firestore, "posts", postId);

      const commentsRef = await collection(docRef, "comments");

      const querySnapshot = await getDocs(commentsRef);

      const postsFromServer = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
      }));

      return postsFromServer;
    } catch (error) {
      alert(error.message);
      return rejectWithValue(error.message);
    }
  }
);
