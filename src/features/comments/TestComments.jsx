// import React, { useState, useContext, createContext } from "react";

// const CommentContext = createContext({});

// function Card(props) {
//   return (
//     <div {...props} className={`${props.className}`}>
//       {props.children}
//     </div>
//   );
// }

// function compare(a1, a2) {
//   if (JSON.stringify(a1) === JSON.stringify(a2)) {
//     return true;
//   }
//   return false;
// }

// function gen_comments(comments, colorindex, path) {
//   return comments.map((comment, i) => {
//     return (
//       <Comment
//         username={comment.username}
//         date={comment.date}
//         text={comment.text}
//         votes={comment.votes}
//         colorindex={colorindex}
//         key={i}
//         path={[...path, i]}
//         comments={comment.comments}
//       />
//     );
//   });
// }

// function Reply(props) {
//   const [text, setText] = useState("");
//   return (
//     <div {...props}>
//       <textarea
//         placeholder="What are your thoughts?"
//         minRows={2}
//         defaultValue={text}
//         onChange={(value) => {
//           setText(value.target.value);
//         }}
//       />
//       <div className="panel">
//         <button>COMMENT</button>
//       </div>
//     </div>
//   );
// }

// function Comment(props) {
//   const [replying, setReplying] = useContext(CommentContext);
//   const [hidden, setHidden] = useState(false);

//   return (
//     <div {...props}>
//       {hidden ? (
//         <button
//           id="showMore"
//           onClick={() => {
//             setHidden(false);
//           }}
//         >
//           Show More Replies
//         </button>
//       ) : (
//         <>
//           <div id="right">
//             <div id="top">
//               <span id="username">{props.username}</span>
//               <span id="date">{props.date}</span>
//             </div>
//             <div id="content">{props.text}</div>
//             <div id="actions">
//               <span
//                 className={`${compare(replying, props.path) ? "selected" : ""}`}
//                 onClick={() => {
//                   if (compare(replying, props.path)) {
//                     setReplying([]);
//                   } else {
//                     setReplying(props.path);
//                   }
//                 }}
//               >
//                 reply
//               </span>
//             </div>
//             <Reply className={compare(replying, props.path) ? "" : "hidden"} />
//             <div className={`comments`}>
//               {gen_comments(props.comments, props.colorindex + 1, [
//                 ...props.path,
//               ])}
//             </div>
//           </div>
//         </>
//       )}
//     </div>
//   );
// }

// export default function Comments(props) {
//   var [replying, setReplying] = useState([]);
//   var [comments, setComments] = useState([
//     {
//       username: "Kevin",
//       date: "3 hours ago",
//       text: "#Hello\n>quote\n\n`code`",
//       votes: 12,
//       comments: [
//         {
//           username: "Kevin",
//           date: "2 hours ago",
//           text: "^ click the minimize button to hide threads",
//           votes: 8,
//           comments: [
//             {
//               username: "Kevin",
//               date: "1 hours ago",
//               text: "<- Click the arrows to vote",
//               votes: 3,
//               comments: [],
//             },
//           ],
//         },
//         {
//           username: "Kevin",
//           date: "4 hours ago",
//           text: "click on reply to open up a text prompt",
//           votes: 5,
//           comments: [],
//         },
//         {
//           username: "Kevin",
//           date: "4 hours ago",
//           text: "click on reply to open up a text prompt",
//           votes: 5,
//           comments: [],
//         },
//         {
//           username: "Kevin",
//           date: "4 hours ago",
//           text: "click on reply to open up a text prompt",
//           votes: 5,
//           comments: [],
//         },
//         {
//           username: "Kevin",
//           date: "10 mins ago",
//           text: "this",
//           votes: 2,
//           comments: [
//             {
//               username: "Kevin",
//               date: "8 mins ago",
//               text: "is",
//               votes: 1,
//               comments: [
//                 {
//                   username: "Kevin",
//                   date: "5 mins ago",
//                   text: "to",
//                   votes: 0,
//                   comments: [
//                     {
//                       username: "Kevin",
//                       date: "4 mins ago",
//                       text: "show",
//                       votes: -1,
//                       comments: [
//                         {
//                           username: "Kevin",
//                           date: "2 mins ago",
//                           text: "nesting",
//                           votes: -200,
//                           comments: [],
//                         },
//                       ],
//                     },
//                   ],
//                 },
//               ],
//             },
//           ],
//         },
//       ],
//     },
//   ]);

//   return (
//     <Card {...props}>
//       <span id="comments">Comments</span>
//       <span id="comments_count">(9)</span>
//       <Reply />
//       <CommentContext.Provider value={[replying, setReplying]}>
//         {gen_comments(comments, 0, [])}
//       </CommentContext.Provider>
//     </Card>
//   );
// }

// import { useSelector, useDispatch } from "react-redux";
// import { selectCommentByPost, fetchNestedComments } from "./commentSlice";
// import React, { useEffect } from "react";

// comments = [
//   {
//     id: 1,
//     parentId: null,
//     text: 'Love this article!',
//     author: 'john',
//     children: null,
//   },
//   {
//     id: 3,
//     parentId: 1,
//     text: 'Agreed! this article is great',
//     author: 'kevin',
//     children: null,
//   },
//   {
//     id: 2,
//     parentId: 1,
//     text: 'What r u talking about this article is terrible...',
//     author: 'james',
//     children: null,
//   },
//   {
//     id: 5,
//     parentId: null,
//     text: 'Sweet article! Nice job always high quality.',
//     author: 'steve',
//     children: null,
//   },
//   {
//     id: 4,
//     parentId: 2,
//     text: 'come on, its a good article and u know it',
//     author: 'sarah',
//     children: null,
//   },
//   {
//     id: 6,
//     parentId: 5,
//     text: 'agreed, solid content here for sure!',
//     author: 'jeff',
//     children: null,
//   },
// ]

// function createTree(listOriginal) {
//   let list = JSON.parse(JSON.stringify(listOriginal));
//   var map = {},
//     node,
//     roots = [],
//     i;

//   for (i = 0; i < list.length; i += 1) {
//     map[list[i]._id] = i; // initialize the map
//     list[i].children = []; // initialize the children
//   }

//   for (i = 0; i < list.length; i += 1) {
//     node = list[i];
//     if (node._parentId) {
//       // if you have dangling branches check that map[node.parentId] exists
//       list[map[node._parentId]].children.push(node);
//     } else {
//       roots.push(node);
//     }
//   }
//   return roots;
// }

// function nestComments(originalCommentList) {
//   let commentList = JSON.parse(JSON.stringify(originalCommentList));

//   const commentMap = {};

//   // move all the comments into a map of id => comment
//   commentList.forEach((comment) => (commentMap[comment._id] = comment));

//   // iterate over the comments again and correctly nest the children
//   commentList.forEach((comment) => {
//     if (comment._parentId !== null) {
//       const parent = commentMap[comment._parentId];
//       (parent.children = parent.children || []).push(comment);
//     }
//   });

//   // filter the list to return a list of correctly nested comments
//   return commentList.filter((comment) => {
//     return comment._parentId === null;
//   });
// }

// function Comment({ comment }) {
//   const nestedComments = (comment.children || []).map((comment) => {
//     return <Comment key={comment._id} comment={comment} type="child" />;
//   });

//   return (
//     <div style={{ marginLeft: "25px", marginTop: "16px" }}>
//       <div style={{ color: "#555", margin: "0 0 2px 0", fontSize: "9pt" }}>
//         {comment.user}
//       </div>
//       <div style={{ color: "#333", fontSize: "10pt" }}>{comment.comment}</div>
//       {nestedComments}
//     </div>
//   );
// }

// function App() {
//   const dispatch = useDispatch();
//   let postId = "61db4a5423e0a9cd96c40e10";

//   const comments = useSelector((state) => selectCommentByPost(state, postId));
//   const commentStatus = useSelector((state) => state.comments.status);
//   const error = useSelector((state) => state.comments.error);

//   useEffect(() => {
//     dispatch(fetchNestedComments(postId));
//   }, [dispatch, postId]);

//   const commentTree = nestComments(comments);
//   console.log(commentTree);
//   return (
//     <div style={{ fontFamily: "sans-serif" }}>
//       {commentTree.map((comment) => {
//         return <Comment key={comment._id} comment={comment} />;
//       })}
//     </div>
//   );
// }

// export default App;
