import React, { Component } from "react";

export default class Comment extends Component {
  render() {
    const { comment } = this.props;
    return (
      <div class="row">
        <div class="col-sm-6">
          <div class="card">
            <div class="card-body container">
              <div
                className="row justify-content-md-center"
                // style={{ maxWidth: 100 }}
              >
                <img
                  src={comment.user.avatar}
                  alt="..."
                  class="img-fluid"
                ></img>
              </div>
              <p class="card-text">{comment.body}</p>
              <a href="#" class="btn btn-primary">
                Go somewhere
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
