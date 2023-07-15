import axiosInstance from "../components/axiosInstance";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Offers from "../components/Offers";
import profileImage from "../assets/img/default-profile-pic.jpg";
import "./ProfilePage.css";

import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faSpinner,
  faPlus,
  faStar as solidStar,
} from "@fortawesome/free-solid-svg-icons";
import { faStar as regularStar } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
library.add(faSpinner, faPlus, solidStar, regularStar);

const Profiles = ({ userToken }) => {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [isFollowing, setIsFollowing] = useState(false);
  const [rating, setRating] = useState(0);
  const [error, setError] = useState("");
  const [isRatingSubmitted, setIsRatingSubmitted] = useState(false);
  const offersTitle = "";
  const { id } = useParams();
  console.log(userToken);
  let headers = "";
  if (userToken) {
    headers = {
      headers: {
        Authorization: `Token ${userToken}`,
      },
    };
  }
  const fetchData = async () => {
    try {
      axios.defaults.withCredentials = true;
      const response = await axiosInstance.get(`/api/profiles/${id}`, headers);
      // const response = await axios.get(
      //   `http://127.0.0.1:8000/api/profiles/${id}`,
      //   headers
      // );
      const { is_followed, ...profileData } = response.data;
      setData(profileData);
      setIsFollowing(is_followed);
      setIsLoading(false);
    } catch (e) {
      console.log(e.message);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleFollow = async () => {
    try {
      const endpoint = isFollowing
        ? `/api/profiles/${id}/desabonner/`
        : `/api/profiles/${id}/abonner/`;

      await axiosInstance.post(endpoint, null, {
        headers: {
          Authorization: "Token " + userToken,
        },
      });
      // await axios.post(endpoint, null, {
      //   headers: {
      //     Authorization: "Token " + userToken,
      //   },
      // });

      setIsFollowing(!isFollowing);
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleRating = async (value) => {
    if (isRatingSubmitted) {
      return; // Do nothing if the rating is already submitted
    }

    setRating(value);
    try {
      const response = await axiosInstance.post(
        "/api/evaluation/ajouter/",
        {
          rated_user: data.username,
          rating: value,
        },
        {
          headers: {
            Authorization: `Token ${userToken}`,
          },
        }
      );
      // const response = await axios.post(
      //   "http://127.0.0.1:8000/api/evaluation/ajouter/",
      //   {
      //     rated_user: data.username,
      //     rating: value,
      //   },
      //   {
      //     headers: {
      //       Authorization: `Token ${userToken}`,
      //     },
      //   }
      // );

      setIsRatingSubmitted(true);

      // Update the rating state or perform any necessary actions after successful submission

      // You can also refetch the profile data to update the evaluation statistics
      fetchData();
    } catch (error) {
      console.log(error.message);
      setError("Already rated");
    }
  };

  const renderStar = (value) => {
    if (isRatingSubmitted) {
      return (
        <FontAwesomeIcon
          icon={solidStar}
          className={`star-icon ${value <= rating ? "active" : ""}`}
        />
      );
    } else {
      return (
        <FontAwesomeIcon
          icon={regularStar}
          className={`star-icon ${value <= rating ? "active" : ""}`}
          onClick={() => handleRating(value)}
        />
      );
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
        <div className="profile-avatar-2">
          <img
            src={data.photo_de_profile ? data.photo_de_profile : profileImage}
            alt="Profile Avatar"
            className="profile-"
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
          <div className="profile-rating">
            <p>Total Ratings: {data.total_ratings}</p>
            <p>Average Rating: {data.average_rating}</p>
          </div>
          {userToken && (
            <div className="rating-bar">
              {[1, 2, 3, 4, 5].map((value) => (
                <span key={value}>{renderStar(value)}</span>
              ))}
            </div>
          )}
          <p>{error}</p>
          {userToken && (
            <button className="follow-button" onClick={handleFollow}>
              {isFollowing ? "Unfollow" : "Follow"}
            </button>
          )}
        </div>
      </div>
      <Offers
        userToken={userToken}
        data={data.articles}
        offersTitle={offersTitle}
        show={true}
        fetchData={fetchData}
      />
    </div>
  );
};

export default Profiles;
