import { Link } from "react-router-dom";
import AddPostModal from "../posts/AddPostModal";
import { useState } from "react";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <nav className="sticky top-0 z-10 bg-dark backdrop-filter backdrop-blur-lg bg-opacity-30 border-b border-gray-200">
        <div className="max-w-5xl mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <span className="text-2xl text-gray-900 font-semibold">
              <Link to="/">
                <img
                  src="/logo_large.png"
                  alt="Logo"
                  className="h-8 w-8 mr-2"
                />
              </Link>
            </span>
            <div className="flex space-x-4 text-gray-900">
              <button
                onClick={() => setIsOpen(true)}
                className="py-2 px-2 font-medium text-white bg-blue-500 rounded hover:bg-blue-400 hover:shadow-lg hover:shadow-blue-500/50 transition duration-300"
              >
                Add New
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="inline-block w-6 h-6 ml-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </button>

              <Link to="/">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="inline-block w-6 h-6 mt-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                  />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </nav>
      <AddPostModal open={isOpen} onClose={() => setIsOpen(false)}>
        Add Post Modal
      </AddPostModal>
    </>
  );
}
