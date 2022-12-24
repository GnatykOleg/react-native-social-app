import { createSlice } from "@reduxjs/toolkit";

import {
  getUserPosts,
  getAllPosts,
  uploadPhoto,
  createPost,
  createComment,
  getPostComments,
} from "./postsOperations";

const initialState = {
  loading: false,
  error: null,
  userPosts: null,
  allPosts: null,
  photoLink: null,
  postComments: null,
};

export const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    // Create post

    builder.addCase(createPost.pending, (store, _) => {
      store.loading = true;
    });
    builder.addCase(createPost.fulfilled, (store, _) => {
      store.loading = false;
      store.error = null;
    });
    builder.addCase(createPost.rejected, (store, { payload }) => {
      store.error = payload;
      store.loading = false;
    });
    // Get all posts

    builder.addCase(getAllPosts.pending, (store, _) => {
      store.loading = true;
    });
    builder.addCase(getAllPosts.fulfilled, (store, { payload }) => {
      store.allPosts = payload;
      store.loading = false;
      store.error = null;
    });
    builder.addCase(getAllPosts.rejected, (store, { payload }) => {
      store.error = payload;
      store.loading = false;
    });

    // Get User Posts

    builder.addCase(getUserPosts.pending, (store, _) => {
      store.loading = true;
    });
    builder.addCase(getUserPosts.fulfilled, (store, { payload }) => {
      store.userPosts = payload;
      store.loading = false;
      store.error = null;
    });
    builder.addCase(getUserPosts.rejected, (store, { payload }) => {
      store.error = payload;
      store.loading = false;
    });

    // Upload photo

    builder.addCase(uploadPhoto.pending, (store, _) => {
      store.loading = true;
    });
    builder.addCase(uploadPhoto.fulfilled, (store, { payload }) => {
      store.photoLink = payload;
      store.loading = false;
      store.error = null;
    });
    builder.addCase(uploadPhoto.rejected, (store, { payload }) => {
      store.error = payload;
      store.loading = false;
    });

    // Create comment
    // Что делать записывать ли коммментарий в стейт и что дальше
    // builder.addCase(uploadPhoto.pending, (store, _) => {
    //   store.loading = true;
    // });
    // builder.addCase(uploadPhoto.fulfilled, (store, { payload }) => {

    //   store.loading = false;
    //   store.error = null;
    // });
    // builder.addCase(uploadPhoto.rejected, (store, { payload }) => {
    //   store.error = payload;
    //   store.loading = false;
    // });

    // Get All Comments

    builder.addCase(getPostComments.pending, (store, _) => {
      store.loading = true;
    });
    builder.addCase(getPostComments.fulfilled, (store, { payload }) => {
      store.postComments = payload;
      store.loading = false;
      store.error = null;
    });
    builder.addCase(getPostComments.rejected, (store, { payload }) => {
      store.error = payload;
      store.loading = false;
    });
  },
});
