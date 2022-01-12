import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import client from "../../api/client";

const initialState = {
  comments: [],
  status: "idle",
  error: null,
  replyId: "61db60f059e562999894aa88",
};

// creating Thunk to communicate with REST APIs, same can be done using RTK queries as well.

// Thunk to fetch comment for a given post.
export const fetchComments = createAsyncThunk(
  "comments/fetchComments",
  async (postId) => {
    const response = await client.get("/comments/" + postId);
    return response.data;
  }
);

export const fetchNestedComments = createAsyncThunk(
  "comments/fetchNestedComments",
  async (postId) => {
    const response = await client.get("/comments/nested" + postId);
    return response.data;
  }
);

// Thunk to create a new comment on a given post.
export const addNewComment = createAsyncThunk(
  "comments/addNewComment",
  async (initialComment) => {
    console.log(initialComment);
    const response = await client.post("/comments/", initialComment);
    return response.data;
  }
);

const commentsSlice = createSlice({
  name: "comments",
  initialState,
  reducers: {
    // omit reducer cases
    updateReplyId(state, action) {
      const { id } = action.payload;
      console.log(id);
      state.replyId = id === state.replyId ? "" : id;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchComments.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchComments.fulfilled, (state, action) => {
        state.status = "succeeded";
        // Add any fetched comments to the array
        // filter out unique comments to be added to the redux store.
        let data = action.payload;
        console.log(data);
        const result = data.filter(
          ({ _id: id1 }) => !state.comments.some(({ _id: id2 }) => id2 === id1)
        );

        if (result.length !== 0) state.comments = state.comments.concat(result);
      })
      .addCase(fetchComments.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(fetchNestedComments.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchNestedComments.fulfilled, (state, action) => {
        state.status = "succeeded";
        // Add any fetched comments to the array
        // filter out unique comments to be added to the redux store.
        let data = action.payload;
        console.log(data);
        const result = data.filter(
          ({ _id: id1 }) => !state.comments.some(({ _id: id2 }) => id2 === id1)
        );

        if (result.length !== 0) state.comments = state.comments.concat(result);
      })
      .addCase(fetchNestedComments.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(addNewComment.fulfilled, (state, action) => {
        state.comments.push(action.payload);
      });
  },
});

export const { commentAdded, updateReplyId } = commentsSlice.actions;

export default commentsSlice.reducer;

export const selectCommentByPost = (state, postId) =>
  state.comments.comments.filter((comment) => comment._postId === postId);

export const selectCommentById = (state, commentId) =>
  state.comments.comments.find((comment) => comment._id === commentId);

export const checkReplyBoxState = (state, commentId) =>
  state.comments.replyId === commentId;
