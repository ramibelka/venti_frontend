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

const Offers = ({ data, offersTitle, show, userToken, setData }) => {
  const [likedArticles, setLikedArticles] = useState([]);
  const [savedArticles, setSavedArticles] = useState([]);

  const handleLike = async (id) => {
    try {
      const endpoint = `http://127.0.0.1:8000/api/articles/${id}/like/`;
      const config = {
        headers: {
          Authorization: `Token ${userToken}`,
        },
      };

      await axios.post(endpoint, {}, config);

      const updatedLikedArticles = [...likedArticles];
      const index = updatedLikedArticles.indexOf(id);
      if (!data[id].is_liked) {
        updatedLikedArticles.push(id);
      } else {
        if (index === -1) {
          updatedLikedArticles.push(id);
        } else {
          updatedLikedArticles.splice(index, 1);
        }
      }
      fetchArticlesData();

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
          Authorization: `Token ${userToken}`,
        },
      };

      await axios.post(endpoint, {}, config);

      const updatedSavedArticles = [...savedArticles];
      const index = updatedSavedArticles.indexOf(id);

      if (!data[id].is_saved) {
        updatedSavedArticles.push(id);
      } else {
        if (index === -1) {
          updatedSavedArticles.push(id);
        } else {
          updatedSavedArticles.splice(index, 1);
        }
      }
      fetchArticlesData();

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

  const fetchArticlesData = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:8000/api/articles", {
        headers: {
          Authorization: `Token ${userToken}`,
        },
      });
      setData(response.data);
    } catch (error) {
      console.log(error);
    }
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
                  {elem.like_count !== 0 && <span>{elem.like_count}</span>}
                  <FontAwesomeIcon
                    icon={elem.is_liked ? fasHeart : farHeart}
                    className={`icon ${elem.is_liked ? "liked" : ""}`}
                    onClick={() => handleLike(elem.id)}
                  />

                  <Link to={`/offer/${elem.id}`}>
                    <FontAwesomeIcon icon={faComment} className="icon" />
                  </Link>
                  <FontAwesomeIcon
                    icon={elem.is_saved ? fasBookmark : farBookmark}
                    className={`icon ${elem.is_saved ? "saved" : ""}`}
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
