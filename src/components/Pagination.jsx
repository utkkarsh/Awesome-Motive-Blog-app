import React from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/solid";

// This function will be used to create the Pagination with page numbers and left/right buttons.
export default function Pagination({
  postsPerPage,
  totalPosts,
  paginate,
  currentPage,
}) {
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="bg-white px-4 py-3 flex items-center justify-center border-t border-gray-200 sm:px-6">
      <div className="py-2">
        <div>
          <p className="text-sm text-gray-700">
            Showing
            <span className="font-medium">
              {" "}
              {currentPage * postsPerPage - 10}{" "}
            </span>
            to
            <span className="font-medium">
              {" "}
              {totalPosts > currentPage * postsPerPage
                ? currentPage * postsPerPage
                : totalPosts}{" "}
            </span>
            of
            <span className="font-medium"> {totalPosts} </span>
            results
          </p>
        </div>
        <nav className="block">
          <ul className="flex pl-0 rounded list-none flex-wrap">
            <button
              onClick={() => {
                currentPage === 1
                  ? paginate(currentPage)
                  : paginate(currentPage - 1);
              }}
              className="h-10 px-2 text-indigo-600 transition-colors duration-150 bg-white border border-r-0 border-indigo-600 rounded-l-lg focus:shadow-outline hover:bg-indigo-100"
            >
              <span className="sr-only">Next</span>
              <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
            </button>
            <li>
              {pageNumbers.map((number) => (
                <button
                  key={number}
                  onClick={() => {
                    paginate(number);
                  }}
                  // href="#"
                  className={
                    currentPage === number
                      ? "h-10 px-3 text-white transition-colors duration-150 bg-indigo-600 border border-r-0 border-indigo-600 focus:shadow-outline"
                      : "h-10 px-3 text-indigo-600 transition-colors duration-150 bg-white border border-r-0 border-indigo-600 focus:shadow-outline hover:bg-indigo-100"
                  }
                >
                  {number}
                </button>
              ))}
            </li>
            <button
              onClick={() => {
                currentPage * postsPerPage > totalPosts
                  ? paginate(currentPage)
                  : paginate(currentPage + 1);
              }}
              className="h-10 px-2 text-indigo-600 transition-colors duration-150 bg-white border border-indigo-600 rounded-r-lg focus:shadow-outline hover:bg-indigo-100"
            >
              <span className="sr-only">Next</span>
              <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
            </button>
          </ul>
        </nav>
      </div>
    </div>
  );
}
