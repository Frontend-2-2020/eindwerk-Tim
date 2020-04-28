import React, { Component } from "react";
import LoginForm from "./components/LoginForm";
import RegisterFrom from "./components/RegisterForm";
import Overview from "./components/overview/Overview";
import PostDetail from "./components/postDetail/PostDetail";
import User from "./components/user/User";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import { getPosts } from "./redux/actions/postsActions";
import { getUser } from "./redux/actions/authActions";
import { TOKEN } from "./API";

import "bootstrap/dist/css/bootstrap.min.css";
import "./App.scss";

import { connect } from "react-redux";

class App extends Component {
  componentDidMount() {
    this.props.getposts(1);

    if (TOKEN) {
      this.props.setUserData();
    }
  }
  render() {
    return (
      <div>
        <Router>
          <Navbar></Navbar>
          <Switch>
            <Route path="/register" component={RegisterFrom} />
            <Route path="/login" component={LoginForm} />
            <Route path="/post/:postId" component={PostDetail} />
            <Route path="/user/:userId" component={User} />
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

const mapDispatchToProps = (dispatch) => {
  return {
    getposts: (pagenumber) => dispatch(getPosts(pagenumber)),
    setUserData: () => dispatch(getUser()),
  };
};

export default connect(undefined, mapDispatchToProps)(App);
