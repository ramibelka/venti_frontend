import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Offers from "../components/Offers";
import profileImage from "../assets/img/default-profile-pic.jpg";
import "./ProfilePage.css";

import { library } from "@fortawesome/fontawesome-svg-core";
import { faSpinner, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
library.add(faSpinner, faPlus);

const ProfilePages = ({ userToken }) => {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [isFollowing, setIsFollowing] = useState(false);
  const offersTitle = "";
  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        axios.defaults.withCredentials = true;
        const response = await axios.get(
          `http://127.0.0.1:8000/api/profiles/${id}`
        );
        const { is_following, ...profileData } = response.data;
        setData(profileData);
        setIsFollowing(is_following);
        setIsLoading(false);
      } catch (e) {
        console.log(e.message);
      }
    };
    fetchData();
  }, []);

  const handleFollow = async () => {
    try {
      const endpoint = `http://127.0.0.1:8000/api/profiles/${id}/abonner/`;
      const method = "POST";
      await axios({
        method,
        url: endpoint,
        headers: {
          Authorization: "Token " + userToken,
        },
      });
      setIsFollowing(!isFollowing);
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
        <div className="profile-avatar">
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
          {userToken && (
            <button className="follow-button" onClick={handleFollow}>
              {isFollowing ? "Unfollow" : "Follow"}
            </button>
          )}
        </div>
      </div>
      <Offers data={data.articles} offersTitle={offersTitle} show={true} />
    </div>
  );
};

export default ProfilePages;
