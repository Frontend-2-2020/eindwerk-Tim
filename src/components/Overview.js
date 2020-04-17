import React, { Component } from "react";
import { connect } from "react-redux";
import Post from "./overview/Post";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import { getPosts } from "../redux/actions/postsActions";

import "./Overview.scss";
import NewPost from "./overview/NewPost";
import Pagination from "./overview/Pagination";

class Overview extends Component {
  state = { showAddPost: false, pagenumber: 1 };
  // constructor(props) {
  //   super(props);
  //   this.props.posts = [];
  // }

  componentDidUpdate(prevprops) {
    if (prevprops.user !== this.props.user) {
      this.setState({ showAddPost: false });
    }
  }
  render() {
    const postsheader = this.props.posts;
    const posts = postsheader.data;
    return (
      <div className="overviewContainer container-fluid">
        <div className="container">
          <div className="postsHeader">
            <div className="row">
              <div className="col">
                <Pagination
                  currentPage={this.props.posts.current_page}
                  pageCount={this.props.posts.last_page}
                  newPageHandler={(pageNumber) =>
                    this.props.getPosts(pageNumber)
                  }
                ></Pagination>
              </div>
              <div className="searchbar col"></div>
              <div className="addIcon col">
                {this.props.user.user !== undefined ? (
                  <div
                    className="addPost"
                    alt="post toevoegen"
                    onClick={() =>
                      this.setState({ showAddPost: !this.state.showAddPost })
                    }
                  >
                    <FontAwesomeIcon
                      icon={faPlusCircle}
                      className="float-right"
                    ></FontAwesomeIcon>
                  </div>
                ) : (
                  ""
                )}
              </div>
            </div>
          </div>
          <div className="addPost">
            {this.state.showAddPost ? <NewPost></NewPost> : ""}
          </div>
          {posts &&
            posts.map((post) => <Post key={post.id} post={post}></Post>)}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return { posts: state.posts, user: state.auth };
};
const mapDispatchToProps = (dispatch) => {
  return { getPosts: (pagenumber) => dispatch(getPosts(pagenumber)) };
};

export default connect(mapStateToProps, mapDispatchToProps)(Overview);
