import { Link } from "react-router-dom";
//import "./Offers.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHeart as farHeart,
  faComment,
  faBookmark as farBookmark
} from "@fortawesome/free-regular-svg-icons";
import {
  faHeart as fasHeart,
  faBookmark as fasBookmark
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
        {data.offers.map((elem) => (
          <div key={elem._id} className="wrap-card">
            <div className="offer-card">
              <div className="avatar-card">
                {elem.owner.account.avatar ? (
                  <img
                    src={elem.owner.account.avatar.secure_url}
                    alt="/"
                    className="avatar-card"
                  />
                ) : null}
                <span>{elem.owner.account.username}</span>
              </div>

              <Link to={`/offer/${elem._id}`} className="post-card">
                <img
                  key={elem.product_image.asset_id}
                  src={elem.product_image.secure_url}
                  alt="/"
                  className="product-card"
                />
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
                <p>{elem.product_price} €</p>
                <>
                  {elem.product_details.map((elem, index) => {
                    return elem.TAILLE ? (
                      <p key={index}>{elem.TAILLE}</p>
                    ) : null;
                  })}
                </>
                <>
                  {elem.product_details.map((elem, index) => {
                    return elem.MARQUE ? (
                      <p key={index}>{elem.MARQUE}</p>
                    ) : null;
                  })}
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
