import React, { Component } from "react";

export default class Comment extends Component {
  render() {
    const { comment } = this.props;
    return (
      <div class="row justify-content-center">
        <div class="col-md-8">
          <div className="showcase">
            <div class="nes-container with-title">
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
                <p
                  class="card-text"
                  dangerouslySetInnerHTML={{ __html: comment.body }}
                ></p>
                <a href="#" class="btn btn-primary">
                  Go somewhere
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
