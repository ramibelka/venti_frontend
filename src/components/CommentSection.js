import React, { useState, useEffect } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { useHistory } from "react-router-dom";

const CommentSection = ({ userToken, articleId, data, setData }) => {
  const [commentText, setCommentText] = useState("");
  const [comments, setComments] = useState([]);
  const history = useHistory();

  const handleAddComment = async () => {
    try {
      const endpoint = `http://127.0.0.1:8000/api/articles/${articleId}/comments/ajouter`;
      const config = {
        headers: {
          Authorization: `Token ${userToken}`,
        },
      };

      const requestBody = {
        article: articleId,
        comment: commentText,
      };

      const response = await axios.post(endpoint, requestBody, config);

      const newComment = response.data;
      setData({ ...data, comments: [...data.comments, newComment] });
      setComments([...comments, newComment]);
      setCommentText("");
    } catch (error) {
      console.log("Error adding comment:", error);
      history.push("/login");
    }
  };

  const handleDeleteComment = async (commentId) => {
    try {
      const endpoint = `http://127.0.0.1:8000/api/articles/comments/${commentId}/delete`;
      const config = {
        headers: {
          Authorization: `Token ${userToken}`,
        },
      };

      await axios.delete(endpoint, config);

      const updatedComments = data.comments.filter(
        (comment) => comment.id !== commentId
      );

      // Update the data state in the parent component
      setData({ ...data, comments: updatedComments });

      // Update the comments state in the comment section component
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
            <FontAwesomeIcon className="cross-icon" icon={faTrash} />
          </button>
        </p>
        &nbsp;
      </div>
    ));
  };

  return (
    <div className="offer-comments">
      <h2>Comments</h2>
      {renderComments()}

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
