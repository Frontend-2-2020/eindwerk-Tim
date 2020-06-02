import React, { Component } from "react";
import { API } from "../../API";

import "./User.scss";

export default class User extends Component {
  state = { user: { blog_posts: [], comments: [] } };
  componentDidMount() {
    API.get(`/api/users/${this.props.match.params.userId}`).then((res) => {
      this.setState({ user: res.data });
    });
  }
  render() {
    const { user } = this.state;
    return (
      <div className="userInfo">
        <img
          className="card-img-top img-fluid avatar"
          src={user.avatar}
          alt="Card image cap"
        />
        <div className="card-body">
          <h5 className="card-title">
            <p>
              {user.first_name} {user.last_name} -{" "}
              <a href={`mailto:${user.email}`}>{user.email}</a>
            </p>
          </h5>
          <p>Last Login: {user.last_login_at}</p>
        </div>
        <div className="posts">
          <div className="listTitle pl-3">Latest posts</div>
          <div className="pl-3">-------------</div>
          <ul class="pl-3">
            {user.blog_posts.reverse().map((post) => (
              <li class="">
                <span>{post.created_at} - </span>
                <span className="title">{post.title} - </span>
                {/* <span
                className="body"
                dangerouslySetInnerHTML={{ __html: post.body }}
              ></span> */}
                <span>{post.body}</span>
              </li>
            ))}
          </ul>
        </div>{" "}
        <div className="comments">
          <div className="listTitle pl-3">Latest comments</div>
          <div className="pl-3">---------------</div>
          <ul class="pl-3">
            {user.comments.reverse().map((comment) => (
              <li class="">
                <span>{comment.created_at} - </span>
                <span>{comment.body}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  }
}
