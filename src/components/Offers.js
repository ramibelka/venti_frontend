import { Link } from "react-router-dom";
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

const Offers = ({ data }) => {
  const [isLiked, setIsLiked] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  const handleLike = () => {
    setIsLiked(!isLiked);
  };

  const handleSave = () => {
    setIsSaved(!isSaved);
  };

  return (
    <main className="wrapper">
      <div className="offers">
        {data.map((elem) => (
          <div key={elem.id} className="wrap-card">
            <div className="offer-card">
              <div className="avatar-card">
                {elem.photo ? (
                  <img src={elem.photo} alt="/" className="avatar-card" />
                ) : null}
                <span>{elem.auteur}</span>
              </div>

              <Link to={`/offer/${elem.id}`} className="post-card">
                <img src={elem.photo} alt="/" className="product-card" />
              </Link>

              <div className="icons-container">
                <FontAwesomeIcon
                  icon={isLiked ? fasHeart : farHeart}
                  className={`icon ${isLiked ? "liked" : ""}`}
                  onClick={handleLike}
                />
                <FontAwesomeIcon icon={faComment} className="icon" />
                <FontAwesomeIcon
                  icon={isSaved ? fasBookmark : farBookmark}
                  className={`icon ${isSaved ? "saved" : ""}`}
                  onClick={handleSave}
                />
              </div>

              <div className="post-info">
                <p>{elem.prix} DZD</p>
                <>
                  <p>{elem.description}</p>
                </>
                <>
                  <p>{elem.description}</p>
                </>
                <>
                  <p>{elem.disponibilite}</p>
                </>
                <>
                  <p>{elem.Etat}</p>
                </>
              </div>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
};

export default Offers;
