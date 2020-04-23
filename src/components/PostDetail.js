import React, { Component } from "react";
import { API } from "../API";
import moment from "moment";
import { Link } from "react-router-dom";
import Comment from "./postDetail/Comment";

export default class PostDetail extends Component {
  state = {};
  componentDidMount() {
    API.get(`/api/posts/${this.props.match.params.postId}`).then((res) => {
      this.setState({ post: res.data });
    });
  }
  render() {
    const { post } = this.state;
    return (
      <div class="card text-center">
        <div class="card-header">Post ID: {this.props.match.params.postId}</div>
        <div class="card-body">
          <h5 class="card-title">{post && post.title}</h5>
          <p
            class="card-text"
            dangerouslySetInnerHTML={{ __html: post && post.body }}
          ></p>
          <Link to="/" className="btn btn-primary">
            Terug naar overzicht
          </Link>
        </div>
        <div class="card-footer text-muted">
          {post && moment.utc(post.created_at).fromNow()}
        </div>
        {post &&
          post.comments.map((comment) => <Comment comment={comment}></Comment>)}
      </div>
    );
  }
}
