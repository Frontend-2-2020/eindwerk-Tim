import React, { Component, Suspense, lazy } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { getPosts, getAllPosts } from "./redux/actions/postsActions";
import { getUser } from "./redux/actions/authActions";
import { TOKEN } from "./API";
import { connect } from "react-redux";
import Navbar from "./components/Navbar";

import "bootstrap/dist/css/bootstrap.min.css";
import "nes.css/css/nes.min.css";
import "./App.scss";
import Spinner from "./components/Spinner";
import Sandbox from "./Sandbox";

// const Navbar = lazy(() => import("./components/Navbar"));
const LoginForm = lazy(() => import("./components/LoginForm"));
const RegisterFrom = lazy(() => import("./components/RegisterForm"));
const Overview = lazy(() => import("./components/overview/Overview"));
const PostDetail = lazy(() => import("./components/postDetail/PostDetail"));
const User = lazy(() => import("./components/user/User"));

class App extends Component {
  state = { allPosts: [] };
  componentDidMount() {
    // Posts van pagina 1 ophalen
    // dmv parameter "app" ook alle posts ophalen, voor zoekfunctie
    this.props.getposts(1, "app", this.props.getAllPosts);

    if (TOKEN) {
      this.props.setUserData();
    }
  }

  render() {
    return (
      <div>
        <Router>
          <Navbar></Navbar>
          <Suspense
            fallback={
              <div className="loadingPage">
                <Spinner></Spinner>
              </div>
            }
          >
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
    getposts: (pagenumber, source, getAllPosts) =>
      dispatch(getPosts(pagenumber, source, getAllPosts)),
    setUserData: () => dispatch(getUser()),
    getAllPosts: (pageCount) => dispatch(getAllPosts(pageCount)),
  };
};

export default connect(undefined, mapDispatchToProps)(App);
