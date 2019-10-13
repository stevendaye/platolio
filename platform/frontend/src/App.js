import React, { Fragment, useEffect } from 'react';
import { BrowserRouter as Router } from "react-router-dom";
import { Route, Switch } from "react-router";
import Routes from "./components/routes/routes";
import { Provider } from "react-redux";
import store from "./store";
import setAuthTokenHeader from "./utils/setAuthTokenHeader";
import { doLoadUserWithErrorCheck } from "./thunks/register";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import Landing from "./components/layout/Landing";
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
          <div className = "main">
            <Navbar />
            <Switch>
              <Route exact path = "/" component = { Landing } />
              <Route component = { Routes } />
            </Switch>
            <Footer />
          </div>
        </Fragment>
      </Router>
    </Provider>
  );
}

export default App;
