import axiosInstance from "../components/axiosInstance";
import { Link } from "react-router-dom";
import { useState } from "react";
import logo from "../assets/img/vinted-logo.png";
import Signup from "../components/Signup";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMessage, faUser, faBell } from "@fortawesome/free-regular-svg-icons";
import Logout from "./Logout";
import axios from "axios";
import { useHistory } from "react-router-dom";

const Header = ({ setUser, userToken, setShow, show }) => {
  const [searchInput, setSearchInput] = useState("");
  const history = useHistory();

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const response = await axiosInstance.get(
        `/api/articles/search-filter/?search=${searchInput}`
      );
      // const response = await axios.get(
      //   `http://localhost:8000/api/articles/search-filter/?search=${searchInput}`
      // );
      // Process the search results here
      const searchResults = response.data;
      history.push("/search", { searchResults, searchInput });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <header>
      <div className="wrapper">
        <Link to="/">
          <img src={logo} alt="Logo Vinted" />
        </Link>

        <form onSubmit={handleSearch}>
          <input
            type="search"
            placeholder="Search"
            className="search-bar"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
          />
        </form>

        <div>
          {userToken ? (
            <div>
              <Link to="/publish" className="btn-green">
                Sell now
              </Link>
              <Logout setUser={setUser} />

              <Link to="/notifications" className="btn-green">
                <FontAwesomeIcon icon={faBell} />
              </Link>

              <Link to="/Messages" className="btn-green">
                <FontAwesomeIcon icon={faMessage} />
              </Link>

              <Link to="/profile" className="btn-green">
                {" "}
                {/**zid zero hna fel url*/}
                <FontAwesomeIcon icon={faUser} />
              </Link>
            </div>
          ) : (
            <>
              <button
                className="btn-white"
                onClick={() => {
                  setShow(true);
                }}
              >
                Signup
              </button>
              <Signup
                onClose={() => setShow(false)}
                show={show}
                setUser={setUser}
              />
              <Link to="/login" className="btn-white">
                Login
              </Link>
              <Link to="/publish" className="btn-green">
                Sell now
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
