import { configureStore } from "@reduxjs/toolkit";

import postsReducer from "./features/posts/postsSlice";
import commentsReducer from "./features/comments/commentSlice";

export default configureStore({
  reducer: {
    posts: postsReducer,
    comments: commentsReducer,
  },
});
