import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import BlogView from "./BlogView";
import CommentView from "../comments/CommentView";
import {
  fetchSinglePost,
  selectPostById,
  selectPostCounts,
} from "./postsSlice";

// This page will show a single post along with the comments view on the post.
export const SinglePostPage = () => {
  let params = useParams();
  const dispatch = useDispatch();
  const totalPosts = useSelector((state) => selectPostCounts(state));
  // Get the post data from redux
  const post = useSelector((state) => selectPostById(state, params.postId));

  // What if someone directly jumping to this url ?
  useEffect(() => {
    const fetchData = async () => {
      await dispatch(fetchSinglePost(params.postId));
    };

    if (totalPosts === 0) {
      fetchData();
    }
  }, [totalPosts, dispatch, params.postId]);

  if (totalPosts > 0 && !post) {
    return (
      <section>
        <h2>Post not found!</h2>
      </section>
    );
  }

  return (
    <section>
      <article className="container mx-auto px-4 pt-4 w-full md:w-4/5 lg:my-4 lg:px-4 lg:w-4/5 xl:w-3/4 2xl:w-1/2">
        {post?._id ? (
          <>
            {/* Blog View */}
            <BlogView title={post.title} content={post.body} />

            {/* Comment View */}
            <CommentView postId={post._id}></CommentView>
          </>
        ) : (
          <>Loading Data...</>
        )}
      </article>
    </section>
  );
};
