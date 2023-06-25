import { useEffect } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";

const Logout = ({ setUser }) => {
  // Destructure setUser prop correctly
  const history = useHistory();

  useEffect(() => {
    const logout = async () => {
      try {
        await axios.post("http://127.0.0.1:8000/api/dj-rest-auth/logout/");
        // Clear authentication token from storage
        localStorage.removeItem("authToken");

        history.push("/login"); // Redirect to login page
      } catch (error) {
        // Handle logout error
        console.log(error);
      }
    };

    logout();
  }, []);

  return (
    <button
      className="btn-disco"
      onClick={() => {
        setUser(null);
      }}
    >
      Logout
    </button>
  );
};

export default Logout;
