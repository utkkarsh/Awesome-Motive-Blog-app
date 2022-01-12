import ReactDom from "react-dom";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addNewPost } from "./postsSlice";

const MODAL_STYLES = {
  position: "fixed",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  backgroundColor: "#FFF",
  padding: "20px",
  zIndex: 1000,
};

const OVERLAY_STYLES = {
  position: "fixed",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: "rgba(0, 0, 0, .7)",
  zIndex: 1000,
};

// This function will be accessed as a Portal so that modal can be popped up on any screen without any issue.
// We'll take open and close props from the parent so that modal can be opened/closed based on parent's call.

// This Modal will be used to create new Posts in the Blog app. This will input title and content from the user.
export default function AddPostModal({ open, onClose }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [addRequestStatus, setAddRequestStatus] = useState("idle");

  const dispatch = useDispatch();

  const onTitleChanged = (e) => setTitle(e.target.value);
  const onContentChanged = (e) => setContent(e.target.value);

  const canSave =
    [title, content].every(Boolean) && addRequestStatus === "idle";

  const onSavePostClicked = async () => {
    if (canSave) {
      try {
        setAddRequestStatus("pending");
        await dispatch(addNewPost({ title, content })).unwrap();
        setTitle("");
        setContent("");
        onClose();
      } catch (err) {
        console.error("Failed to save the post: ", err);
      } finally {
        setAddRequestStatus("idle");
      }
    }
  };

  if (!open) return null;
  return ReactDom.createPortal(
    <>
      <div
        className="fixed ml-0 mt-0 mr-0 mb-0 bg-black "
        style={OVERLAY_STYLES}
      ></div>
      <div style={MODAL_STYLES} className="rounded">
        <h2 className="text-2xl leading-7 text-gray-600 sm:text-2xl sm:truncate mb-5 ">
          Create Post
        </h2>

        <form className="bg-white  rounded px-8 pt-6 pb-8 mb-4">
          <div className="mb-4">
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="title"
              type="text"
              placeholder="Title"
              value={title}
              onChange={onTitleChanged}
              size="50"
            />
          </div>
          <div className="mb-4">
            <textarea
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="content"
              type="text"
              placeholder="Content"
              rows="4"
              value={content}
              onChange={onContentChanged}
            />
          </div>

          <div className="flex justify-end">
            <button
              type="button"
              onClick={onSavePostClicked}
              disabled={!canSave}
              className="py-2 px-2 font-medium text-white bg-violet-500 rounded hover:bg-violet-600 hover:shadow-lg hover:shadow-violet-500/40 transition duration-300"
            >
              Save
            </button>
            <button
              className="py-2 px-2 ml-2 font-medium text-black bg-gray-200 rounded hover:bg-gray-300 hover:shadow-lg hover:shadow-white-500/40 transition duration-300"
              onClick={onClose}
            >
              Close
            </button>
          </div>
        </form>
      </div>{" "}
    </>,
    document.getElementById("portal")
  );
}
