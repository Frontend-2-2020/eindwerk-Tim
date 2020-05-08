import React, { Component, Suspense, lazy } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { getPosts } from "./redux/actions/postsActions";
import { getUser } from "./redux/actions/authActions";
import { TOKEN } from "./API";
import { connect } from "react-redux";

// import Navbar from "./components/Navbar";
// import LoginForm from "./components/LoginForm";
// import RegisterFrom from "./components/RegisterForm";
// import Overview from "./components/overview/Overview";
// import PostDetail from "./components/postDetail/PostDetail";
// import User from "./components/user/User";

import "bootstrap/dist/css/bootstrap.min.css";
import "./App.scss";
import Spinner from "./components/Spinner";
import Sandbox from "./Sandbox";

const Navbar = lazy(() => import("./components/Navbar"));
const LoginForm = lazy(() => import("./components/LoginForm"));
const RegisterFrom = lazy(() => import("./components/RegisterForm"));
const Overview = lazy(() => import("./components/overview/Overview"));
const PostDetail = lazy(() => import("./components/postDetail/PostDetail"));
const User = lazy(() => import("./components/user/User"));

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
          <Suspense
            fallback={
              <div className="loadingPage">
                <Spinner></Spinner>
              </div>
            }
          >
            <Navbar></Navbar>
            <Switch>
              <Route path="/register" component={RegisterFrom} />
              <Route path="/login" component={LoginForm} />
              <Route path="/sandbox" component={Sandbox} />
              <Route path="/post/:postId" component={PostDetail} />
              <Route path="/user/:userId" component={User} />
              <Route path="/" component={Overview} exact />
              <Route Path="/">
                <h1>404</h1>
              </Route>
            </Switch>
          </Suspense>
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
