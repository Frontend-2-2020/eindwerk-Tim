import React, { Component } from "react";
import { API } from "../../API";
import moment from "moment";
import "moment/locale/nl-be";
import { Link } from "react-router-dom";
import Comment from "./Comment";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsUp } from "@fortawesome/free-solid-svg-icons";
import "./PostDetail.scss";
import Post from "../overview/Post";

moment.locale("nl-be");

export default class PostDetail extends Component {
  state = {};
  componentDidMount() {
    API.get(`/api/posts/${this.props.match.params.postId}`).then((res) => {
      this.setState({ post: res.data });
    });
  }
  render() {
    const { post } = this.state;
    return (
      <div className="container-xl ">
        <div className="row justify-content-center">
          <div class="col-md-8 mt-3">
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
                <div class="card-body">
                  <h5 class="card-title">{post && post.title}</h5>
                  <p
                    class="card-text"
                    dangerouslySetInnerHTML={{ __html: post && post.body }}
                  ></p>
                  <p>
                    Likes:{" "}
                    {/* {post && post.likes.length === undefined
                      ? "0"
                      : post.likes.length} */}
                  </p>
                  {/* <button className="btn nes-btn float-right">
                    add comment
                  </button>
                  <Link to="/">
                    <button className="btn nes-btn float-right">
                      Terug naar overzicht
                    </button>
                  </Link> */}
                </div>
                <div className="container">
                  <div className="row justify-content-end">
                    {/* Like Button START */}
                    <div className="col-sm-2">
                      <button className="btn-block nes-btn">
                        <FontAwesomeIcon
                          style={{
                            marginBottom: "3px",
                            // color: "white",
                            // border: "1px solid black",
                            // fontSize: "3em",
                          }}
                          icon={faThumbsUp}
                        ></FontAwesomeIcon>
                      </button>
                    </div>
                    {/* Like Button END */}
                    <div className="col-sm-2">
                      <button className="btn-block nes-btn">{"+"}</button>
                    </div>
                    <div className="col-sm-3">
                      <Link to="/">
                        <button className="btn-block nes-btn">{"<--"}</button>
                      </Link>
                    </div>
                  </div>
                </div>
                <div class="card-footer text-muted">
                  {post && moment.utc(post.created_at).local().format("LLL")}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="row justify-content-center comment">
          <div class="col-md-8">
            <div className="showcase">
              <div class="nes-container with-title">
                <h2 className="title">Comments</h2>
                {post &&
                  post.comments.map((comment) => (
                    <Comment comment={comment}></Comment>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
