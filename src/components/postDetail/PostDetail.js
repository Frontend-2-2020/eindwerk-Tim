import React, { Component } from "react";
import { API } from "../../API";
import moment from "moment";
import "moment/locale/nl-be";
import { Link } from "react-router-dom";
import Comment from "./Comment";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsUp, faThList } from "@fortawesome/free-solid-svg-icons";
import { connect } from "react-redux";
import { like, unlike, newPost } from "../../redux/actions/postsActions";

import "./PostDetail.scss";
import NewComment from "./NewComment";
import { newComment } from "../../redux/actions/commentsActions";

moment.locale("nl-be");

class PostDetail extends Component {
  state = { showAddComment: false };
  componentDidMount() {
    const { user } = this.props;
    API.get(`/api/posts/${this.props.match.params.postId}`).then((res) => {
      const post = res.data;
      let checkLiked = false;
      post.likes.forEach((like) => {
        if (user !== undefined && like.user.id === user.id) {
          checkLiked = true;
          // this.setState({ checkLiked });
        }
      });
      this.setState({ post: res.data, checkLiked });
    });
  }

  addCommentHandler = (values) => {
    let newPost = { ...this.state.post };
    newPost.comments = [values, ...newPost.comments];
    this.setState({ post: newPost });
  };

  editCommentHandler = (e, selectedComment) => {
    console.log(selectedComment);
    this.setState({ selectedComment });
    this.setState({ showAddComment: true });
    let newComments = [...this.state.post.comments];
    let editPost = { ...this.state.post };
    let editComment = this.state.post.comments.filter((comment) => {});
    newComments.map((comment) =>
      comment.id === selectedComment.id ? selectedComment : comment
    );
  };
  deleteCommentHandler = (selectedComment) => {
    // console.log(selectedComment);
    let newPost = { ...this.state.post };
    let newComments = this.state.post.comments.filter(
      (comment) => comment.id !== selectedComment.id
    );
    newPost.comments = newComments;
    this.setState({ post: newPost });
  };
  likeHandler = () => {
    const { user } = this.props;
    const { post } = this.state;
    let arrayPosition = undefined;
    let checkLiked = false;
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
      checkLiked = true;
      this.props.like(post);
    } else {
      // indien wel al een like, verwijder hem uit de array
      post.likes.splice(arrayPosition, 1);
      checkLiked = false;
      this.props.unlike(post);
    }
    this.setState({ post, checkLiked });
  };

  render() {
    const { post, checkLiked } = this.state;
    const { user } = this.props;
    return (
      <div className="container-xl ">
        <div className="row justify-content-center">
          <div className="col-md-8 mt-3">
            <div className="showcase">
              {post ? (
                <div className="nes-container with-title">
                  <h2 className=" title">
                    PID:{this.props.match.params.postId} / Created:
                    {moment.utc(post.created_at).fromNow()}
                  </h2>
                  <Link to={`/user/${post.user_id}`}>
                    <div className="p-3">
                      <img
                        src={post.user.avatar}
                        className="card-img-top mx-auto d-block avatar "
                        alt="..."
                      />
                      <div className="author-name text-center p-3">
                        {post.user.first_name} {post.user.last_name}
                      </div>
                    </div>
                  </Link>
                  <div className="card-body">
                    <h5 className="card-title">{post.title}</h5>
                    <p
                      className="card-text"
                      dangerouslySetInnerHTML={{ __html: post.body }}
                    ></p>
                  </div>
                  <div className="container">
                    <div className="row justify-content-end">
                      {/* Like Button START */}
                      {user ? (
                        <div className="col-sm-3 col-xl-2">
                          <button
                            onClick={this.likeHandler}
                            className={
                              checkLiked
                                ? "btn-block nes-btn is-warning"
                                : "btn-block nes-btn"
                            }
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
                            {post.likes.length}
                          </button>
                        </div>
                      ) : (
                        ""
                      )}
                      {/* Like Button END */}
                      {/* Comment Button START */}
                      {post && user ? (
                        <div className="col-sm-3">
                          <button
                            onClick={() =>
                              this.setState({
                                showAddComment: !this.state.showAddComment,
                                selectedComment: undefined,
                              })
                            }
                            className="btn-block nes-btn"
                          >
                            {"+"}
                          </button>
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
              ) : (
                ""
              )}
            </div>
          </div>
        </div>
        <div className="row justify-content-center comment">
          <div className="col-md-8">
            {this.state.showAddComment ? (
              <div className="showcase">
                <div className="nes-container with-title">
                  <h2 className="title">new comment</h2>
                  <NewComment
                    selectedComment={this.state.selectedComment}
                    postId={post.id}
                    hideHandler={() => this.setState({ showAddComment: false })}
                    addHandler={(values) => this.addCommentHandler(values)}
                    buttonText="OK"
                  ></NewComment>
                </div>
              </div>
            ) : (
              ""
            )}
            <div className="showcase">
              <div className="nes-container with-title">
                <h2 className="title">Comments</h2>
                {post &&
                  post.comments.map((comment) => (
                    <Comment
                      key={comment.id}
                      comment={comment}
                      editHandler={(e, comment) =>
                        this.editCommentHandler(e, comment)
                      }
                      deleteHandler={(comment) =>
                        this.deleteCommentHandler(comment)
                      }
                    ></Comment>
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
