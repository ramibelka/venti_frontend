import React from "react";
import { Link } from "react-router-dom";
import "./ProfilePage.css";
import post1 from "../assets/img/post1.jpg";
import post2 from "../assets/img/post2.jpg";
import post3 from "../assets/img/post3.jpg";
import profileImage from "../assets/img/profile-image.jpg";

const ProfilePage = () => {
  const posts = [
    {
      id: 1,
      imageUrl: post1,
    },
    {
      id: 2,
      imageUrl: post2,
    },
    {
      id: 3,
      imageUrl: post3,
    },
  ];

  return (
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
      <div className="profile-posts">
        {posts.map((post) => (
          <div key={post.id} className="profile-post">
            <img src={post.imageUrl} alt="Post" />
          </div>
        ))}
      </div>
      <div className="profile-actions">
        <Link to="/edit-profile">Edit Profile</Link>
        {/* Add other profile actions (e.g., settings, logout) */}
      </div>
    </div>
  );
};

export default ProfilePage;
