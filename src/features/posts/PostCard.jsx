import React from "react";
import { Link } from "react-router-dom";

const PostsCard = ({ posts }) => {
  return (
    <div className="flex justify-center mb-10">
      <ul>
        {posts.map((post) => (
          <Link
            to={`/posts/${post._id}`}
            key={post._id}
            className="button muted-button"
          >
            <div
              key={post._id}
              className="w-full max-w-2xl overflow-hidden rounded-lg shadow-lg sm:flex mb-2 "
            >
              <img
                className="object-cover h-40 w-40 shadow-lg"
                src={`https://picsum.photos/650/940?random=${post._id}`}
                alt="Flower and sky"
              />
              <div className="flex-1 px-6 py-4">
                <h4 className="mb-3 text-xl font-bold tracking-tight text-gray-800 line-clamp-1">
                  {post.title}
                </h4>
                <p className="leading-normal text-gray-700 line-clamp-3">
                  {post.body}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </ul>
    </div>
  );
};

export default PostsCard;
