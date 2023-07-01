import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";

const Login = (props) => {
  const { setUser, setShow } = props;
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const history = useHistory();
  const [modal, setModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Create a cancellation token source
    const cancelTokenSource = axios.CancelToken.source();

    return () => {
      // Cancel the ongoing request when the component is unmounted
      cancelTokenSource.cancel();
    };
  }, []);

  const handleUsername = (event) => {
    const result = event.target.value;
    setUsername(result);
  };

  const handlePassword = (event) => {
    const result = event.target.value;
    setPassword(result);
  };

  const fetchArticlesData = async (userToken) => {
    try {
      const response = await axios.get("http://127.0.0.1:8000/api/articles", {
        headers: {
          Authorization: `Token ${userToken}`,
        },
      });
      // Process the articles data here
      // ...
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      setIsLoading(true);
      const response = await axios.post(
        "http://127.0.0.1:8000/api/dj-rest-auth/login/",
        {
          username: username,
          password: password,
        },
        {
          // Pass the cancellation token to the request
          cancelToken: axios.CancelToken.source().token,
        }
      );

      if (response.data.key) {
        const key = response.data.key;
        setUser(key);
        localStorage.setItem("authToken", key);
        fetchArticlesData(key); // Fetch articles data using the updated user token
        history.push("/publish");
        return;
      }
      setIsLoading(false);
    } catch (error) {
      if (axios.isCancel(error)) {
        // Request was cancelled, component is unmounted
        return;
      }

      if (error.response) {
        setErrorMessage("⛔️ Invalid email and/or password.");
        setIsLoading(false);
      }
    }
  };

  return (
    <main className="login-form">
      <div className="login-form wrapper">
        <h2>Login</h2>
        <form className="login-form" onSubmit={handleSubmit}>
          <input type="text" placeholder="Username" onChange={handleUsername} />
          <input
            type="password"
            placeholder="Password"
            onChange={handlePassword}
          />

          <input
            type="submit"
            value={isLoading ? "Loading..." : "Login"}
            className="submit btn-green"
            disabled={isLoading}
          />
          <span>{errorMessage}</span>
          <span
            className="redir-signup"
            onClick={() => {
              setModal(true);
              setShow(true);
            }}
          >
            No account yet? Sign up!
          </span>
        </form>
      </div>
    </main>
  );
};

export default Login;
