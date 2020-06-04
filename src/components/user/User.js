import React, { Component } from "react";
import { API } from "../../API";
import { Link } from "react-router-dom";

import "./User.scss";

export default class User extends Component {
  state = { user: { blog_posts: [], comments: [] } };
  componentDidMount() {
    API.get(`/api/users/${this.props.match.params.userId}`).then(
      (res) => {
        this.setState({ user: res.data });
      },
      (error) => {
        console.log(error);
      }
    );
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
          <ul className="pl-3">
            {user.blog_posts.reverse().map((post) => (
              <li key={post.id} className="">
                <span>{post.created_at} - </span>
                <span>
                  <Link to={`/post/${post.id}`}>{post.id}</Link> -{" "}
                </span>
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
          <ul className="pl-3">
            {user.comments.reverse().map((comment) => (
              <li key={comment.id} className="">
                <span>{comment.created_at}</span> -{" "}
                <span>
                  <Link to={`/post/${comment.blog_post_id}`}>
                    {comment.blog_post_id}
                  </Link>{" "}
                  -{" "}
                </span>
                <span>{comment.body}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  }
}
