import React, { Component } from "react";
import { ellipsify } from "../../helpers/helpers";
import moment from "moment";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock } from "@fortawesome/free-solid-svg-icons";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { deletePost } from "../../redux/actions/postsActions";

class Post extends Component {
  render() {
    const { post, user } = this.props;
    // const difftimestamp = moment() - moment(post.created_at);
    // console.log(moment(post.created_at).fromNow());
    // console.log(moment.duration(difftimestamp));
    return (
      <div className="post card">
        <div className="row card-header">
          <div className="col">
            <div className="float-left">{post.user.email}</div>
          </div>
          <div className="col">
            {post && user && post.user_id === user.id ? (
              <div className="float-right">
                <button className="btn btn-light"> edit</button>
                <button
                  className="btn btn-danger"
                  onClick={() => this.props.deletePost(post.id)}
                >
                  delete
                </button>
              </div>
            ) : (
              ""
            )}
          </div>
        </div>
        <div className="row card-body">
          <div className="col col-left col-1">
            <div className="d-flex flex-column">
              <img className="avatar" src={post.user.avatar} alt="" />
            </div>
          </div>
          <div className="col-center col-9">
            <Link to={`/post/${post.id}`}>
              <h2 className="postTitle">{post.title}</h2>
            </Link>
            <p className="postText">{ellipsify(post.body)}</p>
          </div>
          <div className="col col-right col-2">
            <div className="postCount">
              {post.comments_count}
              <div className="mark"></div>
            </div>
            <div className="postDate">
              <FontAwesomeIcon
                icon={faClock}
                mask={["far", "circle"]}
              ></FontAwesomeIcon>{" "}
              {moment.utc(post.created_at).fromNow()}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return { user: state.auth.user };
};

const mapDispatchToProps = (dispatch) => {
  return { deletePost: (postId) => dispatch(deletePost(postId)) };
};

export default connect(mapStateToProps, mapDispatchToProps)(Post);
