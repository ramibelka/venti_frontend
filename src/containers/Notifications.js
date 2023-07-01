import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./Notifications.css";

const Notifications = ({ userToken }) => {
  const [notifications, setNotifications] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchNotifications = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(
          "http://127.0.0.1:8000/api/notifications/",
          {
            headers: {
              Authorization: "Token " + userToken,
              "Content-Type": "multipart/form-data",
            },
          }
        );
        setNotifications(response.data);
      } catch (error) {
        setError(error.message);
      }
      setIsLoading(false);
    };

    fetchNotifications();
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="notifications">
      <h2>Notifications</h2>
      {notifications.length === 0 ? (
        <div>No notifications found.</div>
      ) : (
        <ul>
          {notifications.map((notification) => (
            <li key={notification.id}>
              <Link to={`/offer/${notification.article_id}`}>
                <div>{notification.contenu}</div>
                <div>Date & Time: {notification.date_et_heure}</div>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Notifications;
