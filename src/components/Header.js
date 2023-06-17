import { Link } from "react-router-dom";
import logo from "../assets/img/vinted-logo.png";
import Signup from "../components/Signup";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMessage, faUser, faBell } from "@fortawesome/free-regular-svg-icons";
//import "./Header.css";

const Header = ({ setUser, userToken, setShow, show }) => {
  return (
    <header>
      <div className="wrapper">
        <Link to="/">
          <img src={logo} alt="Logo Vinted" />
        </Link>

        <input
          type="search"
          placeholder="Rechercher des articles"
          className="search-bar"
        />
        <div>
          {userToken ? (
            <div>
              <button
                className="btn-disco"
                onClick={() => {
                  setUser(null);
                }}
              >
                Se déconnecter
              </button>

              <Link to="/notifications" className="btn-green">
                <FontAwesomeIcon icon={faBell} />
              </Link>

              <Link to="/Messages" className="btn-green">
                <FontAwesomeIcon icon={faMessage} />
              </Link>

              <Link to="/profile" className="btn-green">
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
                S'inscrire
              </button>
              <Signup
                onClose={() => setShow(false)}
                show={show}
                setUser={setUser}
              />
              <Link to="/login" className="btn-white">
                Se connecter
              </Link>
            </>
          )}
          <Link to="/publish" className="btn-green">
            Vends tes articles
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
