import React, { useState, useEffect } from "react";
import { FaTrash } from "react-icons/fa";

// Comment component

// Comments component
const Comments = ({ postInfo, userInfo }) => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const postId = postInfo._id;

  // Function to delete a comment
  const deleteComment = async (commentId) => {
    if (confirm("Are You Sure?")) {
      try {
        await fetch(
          `http://localhost:3001/post/${postId}/comment/${commentId}`,
          {
            method: "DELETE",
          }
        );
        setComments(comments.filter((comment) => comment._id !== commentId));
      } catch (err) {
        console.error(err);
      }
    }
  };

  // Fetch comments when component mounts
  useEffect(() => {
    fetch(`http://localhost:3001/post/${postId}/comments`)
      .then((response) => response.json())
      .then((data) => setComments(data));
  }, [postId]);

  // Function to submit a new comment
  const submitComment = async () => {
    const response = await fetch(
      `http://localhost:3001/post/${postId}/comment`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          content: newComment,
          author: userInfo.username,
        }),
      }
    );
    const comment = await response.json();
    setComments([...comments, comment]);
    setNewComment("");
  };
  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          submitComment();
        }}
        className="w-full border rounded-md min-h-[200px] flex flex-col px-5 py-3 justify-between"
      >
        <h2 className="text-gray-500 text-xs text-center">
          Write your Comment ...
        </h2>
        <textarea
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder={
            !userInfo.username
              ? "Login to your account first"
              : "Write a comment..."
          }
          disabled={!userInfo.username && "true"}
          rows="3"
          className="outline-none h-full p-2 bg-gray-200"
        />
        <button
          type="submit"
          disabled={!userInfo.username && "true"}
          className="w-full h-10 bg-blue-500 text-white disabled:bg-gray-500"
        >
          Submit
        </button>
      </form>

      <div className="mt-10">
        <div className="w-full flex flex-col gap-5">
          {comments.map((comment) => (
            <div className="w-full h-auto min-h-[100px] p-4  bg-gray-200 rounded-md grid grid-cols-[8fr_1fr] justify-around">
              <div className="flex flex-col gap-3 ">
                <div className="flex gap-2 items-center">
                  <div className="w-10 h-10 rounded-full bg-black"></div>
                  <p>{comment.author}</p>
                </div>
                <p className="text-gray-700">{comment.content}</p>
              </div>
              <div className=" flex justify-center items-center">
                {userInfo.username === comment.author ||
                userInfo.username === postInfo.writer.username ? (
                  <button
                    onClick={() => deleteComment(comment._id)}
                    title="Remove the comment"
                    className="w-[40px] h-[40px] rounded-full flex justify-center items-center bg-red-500"
                  >
                    <FaTrash color="white" />
                  </button>
                ) : (
                  ""
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Comments;
