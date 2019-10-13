import React from "react";
import { Route, Switch } from "react-router";
import PrivateRoute from "../routes/PrivateRoute";
import NotFound from "../layout/NotFound";
import SignUp from "../auth/SignUp";
import Login from "../auth/Login";
import Notifications from "../layout/Notifications";
import Dashboard from "../dashboard/Dashboard";
import CreateProfile from "../Forms/Profile/CreateProfile";
import EditProfile from "../Forms/Profile/EditProfile";
import AddExperience from "../Forms/Profile/AddExprience";
import AddEducation from "../Forms/Profile/AddEducation";
import Profiles from "../profiles/Profiles";
import Profile from "../profile/Profile";
import Posts from "../posts/Posts";
import Post from "../posts/Post";

const Routes = () => {
  return (
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
        <Route component = { NotFound } />
      </Switch>
    </section>
  );
};

export default Routes;
