import React, { Component } from "react";
import { connect } from "react-redux";
import Post from "./overview/Post";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";

import "./Overview.scss";
import NewPost from "./overview/NewPost";

class Overview extends Component {
  state = { showAddPost: false };
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
    const posts = this.props.posts.data;
    return (
      <div className="overviewContainer container-fluid">
        <div className="container">
          <div className="postsHeader">
            <div className="row">
              <div className="col-2"></div>
              <div className="searchbar col-8"></div>
              <div
                className="addIcon col-2"
                onClick={() =>
                  this.setState({ showAddPost: !this.state.showAddPost })
                }
              >
                {this.props.user.user !== undefined ? (
                  <FontAwesomeIcon
                    icon={faPlusCircle}
                    className="float-right"
                  ></FontAwesomeIcon>
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

export default connect(mapStateToProps)(Overview);
