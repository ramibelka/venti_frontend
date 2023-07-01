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
import Notifications from "./containers/Notifications";
import Category from "./containers/Category";
import Profiles from "./containers/Profiles";
import Saved from "./components/Saved";
import Edit from "./containers/Edit";

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
        <Route path="/category/:category">
          <Category userToken={userToken} />
        </Route>
        <Route path="/publish">
          {userToken ? (
            <Publish userToken={userToken} setUserToken={setUserToken} />
          ) : (
            <Redirect to="/login" />
          )}
        </Route>
        <Route path="/messages">
          {userToken ? <Messages /> : <Redirect to="/login" />}
        </Route>
        <Route path="/notifications">
          {userToken ? (
            <Notifications userToken={userToken} />
          ) : (
            <Redirect to="/login" />
          )}
        </Route>
        <Route exact path="/">
          <Home userToken={userToken} />
        </Route>
        <Route path="/search">
          <Search userToken={userToken} />
        </Route>
        <Route path="/profile">
          {userToken ? (
            <ProfilePage userToken={userToken} />
          ) : (
            <Redirect to="/login" />
          )}
        </Route>
        <Route path="/profiles/:id">
          <Profiles userToken={userToken} />
        </Route>
        <Route path="/saved">
          <Saved userToken={userToken} />
        </Route>
        <Route path="/edit/:articleId">
          {userToken ? (
            <Edit userToken={userToken} setUserToken={setUserToken} />
          ) : (
            <Redirect to="/login" />
          )}
        </Route>
        <Route path="*">
          <NoMatch />
        </Route>
      </Switch>
      <Footer />
    </Router>
  );
}

export default App;
