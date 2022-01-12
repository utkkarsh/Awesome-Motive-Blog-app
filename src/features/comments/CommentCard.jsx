import React from "react";
import AddCommentBox from "./AddCommentBox";
import { useSelector, useDispatch } from "react-redux";
import { checkReplyBoxState, updateReplyId } from "./commentSlice";

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export default function CommentCard({ comment, type }) {
  // local state variables for hiding/showing reply comment box.
  const dispatch = useDispatch();

  // This selector function will get replyState from the redux store, it will basically check if given comment has reply Box set to open or not.
  const replyIsOpen = useSelector((state) =>
    checkReplyBoxState(state, comment._id)
  );

  let date = new Date(comment.createdAt);

  // Function to construct recursive nested comments within the CommentCard.
  const nestedComments = (comment.children || []).map((comment) => {
    return <CommentCard key={comment._id} comment={comment} type="child" />;
  });

  return (
    <>
      <div
        className={`w-full p-3 my-3 text-xl rounded-lg 
        ${type === "child" ? "bg-indigo-100			" : "bg-indigo-50	"}`}
      >
        <div className="ml-[25px] mt-[16px]">
          <header className="flex items-start md:p-1">
            <img
              alt="Placeholder"
              className="=block rounded-full mr-2"
              src="https://picsum.photos/32/32/?random"
            />
            <div className="flex justify-center items-center">
              <div className="text-left">
                <p className="mr-[2px] font-bold text-sky-700 ">
                  {comment.user}
                </p>
                <p className="text-sm">{date.toUTCString()}</p>
              </div>
            </div>
          </header>
          <p className="break-words text-justify mr-4">
            {capitalizeFirstLetter(comment.comment)}
          </p>
          <footer className="pt-3">
            <span
              className="text-sm text-blue-600"
              onClick={() => {
                dispatch(updateReplyId({ id: comment._id }));
              }}
            >
              Reply
            </span>
            <AddCommentBox
              postId={comment._postId}
              parentId={comment._id}
              isHidden={!replyIsOpen}
            />
          </footer>
          {nestedComments}
        </div>
      </div>
    </>
  );
}
