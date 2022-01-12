import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Pagination from "../components/Pagination";

import { Spinner } from "../components/Spinner";
import PostsCard from "./posts/PostCard";
import { selectAllPosts, fetchPosts } from "./posts/postsSlice";

export function Home() {
  const dispatch = useDispatch();
  const posts = useSelector(selectAllPosts);
  const postStatus = useSelector((state) => state.posts.status);
  const error = useSelector((state) => state.posts.error);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(10);

  // Get current posts
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  // Logic to order posts based on date parameter
  const orderedPosts = posts
    .slice()
    .sort((a, b) => b.createdAt.localeCompare(a.createdAt));

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const currentPosts = orderedPosts.slice(indexOfFirstPost, indexOfLastPost);

  useEffect(() => {
    if (postStatus === "idle") {
      dispatch(fetchPosts());
    }
  }, [postStatus, dispatch]);

  let content;

  if (postStatus === "loading") {
    content = <Spinner text="Loading..." />;
  } else if (postStatus === "succeeded") {
    // Sort posts in reverse chronological order by datetime string

    // console.log(posts);
    content = <PostsCard posts={currentPosts}></PostsCard>;
  } else if (postStatus === "failed") {
    content = <div>{error}</div>;
  }

  return (
    <div className="container mx-auto px-4 pt-4 w-full md:w-4/5 lg:my-4 lg:px-4 lg:w-4/5 xl:w-3/4 2xl:w-1/2">
      {content}
      <Pagination
        postsPerPage={postsPerPage}
        totalPosts={posts.length}
        paginate={paginate}
        currentPage={currentPage}
      />
    </div>
  );
}

export default Home;
