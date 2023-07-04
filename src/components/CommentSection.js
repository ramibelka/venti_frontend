import axiosInstance from "../components/axiosInstance";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { useHistory } from "react-router-dom";

const CommentSection = ({ userToken, articleId, data, setData }) => {
  const [commentText, setCommentText] = useState("");
  const [comments, setComments] = useState([]);
  const history = useHistory();

  const handleAddComment = async () => {
    try {
      //const endpoint = `http://127.0.0.1:8000/api/articles/${articleId}/comments/ajouter`;
      const config = {
        headers: {
          Authorization: `Token ${userToken}`,
        },
      };

      // Prepare the request body with the article ID and comment text
      const requestBody = {
        article: articleId,
        comment: commentText,
      };

      // Send a POST request to add the comment
      const response = await axiosInstance.post(
        `api/articles/${articleId}/comments/ajouter`,
        requestBody,
        config
      );
      //const response = await axios.post(endpoint, requestBody, config);

      const newComment = response.data;
      // Update the data state in the parent component with the new comment
      setData({ ...data, comments: [...data.comments, newComment] });
      // Update the comments state in the CommentSection component with the new comment
      setComments([...comments, newComment]);
      // Clear the commentText state for the next comment
      setCommentText("");
    } catch (error) {
      console.log("Error adding comment:", error);
      history.push("/login"); // Redirect to login page in case of an error
    }
  };

  const handleDeleteComment = async (commentId) => {
    try {
      //const endpoint = `http://127.0.0.1:8000/api/articles/comments/${commentId}/delete`;

      const config = {
        headers: {
          Authorization: `Token ${userToken}`,
        },
      };

      // Send a DELETE request to delete the comment
      //await axios.delete(`/api/articles/comments/${commentId}/delete`, config);
      const response = await axiosInstance.delete(
        `api/articles/comments/${commentId}/delete`,
        config
      );

      // Filter out the deleted comment from the comments list
      const updatedComments = data.comments.filter(
        (comment) => comment.id !== commentId
      );

      // Update the data state in the parent component without the deleted comment
      setData({ ...data, comments: updatedComments });

      // Update the comments state in the CommentSection component without the deleted comment
      setComments(updatedComments);
    } catch (error) {
      console.log("Error deleting comment:", error);
    }
  };

  const renderComments = () => {
    return data.comments.map((comment) => (
      <div className="comment-container" key={comment.id}>
        <p>
          {comment.user} : {comment.comment}
          <button
            className="delete-button"
            onClick={() => handleDeleteComment(comment.id)}
          >
            <FontAwesomeIcon className="cross-icon" icon={faTrashAlt} />
          </button>
        </p>
        &nbsp;
      </div>
    ));
  };

  return (
    <div className="offer-comments">
      <h2>Comments</h2>
      {renderComments()} {/* Render the list of comments */}
      <div className="add-comment">
        <textarea
          autoFocus
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
          placeholder="Add a comment..."
        />
        <button onClick={handleAddComment}>Add Comment</button>
      </div>
    </div>
  );
};

export default CommentSection;
