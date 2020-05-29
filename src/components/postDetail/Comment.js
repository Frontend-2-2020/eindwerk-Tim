import React, { Component } from "react";
import moment from "moment";
import "moment/locale/nl-be";
import "./Comment.scss";
import { connect } from "react-redux";
import { deleteComment } from "../../redux/actions/commentsActions";
moment.locale("nl-be");

class Comment extends Component {
  deleteHandler = (e, comment) => {
    this.props.deleteComment(e, comment.id);
    this.props.deleteHandler(comment);
  };
  render() {
    const { comment, user } = this.props;
    return (
      // <div className="row justify-content-center">
      //   <div className="col-md-8">
      <div className="showcase">
        {/* <div className="nes-container with-title"> */}
        <div className="commentContainer">
          {/* <h2 className="title">
            Author: {comment.user.first_name} {comment.user.last_name}
          </h2> */}
          <div className="container-fluid">
            <div
              className="row card-body"
              // style={{ maxWidth: 100 }}
            >
              <div className="avatar col-2">
                <p>{comment.user.first_name}</p>
                <img
                  src={comment.user.avatar}
                  alt="..."
                  className="img-fluid"
                ></img>
              </div>
              <div className="body col-9">
                <p
                  className="card-text"
                  dangerouslySetInnerHTML={{ __html: comment.body }}
                ></p>
              </div>
            </div>
            <div className="container">
              {comment && user && comment.user_id === user.id ? (
                <div className="row justify-content-end">
                  <div className="col  button1">
                    <button
                      className="btn btn-block nes-btn"
                      onClick={(e) => this.props.editHandler(e, comment)}
                    >
                      {"!="}
                    </button>
                  </div>
                  <div className="col button2">
                    <button
                      className="btn btn-block nes-btn is-error"
                      // onClick={(e) => this.props.deleteComment(e, comment.id)}
                      onClick={(e) => this.deleteHandler(e, comment)}
                    >
                      {"X"}
                    </button>
                  </div>
                </div>
              ) : (
                <div></div>
              )}
            </div>
            <div className="card-footer">
              {/* {comment && moment.utc(comment.created_at).local().toDate().format("LLL")} */}
              {comment && moment.utc(comment.created_at).local().format("LLL")}
            </div>
          </div>
        </div>
      </div>
      //   </div>
      // </div>
    );
  }
}

const mapStateToProps = (state) => {
  return { user: state.auth.user };
};

const mapDispatchToProps = (dispatch) => {
  return {
    deleteComment: (e, commentId) => dispatch(deleteComment(e, commentId)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Comment);
