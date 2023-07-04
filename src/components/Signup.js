import axiosInstance from "../components/axiosInstance";
import { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
//import "./Signup.css"

const Signup = (props) => {
  const { setUser, show } = props;

  const [nom, setNom] = useState("");
  const [prenom, setPrenom] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [location, setLocation] = useState("");
  const [phoneNum, setPhoneNum] = useState("");
  const [picture, setPicture] = useState();
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const history = useHistory();

  if (!show) {
    return null;
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      setIsLoading(true);
      const formData = new FormData();
      formData.append("nom", nom);
      formData.append("prenom", prenom);
      formData.append("username", username);
      formData.append("adr_email", email);
      formData.append("password", password);
      formData.append("date_de_naissance", birthDate);
      formData.append("localisation", location);
      formData.append("numero_de_tel", phoneNum);
      formData.append("photo_de_profile", picture);
      const response = await axiosInstance.post("/api/signup/", formData);
      // const response = await axios.post(
      //   "http://127.0.0.1:8000/api/signup/",
      //   formData
      // );
      if (response.data.token) {
        const token = response.data.token;
        setUser(token, response.data._id);
        history.push("/");
      } else {
        setErrorMessage("une erreur est survenue");
      }
      setIsLoading(false);
    } catch (error) {
      if (error.response.status === 409) {
        setErrorMessage("🤭 Cet email existe déjà.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="modal" onClick={props.onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2 className="modal-title">Signup</h2>
        </div>
        <div className="modal-body">
          <form onSubmit={handleSubmit}>
            <div className="input-form">
              <input
                type="text"
                placeholder="Username"
                onChange={(event) => {
                  setUsername(event.target.value);
                }}
              />{" "}
              <span>MUST BE UNIQUE</span>
              <input
                type="text"
                placeholder="Nom"
                onChange={(event) => {
                  setNom(event.target.value);
                }}
              />
              <input
                type="text"
                placeholder="Prenom"
                onChange={(event) => {
                  setPrenom(event.target.value);
                }}
              />
              <input
                type="email"
                placeholder="Email"
                onChange={(event) => {
                  setEmail(event.target.value);
                }}
              />
              <input
                type="password"
                placeholder="Mot de passe"
                onChange={(event) => {
                  setPassword(event.target.value);
                }}
              />
              <input
                type="date"
                placeholder="Location"
                onChange={(event) => {
                  setBirthDate(event.target.value);
                }}
              />
              <input
                type="text"
                placeholder="Location"
                onChange={(event) => {
                  setLocation(event.target.value);
                }}
              />
              <input
                type="text"
                placeholder="Phone number"
                onChange={(event) => {
                  setPhoneNum(event.target.value);
                }}
              />
              <div>
                <label htmlFor="file" className="upload-file">
                  <FontAwesomeIcon icon={faUser} />
                  Add profile picture
                </label>
                <input
                  type="file"
                  id="file"
                  onChange={(event) => {
                    setPicture(event.target.files[0]);
                  }}
                />
              </div>
            </div>

            <input
              type="submit"
              value={isLoading ? "Loading..." : "Signup"}
              className={"btn-green"}
              disabled={isLoading}
            />
            <span>{errorMessage}</span>
            <Link to="/login" onClick={props.onClose}>
              Already have an account? Log in!
            </Link>
          </form>
        </div>
        <div className="modal-footer">
          <button className="close" onClick={props.onClose}>
            Fermer
          </button>
        </div>
      </div>
    </div>
  );
};

export default Signup;
