import React from "react";
import AddCommentBox from "./AddCommentBox";
import CommentList from "./CommentList";

export default function CommentView({ postId }) {
  return (
    <>
      <div className="pt-4">
        {/* Will display comment box to add new comments on a post/blog */}
        <AddCommentBox postId={postId} />

        {/* Will display comments from users*/}
        <CommentList postId={postId} />
      </div>
    </>
  );
}
