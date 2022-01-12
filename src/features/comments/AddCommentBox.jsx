import React, { useState } from "react";
import { useDispatch } from "react-redux";

import { addNewComment, updateReplyId } from "./commentSlice";

export default function AddCommentBox({
  postId,
  parentId = null,
  isHidden = false,
}) {
  const [user, setUser] = useState("");
  const [comment, setComment] = useState("");
  const [addRequestStatus, setAddRequestStatus] = useState("idle");

  const dispatch = useDispatch();
  const onUserChanged = (e) => setUser(e.target.value);
  const onCommentChanged = (e) => setComment(e.target.value);

  const canSave = [user, comment].every(Boolean) && addRequestStatus === "idle";

  const onSavePostClicked = async () => {
    if (canSave) {
      try {
        setAddRequestStatus("pending");
        await dispatch(
          addNewComment({ user, comment, postId, parentId })
        ).unwrap();
        if (parentId !== null) {
          dispatch(updateReplyId({ id: parentId }));
        }
        setUser("");
        setComment("");
      } catch (err) {
        console.error("Failed to save the comment: ", err);
      } finally {
        setAddRequestStatus("idle");
      }
    }
  };

  return isHidden === true ? null : (
    <>
      <div className="flex-1 min-w-0 mt-4">
        <form className="bg-indigo-50	 rounded-lg px-8 pt-6 pb-8 mb-4">
          <h2 className="text-xl font-bold leading-7 text-gray-600 sm:text-2xl sm:truncate mb-5">
            Add a Comment
          </h2>
          <div className="mb-4">
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="user"
              type="text"
              value={user}
              placeholder="Username"
              onChange={onUserChanged}
            />
          </div>
          <div className="mb-4">
            <textarea
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="comment"
              value={comment}
              type="text"
              placeholder="Comment"
              rows="4"
              onChange={onCommentChanged}
            />
          </div>
          <button
            type="button"
            onClick={onSavePostClicked}
            disabled={!canSave}
            className={`py-2 px-2 font-medium text-white rounded ${
              !canSave
                ? "bg-gray-300"
                : "bg-violet-500 hover:bg-violet-600 hover:shadow-lg hover:shadow-violet-500/40 transition duration-300"
            }`}
          >
            Submit
          </button>
        </form>
      </div>
    </>
  );
}
