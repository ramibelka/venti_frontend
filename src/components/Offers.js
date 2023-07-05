import axiosInstance from "../components/axiosInstance";
import { Link, useHistory, useLocation } from "react-router-dom";
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

const Offers = ({ data, offersTitle, show, userToken, setData, fetchData }) => {
  const location = useLocation();
  // The current location.

  const [likedArticles, setLikedArticles] = useState([]);
  const [savedArticles, setSavedArticles] = useState([]);

  const history = useHistory();

  const handleLike = async (id) => {
    try {
      const endpoint = `http://127.0.0.1:8000/api/articles/${id}/like/`;
      const config = {
        headers: {
          Authorization: `Token ${userToken}`,
        },
      };

      // Send a POST request to the server to like the article
      await axiosInstance.post(`/api/articles/${id}/like/`, {}, config);
      //await axios.post(endpoint, {}, config);

      const updatedLikedArticles = [...likedArticles];
      const index = updatedLikedArticles.indexOf(id); //if returns -1 means doesn't exist
      const isClickedLiked = data.find((element) => element.id === id).is_liked;

      if (!isClickedLiked) {
        // if article not liked in the DB
        updatedLikedArticles.push(id); // Add the article ID to the liked articles list
      } else {
        //else test if it's in the state already
        if (index === -1) {
          updatedLikedArticles.push(id);
        } else {
          //else if it exists in the state delete it
          updatedLikedArticles.splice(index, 1); // Remove the article ID from the liked articles list
        }
      }
      fetchData(); // Fetch updated article data

      setLikedArticles(updatedLikedArticles); // Update the liked articles state
    } catch (error) {
      console.log("Error liking article:", error);
      history.push("/login"); // Redirect to login page in case of an error
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

      // Send a POST request to the server to save the article
      await axiosInstance.post(`/api/articles/${id}/save/`, {}, config);
      //await axios.post(endpoint, {}, config);

      const updatedSavedArticles = [...savedArticles];
      const index = updatedSavedArticles.indexOf(id);

      if (!data[id].is_saved) {
        updatedSavedArticles.push(id); // Add the article ID to the saved articles list
      } else {
        if (index === -1) {
          updatedSavedArticles.push(id);
        } else {
          updatedSavedArticles.splice(index, 1); // Remove the article ID from the saved articles list
        }
      }
      fetchData(); // Fetch updated article data

      setSavedArticles(updatedSavedArticles); // Update the saved articles state
    } catch (error) {
      console.log("Error saving article:", error);
      history.push("/login"); // Redirect to login page in case of an error
    }
  };

  // const isArticleLiked = (id) => {
  //   return likedArticles.includes(id);
  // };

  // const isArticleSaved = (id) => {
  //   return savedArticles.includes(id);
  // };

  const fetchArticlesData = async () => {
    try {
      const response = await axiosInstance.get("/api/articles/", {
        headers: {
          Authorization: `Token ${userToken}`,
        },
      });
      // const response = await axios.get("http://127.0.0.1:8000/api/articles", {
      //   headers: {
      //     Authorization: `Token ${userToken}`,
      //   },
      // });
      setData(response.data); // Update the article data state with the fetched data
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
              {show && !location.pathname.includes("/profiles") && (
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
