import { Link } from "react-router-dom";
import axios from "axios";
//import "./Offers.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHeart as farHeart,
  faComment,
  faBookmark as farBookmark,
} from "@fortawesome/free-regular-svg-icons";
import {
  faHeart as fasHeart,
  faBookmark as fasBookmark,
} from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import profileImage from "../assets/img/default-profile-pic.jpg";

const Offers = ({ data, offersTitle, show, userToken, isOwner }) => {
  const [likedArticles, setLikedArticles] = useState([]);
  const [savedArticles, setSavedArticles] = useState([]);

  const handleLike = async (id) => {
    try {
      const endpoint = `http://127.0.0.1:8000/api/articles/${id}/like/`;
      const config = {
        headers: {
          Authorization: `Token ${userToken.userToken}`,
        },
      };

      await axios.post(endpoint, {}, config);

      const updatedLikedArticles = [...likedArticles];
      const index = updatedLikedArticles.indexOf(id);

      if (index === -1) {
        updatedLikedArticles.push(id);
      } else {
        updatedLikedArticles.splice(index, 1);
      }

      setLikedArticles(updatedLikedArticles);
    } catch (error) {
      console.log("Error liking article:", error);
    }
  };

  const handleSave = async (id) => {
    try {
      const endpoint = `http://127.0.0.1:8000/api/articles/${id}/save/`;
      const config = {
        headers: {
          Authorization: `Token ${userToken.userToken}`,
        },
      };

      await axios.post(endpoint, {}, config);

      const updatedSavedArticles = [...savedArticles];
      const index = updatedSavedArticles.indexOf(id);

      if (index === -1) {
        updatedSavedArticles.push(id);
      } else {
        updatedSavedArticles.splice(index, 1);
      }

      setSavedArticles(updatedSavedArticles);
    } catch (error) {
      console.log("Error saving article:", error);
    }
  };

  const isArticleLiked = (id) => {
    return likedArticles.includes(id);
  };

  const isArticleSaved = (id) => {
    return savedArticles.includes(id);
  };

  return (
    <main className="wrapper">
      <h1>{offersTitle}</h1>
      <div className="offers">
        {data.map((elem) => (
          <div key={elem.id} className="wrap-card">
            <div className="offer-card">
              {show ? (
                <Link to={`/profiles/${elem.auteur_id}`}>
                  <div className="avatar-card">
                    <img
                      src={
                        elem.photo_de_profile
                          ? elem.photo_de_profile
                          : profileImage
                      }
                      alt="/"
                      className="avatar-card"
                    />
                    <span>{elem.auteur}</span>
                  </div>
                </Link>
              ) : (
                <div> </div>
              )}

              <Link to={`/offer/${elem.id}`} className="post-card">
                <img src={elem.photo} alt="/" className="product-card" />
              </Link>

              {show ? (
                <div className="icons-container">
                  <FontAwesomeIcon
                    icon={isArticleLiked(elem.id) ? fasHeart : farHeart}
                    className={`icon ${isArticleLiked(elem.id) ? "liked" : ""}`}
                    onClick={() => handleLike(elem.id)}
                  />
                  <FontAwesomeIcon icon={faComment} className="icon" />
                  <FontAwesomeIcon
                    icon={isArticleSaved(elem.id) ? fasBookmark : farBookmark}
                    className={`icon ${isArticleSaved(elem.id) ? "saved" : ""}`}
                    onClick={() => handleSave(elem.id)}
                  />
                </div>
              ) : (
                <div></div>
              )}

              <div className="post-info">
                <p>{elem.prix} DZD</p>
                <p>{elem.nom_article}</p>
                <p>{elem.Etat}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
};

export default Offers;
