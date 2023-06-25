import "./App.css";
import { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import Cookies from "js-cookie";

import Home from "./containers/Home";
import Login from "./containers/Login";
import Offer from "./containers/Offer";
import Publish from "./containers/Publish";
import NoMatch from "./containers/NoMatch";
import Header from "./components/Header";
import Signup from "./components/Signup";
import Footer from "./components/Footer";
import CategoriesPanel from "./components/CategoriesPanel";
import Messages from "./containers/Messages";
import ProfilePage from "./containers/ProfilePage";
import Search from "./containers/Search";

function App() {
  const [userToken, setUserToken] = useState(null);
  const [show, setShow] = useState(false);

  useEffect(() => {
    const token = Cookies.get("token");
    const userId = Cookies.get("userId");
    if (token && userId) {
      setUserToken(token);
    }
  }, []);

  const setUser = (token, id) => {
    if (token) {
      Cookies.set("token", token, { expires: 7 });
      Cookies.set("userId", id);
      setUserToken(token);
    } else {
      Cookies.remove("token");
      Cookies.remove("userId");
      setUserToken(null);
    }
  };

  return (
    <Router>
      <Header
        setUser={setUser}
        userToken={userToken}
        setShow={setShow}
        show={show}
      />
      <Signup setUser={setUser} />
      <CategoriesPanel />
      <Switch>
        <Route path="/login">
          <Login setUser={setUser} setShow={setShow} />
        </Route>
        <Route path="/offer/:id">
          <Offer userToken={userToken} setUser={setUser} />
        </Route>
        <Route path="/publish">
          {userToken ? (
            <Publish userToken={userToken} setUserToken={setUserToken} />
          ) : (
            <Redirect to="/login" />
          )}
        </Route>
        <Route path="/messages">
          <Messages />
        </Route>
        <Route exact path="/">
          <Home userToken={userToken} />
        </Route>
        <Route path="/search" component={Search} />
        <Route path="/profile" component={ProfilePage} />
        <Route path="*">
          <NoMatch />
        </Route>
      </Switch>
      <Footer />
    </Router>
  );
}

export default App;
