import axiosInstance from "../components/axiosInstance";
import { useHistory } from "react-router-dom";
import axios from "axios";

const Logout = ({ setUser }) => {
  // Destructure setUser prop correctly
  const history = useHistory();

  const handleLogout = async () => {
    setUser(null);
    try {
      await axiosInstance.post("/api/dj-rest-auth/logout/");
      //await axios.post("http://127.0.0.1:8000/api/dj-rest-auth/logout/");
      // Clear authentication token from storage
      localStorage.removeItem("authToken");

      history.push("/login"); // Redirect to login page
    } catch (error) {
      // Handle logout error
      console.log(error);
    }
  };

  return (
    <button className="btn-disco" onClick={handleLogout}>
      Logout
    </button>
  );
};

export default Logout;
