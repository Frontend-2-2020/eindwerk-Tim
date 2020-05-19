import React, { Component } from "react";
import { API } from "../../API";
import moment from "moment";
import "moment/locale/nl-be";
import { Link } from "react-router-dom";
import Comment from "./Comment";

import "./PostDetail.scss";

moment.locale("nl-be");

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
      <div className="container-xl ">
        <div className="row justify-content-center">
          <div class="col-md-8 mt-3">
            <div className="showcase">
              <div className="nes-container with-title">
                <h2 className=" title">
                  PID:{this.props.match.params.postId} / Created:
                  {post && moment.utc(post.created_at).fromNow()}
                </h2>
                <div className="p-3">
                  <img
                    src={post && post.user.avatar}
                    className="card-img-top mx-auto d-block avatar "
                    alt="..."
                  />
                  <div className="author-name text-center p-3">
                    {post && post.user.first_name} {post && post.user.last_name}
                  </div>
                </div>
                <div class="card-body">
                  <h5 class="card-title">{post && post.title}</h5>
                  <p
                    class="card-text"
                    dangerouslySetInnerHTML={{ __html: post && post.body }}
                  ></p>
                  <Link to="/" className="btn btn-primary float-right">
                    Terug naar overzicht
                  </Link>
                </div>
                <div class="card-footer text-muted">
                  {post && moment.utc(post.created_at).format("LLL")}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="comment">
          {post &&
            post.comments.map((comment) => (
              <Comment comment={comment}></Comment>
            ))}
        </div>
      </div>
    );
  }
}
