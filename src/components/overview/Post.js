import React, { Component } from "react";
import { ellipsify, timeDiff } from "../../helpers/helpers";
import moment from "moment";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock } from "@fortawesome/free-solid-svg-icons";

class Post extends Component {
  render() {
    const { post } = this.props;
    const difftimestamp = moment() - moment(post.created_at);
    console.log(moment.duration(difftimestamp));
    return (
      <div className="post container">
        <div className="row">
          <div className="col col-left col-1">
            <img className="avatar" src={post.user.avatar} alt="" />
          </div>
          <div className="col-center col-9">
            <h2>{post.title}</h2>
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
              {timeDiff(difftimestamp)}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Post;
