import React, { Component } from "react";
import { ellipsify } from "../../helpers/helpers";
import moment from "moment";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock } from "@fortawesome/free-solid-svg-icons";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { deletePost } from "../../redux/actions/postsActions";
import "./Post.scss";

class Post extends Component {
  render() {
    const { post, user } = this.props;
    // const difftimestamp = moment() - moment(post.created_at);
    // console.log(moment(post.created_at).fromNow());
    // console.log(moment.duration(difftimestamp));
    return (
      <div className="post-terminal">
        <Link to={`/post/${post.id}`}>
          <div className="row">
            <div className="col userinfo">
              <Link to={`/user/${post.user_id}`}>
                <span className="userLink">{post.user.email}</span>
              </Link>
            </div>
            <div className="col status">{post.title}</div>
            <div
              className="col text"
              dangerouslySetInnerHTML={{ __html: ellipsify(post.body) }}
            ></div>
          </div>
        </Link>
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
