import React, { Fragment, useEffect } from 'react';
import { BrowserRouter as Router } from "react-router-dom";
import { Route, Switch } from "react-router";
import { Provider } from "react-redux";
import store from "./store";
import PrivateRoute from "./components/routes/PrivateRoute";
import setAuthTokenHeader from "./utils/setAuthTokenHeader";
import { doLoadUserWithErrorCheck } from "./thunks/register";
import Navbar from "./components/layout/Navbar";
import Landing from "./components/layout/Landing";
import SignUp from "./components/auth/SignUp";
import Login from "./components/auth/Login";
import Notifications from "./components/layout/Notifications";
import Dashboard from "./components/dashboard/Dashboard";
import CreateProfile from "./components/Forms/Profile/CreateProfile";
import EditProfile from "./components/Forms/Profile/EditProfile";
import AddExperience from "./components/Forms/Profile/AddExprience";
import AddEducation from "./components/Forms/Profile/AddEducation";
import Profiles from "./components/profiles/Profiles";
import Profile from "./components/profile/Profile";
import Posts from "./components/posts/Posts";
import Post from "./components/posts/Post";
import './App.css';

if (localStorage.token) {
  setAuthTokenHeader(localStorage.token);
}

const App = () => {
  useEffect(() => {
    store.dispatch(doLoadUserWithErrorCheck());
  }, []); // Used useEffect() hooks in place of the componentDidMount() lifecycle method

  return (
    <Provider store = {store}>
      <Router>
        <Fragment>
          <Navbar />
          <Route exact path = "/" component = { Landing } />
          <section className = "container">
            <Notifications />
            <Switch>
              <Route exact path = "/signup" component = { SignUp } />
              <Route exact path = "/login" component = { Login } />
              <Route exact path = "/profiles" component = { Profiles } />
              <Route exact path = "/profile/find/:id" component = { Profile } />
              <PrivateRoute exact path = "/dashboard" component = { Dashboard }/>
              <PrivateRoute exact path = "/profile/create" component = { CreateProfile } />
              <PrivateRoute exact path = "/profile/edit" component = { EditProfile } />
              <PrivateRoute exact path = "/experience/add" component = { AddExperience } />
              <PrivateRoute exact path = "/education/add" component = { AddEducation } />
              <PrivateRoute exact path = "/posts" component = { Posts } />
              <PrivateRoute exact path = "/posts/:id" component = { Post } />
            </Switch>
          </section>
        </Fragment>
      </Router>
    </Provider>
  )
}

export default App;
