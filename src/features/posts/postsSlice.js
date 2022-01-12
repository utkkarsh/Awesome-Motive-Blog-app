import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import client from "../../api/client";
const initialState = {
  posts: [],
  status: "idle",
  error: null,
};

// creating Thunk to communicate with REST APIs, same can be done using RTK queries as well.

// Thunk to get all the posts from back-end.
export const fetchPosts = createAsyncThunk("posts/fetchPosts", async () => {
  const response = await client.get("/posts/");
  console.log(response.data);
  return response.data;
});

// Thunk to get a single post from back-end using postId.
export const fetchSinglePost = createAsyncThunk(
  "posts/fetchPost",
  async (postId) => {
    const response = await client.get("/posts/" + postId);
    console.log(response.data);
    return response.data;
  }
);

// Thunk to create a new post on back-end.
export const addNewPost = createAsyncThunk(
  "posts/addNewPost",
  async (initialPost) => {
    const response = await client.post("/posts/", initialPost);
    return response.data;
  }
);

const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchPosts.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.status = "succeeded";
        // Add any fetched posts to the array
        state.posts = state.posts.concat(action.payload);
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(fetchSinglePost.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchSinglePost.fulfilled, (state, action) => {
        state.status = "succeeded";
        let data = action.payload;

        const result = data.filter(
          ({ _id: id1 }) => !state.posts.some(({ _id: id2 }) => id2 === id1)
        );

        if (result.length !== 0) state.posts = state.posts.concat(result);

        // Add any fetched posts to the array
        // state.posts = state.posts.concat(action.payload);
      })
      .addCase(fetchSinglePost.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(addNewPost.fulfilled, (state, action) => {
        state.posts.push(action.payload);
      });
  },
});

export const { postAdded } = postsSlice.actions;

export default postsSlice.reducer;

export const selectAllPosts = (state) => state.posts.posts;

export const selectPostCounts = (state) => state.posts.posts.length;

export const selectPostById = (state, postId) =>
  state.posts.posts.find((post) => post._id === postId);
