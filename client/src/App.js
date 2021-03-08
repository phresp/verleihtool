import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import jwt_decode from "jwt-decode";
import setAuthToken from "./components/common/setAuthToken";
import { logoutUser, setCurrentUser } from "./actions/authActions";

import { Provider } from "react-redux";
import store from "./store";

import PrivateRoute from "./components/common/PrivateRoute";
import ScrollToTop from "./components/common/ScrollToTop";

import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import Landing from "./components/layout/Landing";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import Dashboard from "./components/dashboard/Dashboard";
import CreateRental from "./components/create-rental/CreateRental";
import ViewRental from "./components/view-rental/ViewRental";
import Rentalstats from "./components/stats/Rentalstats";
import RentalstatsConfig from "./components/stats/RentalstatsConfig";

import "./App.css";

// Check for token
if (localStorage.jwtToken) {
  // Set auth token header auth
  setAuthToken(localStorage.jwtToken);
  //Decode Token and get user info and exp
  const decoded = jwt_decode(localStorage.jwtToken);
  //Set user and is authenticated
  store.dispatch(setCurrentUser(decoded));
  //Check for expired token
  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
    //Logout user
    store.dispatch(logoutUser());
    // Redirect to login
    window.location.href = "/login";
  }
}

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="App">
            <Navbar />
            <Route exact path="/" component={Landing} />
            <div className="container-fluid">
              <Route exact path="/register" component={Register} />
              <Route exact path="/login" component={Login} />
              <Switch>
                <PrivateRoute exact path="/dashboard" component={Dashboard} />
              </Switch>
              <Switch>
                <PrivateRoute
                  exact
                  path="/new-rental"
                  component={CreateRental}
                />
              </Switch>
              <Switch>
                <PrivateRoute
                  exact
                  path="/rentalstats"
                  component={Rentalstats}
                />
              </Switch>
              <Switch>
                <PrivateRoute
                  exact
                  path="/rentalstats-config"
                  component={RentalstatsConfig}
                />
              </Switch>
              <ScrollToTop>
                <Switch>
                  <PrivateRoute
                    exact
                    path="/rental/:id"
                    component={ViewRental}
                  />
                </Switch>
              </ScrollToTop>
            </div>
            <Footer />
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
