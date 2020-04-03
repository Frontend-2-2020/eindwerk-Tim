import React, { Component } from "react";
import { connect } from "react-redux";

class Overview extends Component {
  render() {
    return <div>Home</div>;
  }
}

const mapStateToProps = store => {
  return { posts: store.posts };
};

export default connect(mapStateToProps)(Overview);
