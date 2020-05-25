import React, { Component } from "react";
import moment from "moment";
import "moment/locale/nl-be";
import "./Comment.scss";
moment.locale("nl-be");

export default class Comment extends Component {
  render() {
    const { comment } = this.props;
    return (
      // <div class="row justify-content-center">
      //   <div class="col-md-8">
      <div className="showcase">
        {/* <div class="nes-container with-title"> */}
        <div class="commentContainer">
          {/* <h2 className="title">
            Author: {comment.user.first_name} {comment.user.last_name}
          </h2> */}
          <div class="container-fluid">
            <div
              className="row card-body"
              // style={{ maxWidth: 100 }}
            >
              <div className="avatar col-2-sm">
                <img
                  src={comment.user.avatar}
                  alt="..."
                  class="img-fluid"
                ></img>
              </div>
              <div className="body col-10-sm">
                <p
                  class="card-text"
                  dangerouslySetInnerHTML={{ __html: comment.body }}
                ></p>
              </div>
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
