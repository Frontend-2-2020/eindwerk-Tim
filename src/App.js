import React, { Component, Suspense, lazy } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { getPosts, getAllPosts } from "./redux/actions/postsActions";
import { getUser } from "./redux/actions/authActions";
import { API, TOKEN } from "./API";
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
    // const getAllPosts = (pageCount) => {
    //   let allPosts = [];
    //   for (let i = 0; i < pageCount; i++) {
    //     API.get(`api/posts?page=${i}`).then((res) => {
    //       allPosts = [...allPosts, ...res.data.data];
    //       this.setState({ allPosts });
    //     });
    //   }
    // };

    this.props.getposts(1, this.props.getAllPosts);

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
    getposts: (pagenumber, getAllPosts) =>
      dispatch(getPosts(pagenumber, getAllPosts)),
    setUserData: () => dispatch(getUser()),
    getAllPosts: (pageCount) => dispatch(getAllPosts(pageCount)),
  };
};

export default connect(undefined, mapDispatchToProps)(App);
