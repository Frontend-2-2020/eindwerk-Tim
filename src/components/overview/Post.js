import React, { Component } from "react";
import { ellipsify } from "../../helpers/helpers";
import moment from "moment";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock } from "@fortawesome/free-solid-svg-icons";
import { faComment } from "@fortawesome/free-solid-svg-icons";
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
        <div className="row postHeader">
          <div className="col-md-8 noRightBorder">
            <Link to={`/user/${post.user_id}`}>
              <span className="userLink">{post.user.email}</span>
            </Link>
          </div>
          <div className="col-md-4 col-xl-4 noRightBorder"></div>
        </div>

        <Link to={`/post/${post.id}`}>
          <div className="row postDetail">
            {/* Begin 1ste kolom */}
            <div className="col-md-8">
              <div className="post-title">{post.title}</div>
              <div
                className="post-message"
                dangerouslySetInnerHTML={{ __html: ellipsify(post.body) }}
              ></div>
            </div>
            {/* Einde 1ste kolom */}
            {/* Begin 2de kolom */}
            <div className="col-md-4 col-xl-4 noRightBorder">
              <div className="container-fluid rightBorder">
                <div className="row">
                  <div className="col-xl-6 noRightBorder">
                    <div className="post-commentscount">
                      Comments:
                      {post.comments_count === undefined
                        ? "0"
                        : post.comments_count}
                    </div>
                    <div className="post-time">
                      Posted {moment.utc(post.created_at).fromNow()}
                    </div>
                  </div>
                  <div className="col-xl-6 noRightBorder">
                    {post && user && post.user_id === user.id ? (
                      <div className="button">
                        <div className="button1">
                          <button
                            className="btn btn-block nes-btn"
                            onClick={(e) =>
                              this.props.changePostHandler(e, post)
                            }
                          >
                            edit
                          </button>
                        </div>
                        <div className="button2">
                          <button
                            className="btn btn-block nes-btn is-error"
                            onClick={(e) => this.props.deletePost(e, post.id)}
                          >
                            delete
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div></div>
                    )}
                  </div>
                </div>
              </div>
            </div>
            {/* Einde 2de kolom */}
          </div>
        </Link>
        <div className="d-flex flex-row align-items-center postBorder ">
          <FontAwesomeIcon
            style={{
              // color: "white",
              // border: "1px solid black",
              fontSize: "3em",
            }}
            icon={faComment}
            mask={["far", "circle"]}
          ></FontAwesomeIcon>
          <span>
            {post.comments_count === undefined ? "0" : post.comments_count}
          </span>
          <FontAwesomeIcon
            style={{
              // color: "white",
              // border: "1px solid black",
              fontSize: "2em",
            }}
            icon={faClock}
            mask={["far", "circle"]}
          ></FontAwesomeIcon>
          {/* {post.created_at} */}
          <span>{moment.utc(post.created_at).fromNow()}</span>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return { user: state.auth.user };
};

const mapDispatchToProps = (dispatch) => {
  return { deletePost: (e, postId) => dispatch(deletePost(e, postId)) };
};

export default connect(mapStateToProps, mapDispatchToProps)(Post);
