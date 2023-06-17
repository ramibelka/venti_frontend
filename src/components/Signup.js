import { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";
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
  const [errorMessage, setErrorMessage] = useState("");

  const history = useHistory();

  if (!show) {
    return null;
  }

  const handleNom = (event) => {
    const result = event.target.value;
    setNom(result);
  };

  const handlePrenom = (event) => {
    const result = event.target.value;
    setPrenom(result);
  };

  const handleUsername = (event) => {
    const result = event.target.value;
    setUsername(result);
  };

  const handleEmail = (event) => {
    const result = event.target.value;
    setEmail(result);
  };

  const handlePassword = (event) => {
    const result = event.target.value;
    setPassword(result);
  };

  const handleBirthDate = (event) => {
    const result = event.target.value;
    setBirthDate(result);
  };

  const handleLocation = (event) => {
    const result = event.target.value;
    setLocation(result);
  };

  const handlePhoneNum = (event) => {
    const result = event.target.value;
    setPhoneNum(result);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const fetchData = async () => {
      try {
        const response = await axios.post("http://127.0.0.1:8000/api/signup/", {
          username: username,
          nom: nom,
          prenom: prenom,
          adr_email: email,
          password: password,
          date_de_naissance: birthDate,
          localisation: location,
          numero_de_tel: phoneNum,
        });
        if (response.data.token) {
          const token = response.data.token;
          setUser(token, response.data._id);
          history.push("/");
        } else {
          setErrorMessage("une erreur est survenue");
        }
      } catch (error) {
        if (error.response.status === 409) {
          setErrorMessage("🤭 Cet email existe déjà.");
        }
      }
    };
    fetchData();
  };

  return (
    <div className="modal" onClick={props.onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2 className="modal-title">S'inscrire</h2>
        </div>
        <div className="modal-body">
          <form onSubmit={handleSubmit}>
            <div className="input-form">
              <input
                type="text"
                placeholder="Username"
                onChange={handleUsername}
              />
              <input type="text" placeholder="Nom" onChange={handleNom} />
              <input type="text" placeholder="Prenom" onChange={handlePrenom} />
              <input type="email" placeholder="Email" onChange={handleEmail} />
              <input
                type="password"
                placeholder="Mot de passe"
                onChange={handlePassword}
              />
              <input
                type="date"
                placeholder="Location"
                onChange={handleBirthDate}
              />
              <input
                type="text"
                placeholder="Location"
                onChange={handleLocation}
              />
              <input
                type="text"
                placeholder="Phone number"
                onChange={handlePhoneNum}
              />
            </div>

            <input
              type="submit"
              value="S'inscrire"
              className="btn-green"
              onClick={props.onSubmit}
            />
            <span>{errorMessage}</span>
            <Link to="/login" onClick={props.onClose}>
              Tu as déjà un compte ? Connecte-toi !
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
