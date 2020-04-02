import React, { Component } from "react";
import LoginForm from "./components/LoginForm";
import RegisterFrom from "./components/RegisterForm";
import Overview from "./components/Overview";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Navbar from "./components/Navbar";

import "bootstrap/dist/css/bootstrap.min.css";

export default class App extends Component {
  render() {
    return (
      <div>
        <Router>
          <Navbar></Navbar>
          <Switch>
            <Route path="/register" component={RegisterFrom} />
            <Route path="/login" component={LoginForm} />
            <Route path="/" component={Overview} exact />
            <Route Path="/">
              <h1>404</h1>
            </Route>
          </Switch>
        </Router>
      </div>
    );
  }
}
