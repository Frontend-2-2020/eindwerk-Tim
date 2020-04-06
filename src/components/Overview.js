import React, { Component } from "react";
import { connect } from "react-redux";
import Post from "./overview/Post";

import "./Overview.scss";

class Overview extends Component {
  // constructor(props) {
  //   super(props);
  //   this.props.posts = [];
  // }
  render() {
    const posts = this.props.posts.data;
    return (
      <div className="overviewContainer container-fluid">
        {posts && posts.map((post) => <Post key={post.id} post={post}></Post>)}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return { posts: state.posts };
};

export default connect(mapStateToProps)(Overview);
