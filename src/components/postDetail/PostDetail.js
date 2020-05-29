import React, { Component } from "react";
import { API } from "../../API";
import moment from "moment";
import "moment/locale/nl-be";
import { Link } from "react-router-dom";
import Comment from "./Comment";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsUp } from "@fortawesome/free-solid-svg-icons";
import { connect } from "react-redux";
import { like, unlike } from "../../redux/actions/postsActions";

import "./PostDetail.scss";

moment.locale("nl-be");

class PostDetail extends Component {
  state = {};
  componentDidMount() {
    API.get(`/api/posts/${this.props.match.params.postId}`).then((res) => {
      this.setState({ post: res.data });
    });
  }

  likeHandler = () => {
    const { user } = this.props;
    const { post } = this.state;
    let arrayPosition = undefined;

    // Kijken of er een like is, en op welke plaats hij in de likes-array zit
    for (let i = 0; i < post.likes.length; i++) {
      if (post.likes[i].user.id === user.id) {
        arrayPosition = i;
      }
    }
    // Als er nog geen like is maak dan 1 aan
    if (arrayPosition === undefined) {
      // user.user_id = user.id;
      post.likes.push({ user });
      this.props.like(post);
    } else {
      // indien wel al een like, verwijder hem uit de array
      post.likes.splice(arrayPosition, 1);
      this.props.unlike(post);
    }
    this.setState({ post });
  };

  render() {
    const { post } = this.state;
    const { user } = this.props;
    return (
      <div className="container-xl ">
        <div className="row justify-content-center">
          <div className="col-md-8 mt-3">
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
                <div className="card-body">
                  <h5 className="card-title">{post && post.title}</h5>
                  <p
                    className="card-text"
                    dangerouslySetInnerHTML={{ __html: post && post.body }}
                  ></p>
                </div>
                <div className="container">
                  <div className="row justify-content-end">
                    {/* Like Button START */}
                    {post && user ? (
                      <div className="col-sm-2">
                        <button
                          onClick={this.likeHandler}
                          className="btn-block nes-btn"
                        >
                          <FontAwesomeIcon
                            style={{
                              marginBottom: "3px",
                              // color: "white",
                              // border: "1px solid black",
                              // fontSize: "3em",
                            }}
                            icon={faThumbsUp}
                          ></FontAwesomeIcon>{" "}
                          {post && post.likes.length}
                        </button>
                      </div>
                    ) : (
                      ""
                    )}
                    {/* Like Button END */}
                    {/* Comment Button START */}
                    {post && user ? (
                      <div className="col-sm-2">
                        <button className="btn-block nes-btn">{"+"}</button>
                      </div>
                    ) : (
                      ""
                    )}
                    {/* Comment Button END */}
                    {/* Back Button START */}
                    <div className="col-sm-3">
                      <Link to="/">
                        <button className="btn-block nes-btn is-primary">
                          {"<--"}
                        </button>
                      </Link>
                    </div>
                    {/* Back Button END */}
                  </div>
                </div>
                <div className="card-footer text-muted">
                  {post && moment.utc(post.created_at).local().format("LLL")}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="row justify-content-center comment">
          <div className="col-md-8">
            <div className="showcase">
              <div className="nes-container with-title">
                <h2 className="title">Comments</h2>
                {post &&
                  post.comments.map((comment) => (
                    <Comment key={comment.id} comment={comment}></Comment>
                  ))}
              </div>
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
  return {
    like: (post) => dispatch(like(post)),
    unlike: (post) => dispatch(unlike(post)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PostDetail);
