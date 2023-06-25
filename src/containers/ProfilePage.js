import { useState, useEffect } from "react";
import axios from "axios";
import Offers from "../components/Offers";
import profileImage from "../assets/img/profile-image.jpg";
import "./ProfilePage.css";

import { library } from "@fortawesome/fontawesome-svg-core";
import { faSpinner, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
library.add(faSpinner, faPlus);

const ProfilePages = () => {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const offersTitle = "";

  // My Api : https://vinted--le-reacteur.herokuapp.com/offers
  // Le Reacteur API : https://lereacteur-vinted-api.herokuapp.com/offers

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          //"https://lereacteur-vinted-api.herokuapp.com/offers"
          "http://127.0.0.1:8000/api/articles/"
        );

        setData(response.data);
        setIsLoading(false);
      } catch (e) {
        console.log(e.message);
      }
    };
    fetchData();
  }, []);

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
          <img src={profileImage} alt="Profile Avatar" />
        </div>
        <div className="profile-info">
          <h2 className="profile-username">Username</h2>
          <p className="profile-bio">Bio</p>
          <ul className="profile-stats">
            <li>
              <span className="profile-stat-count">100</span> posts
            </li>
            <li>
              <span className="profile-stat-count">10k</span> followers
            </li>
            <li>
              <span className="profile-stat-count">500</span> following
            </li>
          </ul>
        </div>
      </div>
      <Offers data={data} offersTitle={offersTitle} />
    </div>
  );
};
export default ProfilePages;
