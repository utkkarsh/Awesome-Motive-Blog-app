import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Spinner } from "../../components/Spinner";
import { selectCommentByPost, fetchComments } from "./commentSlice";
import CommentCard from "./CommentCard";

function nestComments(originalCommentList) {
  // create a DEEP copy of originalCommentList
  let commentList = JSON.parse(JSON.stringify(originalCommentList));
  const commentMap = {};

  // move all the comments into a map of id => comment
  commentList.forEach((comment) => (commentMap[comment._id] = comment));

  // iterate over the comments again and correctly nest the children
  commentList.forEach((comment) => {
    if (comment._parentId !== null) {
      const parent = commentMap[comment._parentId];
      (parent.children = parent.children || []).push(comment);
    }
  });

  // filter the list to return a list of correctly nested comments
  return commentList.filter((comment) => {
    return comment._parentId === null;
  });
}

export default function CommentList({ postId }) {
  // retrieve the comments for given post
  const dispatch = useDispatch();
  const comments = useSelector((state) => selectCommentByPost(state, postId));
  const commentStatus = useSelector((state) => state.comments.status);
  const error = useSelector((state) => state.comments.error);

  useEffect(() => {
    dispatch(fetchComments(postId));
  }, [dispatch, postId]);

  let content;
  if (commentStatus === "loading") {
    content = <Spinner text="Loading..." />;
  } else if (commentStatus === "failed") {
    content = <div>{error}</div>;
  } else if (commentStatus === "succeeded") {
    // Sort posts in reverse chronological order by datetime string
    const orderedComments = comments
      .slice()
      .sort((a, b) => b.createdAt.localeCompare(a.createdAt));

    const commentTree = nestComments(orderedComments);
    console.log(commentTree);
    content = commentTree?.map((comment) => (
      <CommentCard comment={comment} key={comment._id}></CommentCard>
    ));
  }
  return <> {content}</>;
}
