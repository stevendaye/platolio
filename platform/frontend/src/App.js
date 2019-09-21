import React, { Fragment, useEffect } from 'react';
import { BrowserRouter as Router } from "react-router-dom";
import { Route, Switch } from "react-router";
import { Provider } from "react-redux";
import ConnectedNavbar from "./components/layout/Navbar";
import Landing from "./components/layout/Landing";
import ConnectedSignUp from "./components/auth/SignUp";
import ConnectedLogin from "./components/auth/Login";
import ConnectedNotifications from "./components/layout/Notifications";
import store from "./store";
import setAuthTokenHeader from "./utils/setAuthTokenHeader";
import { doLoadUserWithErrorCheck } from "./thunks/register";
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
          <ConnectedNavbar />
          <Route exact path="/" component={ Landing } />
          <section className="container">
            <ConnectedNotifications />
            <Switch>
              <Route exact path="/signup" component={ ConnectedSignUp } />
              <Route exact path="/login" component={ ConnectedLogin } />
            </Switch>
          </section>
        </Fragment>
      </Router>
    </Provider>
  )
}

export default App;
