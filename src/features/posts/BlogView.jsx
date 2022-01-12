import React from "react";

function BlogView({ title, content }) {
  return (
    <>
      <div className="lg:flex lg:items-center lg:justify-between">
        <div className="flex-1 min-w-0">
          {/* Blog Heading */}
          <h2 className="text-3xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">
            {title}
          </h2>

          {/* Blog Content */}
          <h4 className="text-l  leading-7 text-gray-800 sm:text-2xl pt-5 text-justify">
            {content}
          </h4>
        </div>
      </div>
    </>
  );
}

export default BlogView;
