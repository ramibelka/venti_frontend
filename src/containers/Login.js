import { useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
//import "./Login.css";

const Login = (props) => {
  const { setUser, setShow } = props;

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [modal, setModal] = useState(false);

  const history = useHistory();

  const handleUsername = (event) => {
    const result = event.target.value;
    setUsername(result);
  };
  const handlePassword = (event) => {
    const result = event.target.value;
    setPassword(result);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const fetchData = async () => {
      try {
        const response = await axios.post(
          "http://127.0.0.1:8000/api-auth/login/",

          {
            username: username,
            password: password,
          }
        );
        console.log(response.data.token);
        if (response.data.token) {
          const token = response.data.token;
          setUser(token, response.data.id);

          history.push("/publish"); // user can enter - redirect to home page
        }
      } catch (error) {
        if (error.response && error.response.status === 403) {
          setErrorMessage("⛔️ Mauvais email et/ou mot de passe.");
        }
      }
    };
    fetchData();
  };

  return (
    <main className="login-form">
      <div className="login-form wrapper">
        <h2>Se connecter</h2>
        <form className="login-form" onSubmit={handleSubmit}>
          <input
            type=""
            placeholder="Adresse email"
            onChange={handleUsername}
          />
          <input
            type="password"
            placeholder="Mot de passe"
            onChange={handlePassword}
          />
          <input type="submit" value="Se connecter" className="btn-green" />
          <span>{errorMessage}</span>
          <span
            className="redir-signup"
            onClick={() => {
              setModal(true);
              setShow(true);
            }}
          >
            Pas encore de compte ? Inscrit toi !
          </span>
        </form>
      </div>
    </main>
  );
};

export default Login;
