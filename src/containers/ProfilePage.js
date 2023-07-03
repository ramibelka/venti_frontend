import { useState, useEffect } from "react";
import axios from "axios";
import Offers from "../components/Offers";
import profileImage from "../assets/img/default-profile-pic.jpg";
import "./ProfilePage.css";
import { Link } from "react-router-dom";

import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faSpinner,
  faPlus,
  faBookmark,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
library.add(faSpinner, faPlus, faBookmark);

const ProfilePages = ({ userToken }) => {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const offersTitle = "My items";

  useEffect(() => {
    const fetchData = async () => {
      try {
        axios.defaults.withCredentials = true;
        const response = await axios.get(
          "http://127.0.0.1:8000/api/profile/current/",
          {
            headers: {
              Authorization: "Token " + userToken,
            },
          }
        );

        setData(response.data);
        setIsLoading(false);
      } catch (e) {
        console.log(e.message);
      }
    };
    fetchData();
  }, []);

  const handleDeleteArticle = async (articleId) => {
    try {
      axios.defaults.withCredentials = true;
      const response = await axios.delete(
        `http://127.0.0.1:8000/api/articles/${articleId}/supprimer/`,
        {
          headers: {
            Authorization: "Token " + userToken.userToken,
          },
        }
      );

      // Remove the deleted article from the state
      setData((prevData) => ({
        ...prevData,
        articles: prevData.articles.filter(
          (article) => article.id !== articleId
        ),
      }));

      console.log(response.data); // Optional: Log the response if needed
    } catch (error) {
      console.log(error.message);
    }
  };

  return isLoading ? (
    <div className="loading">
      <span className="spin">
        <FontAwesomeIcon icon="spinner" spin />
      </span>

      <span>Loading...</span>
    </div>
  ) : (
    <div className="profile-container">
      <div className="profile-header">
        <div className="profile-avatar-1">
          <img
            src={data.photo_de_profile ? data.photo_de_profile : profileImage}
            alt="Profile Avatar"
          />
        </div>
        <div className="profile-info">
          <h2 className="profile-username">{data.username}</h2>
          <p className="profile-bio">
            {data.description ? data.description : <span>bio</span>}
          </p>
          <ul className="profile-stats">
            <li>
              <span className="profile-stat-count">{data.articles.length}</span>{" "}
              posts
            </li>
            <li>
              <span className="profile-stat-count">
                {data.followers.length}
              </span>{" "}
              followers
            </li>
            <li>
              <span className="profile-stat-count">
                {data.following.length}
              </span>{" "}
              following
            </li>
          </ul>
          <Link to="/saved" className="saved-link">
            <FontAwesomeIcon icon="bookmark" className="saved-icon" />
            <span className="saved-text">Saved</span>
          </Link>
        </div>
      </div>
      <Offers
        data={data.articles}
        offersTitle={offersTitle}
        onDeleteArticle={handleDeleteArticle}
        isOwner={true}
      />
    </div>
  );
};

export default ProfilePages;
