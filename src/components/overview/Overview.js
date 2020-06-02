import React, { Component } from "react";
import { connect } from "react-redux";
import Post from "./Post";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlusCircle,
  faCommentDollar,
} from "@fortawesome/free-solid-svg-icons";
import { API } from "../../API";

import "./Overview.scss";

import { getPosts } from "../../redux/actions/postsActions";
import { getComments } from "../../redux/actions/commentsActions";
import { ellipsify, ucfirst } from "../../helpers/helpers";
import NewPost from "./NewPost";
import Pagination from "./Pagination";
import Spinner from "../Spinner";

class Overview extends Component {
  state = {
    posts: { data: [] },
    showAddPost: false,
    pagenumber: 1,
    searchString: "",
  };
  // constructor(props) {
  //   super(props);
  //   this.props.posts = [];
  // }

  componentDidMount() {
    console.log("componentdidmount");
    this.setState({ posts: this.props.posts });
    this.getComments();
  }

  componentDidUpdate(prevprops) {
    if (prevprops.posts !== this.props.posts) {
      this.setState({ posts: this.props.posts });
    }
    if (prevprops.user !== this.props.user) {
      this.setState({ showAddPost: false });
    }
  }

  filterPosts = (e) => {
    const { allPosts } = this.props.posts;
    const newPosts = { ...this.props.posts };
    const searchString = e.target.value;
    if (searchString !== "") {
      let filteredPosts = allPosts.filter(
        (post) => post.title.toLowerCase().indexOf(searchString) !== -1
      );
      newPosts.data = filteredPosts;
      newPosts.last_page = 1;
      this.setState({ posts: newPosts });
    } else {
      this.setState({ posts: this.props.posts });
    }
  };

  getComments = () => {
    // Comments ophalen en laatste 5 comments in state steken via callback functie
    const handleComments = (comments) => {
      let lastComments = [];
      for (let i = 0; i < 5; i++) {
        const comment = comments[comments.length - (i + 1)];
        lastComments = [...lastComments, comment];
      }
      this.setState({ lastComments });
    };
    const comments = this.props.getComments(handleComments);
  };

  changePostHandler = (e, post) => {
    e.preventDefault();
    // e.stopPropagation();
    // console.log(post);
    this.setState({ selectedPost: post });
    this.setState({ showAddPost: true });
    // document.documentElement.scrollTop = 0;
    window.scroll({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  };

  render() {
    const postsHeader = this.state.posts;
    const posts = postsHeader.data;
    const lastComments = this.state.lastComments;
    return (
      <div className="overviewContainer container-fluid">
        <div className="container-fluid">
          <div className="row">
            <div className="col-xl-8">
              {" "}
              {/* Begin nav + Posts */}
              <div className="postsNav">
                {/* Navigatie + toevoegen knop BEGIN */}
                <div className="row">
                  <div className="col-xl-11">
                    <Pagination
                      currentPage={postsHeader.current_page}
                      pageCount={postsHeader.last_page}
                      newPageHandler={(pageNumber) =>
                        this.props.getPosts(pageNumber, undefined, undefined)
                      }
                    ></Pagination>
                  </div>
                  <div className="addIcon col-xl-1">
                    {this.props.user.user !== undefined ? (
                      <div
                        className="addPost"
                        alt="post toevoegen"
                        onClick={() =>
                          this.setState({
                            showAddPost: !this.state.showAddPost,
                            selectedPost: undefined,
                          })
                        }
                      >
                        <FontAwesomeIcon
                          icon={faPlusCircle}
                          className="float-right"
                        ></FontAwesomeIcon>
                      </div>
                    ) : (
                      ""
                    )}
                  </div>
                </div>
                <div className="row searchbar">
                  <label htmlFor="search">Search title:</label>
                  <input
                    onChange={(e) => this.filterPosts(e)}
                    type="text"
                    className="nes-input"
                    id="search"
                  />
                </div>
              </div>
              {/* Navigatie + toevoegen knop EINDE */}
              {/* Newpost Form Begin */}
              <div className="addPost">
                {this.state.showAddPost ? (
                  <NewPost
                    selectedPost={this.state.selectedPost}
                    hideHandler={() => this.setState({ showAddPost: false })}
                    buttonText="OK"
                  ></NewPost>
                ) : (
                  ""
                )}
              </div>
              {/* Newpost Form Einde */}
              {/* Posts Begin */}
              {posts ? (
                <div className="container-fluid postsContainer">
                  {/* <div className="row postsHeader">
                <div className="col-md-4 col-xl-3 headerItem">User:</div>
                <div className="col-md-4 col-xl-5 headerItem">Title:</div>
                <div className="col-md-4 col-xl-4 headerItem noRightBorder">
                  Message:
                </div>
              </div> */}
                  {posts.map((post, index) => (
                    <Post
                      key={index}
                      post={post}
                      changePostHandler={(e, post) =>
                        this.changePostHandler(e, post)
                      }
                    ></Post>
                  ))}
                </div>
              ) : (
                <Spinner />
              )}
              {/* Posts Einde */}
              <div className="postsNav">
                <div className="row">
                  <div className="col">
                    <Pagination
                      currentPage={postsHeader.current_page}
                      pageCount={postsHeader.last_page}
                      newPageHandler={(pageNumber) =>
                        this.props.getPosts(pageNumber)
                      }
                    ></Pagination>
                  </div>
                </div>
              </div>
              {/* Einde nav + posts */}
            </div>
            <div className="col-xl-4">
              <div className="lastComments">
                <div className="container-fluid">
                  <div className="row">
                    <div className="showcase">
                      <div className="nes-container with-title">
                        <h2 className="title">Last 5 comments</h2>
                        <ul>
                          {lastComments &&
                            lastComments.map((comment) => {
                              return (
                                <li
                                  key={comment.id}
                                  dangerouslySetInnerHTML={{
                                    __html: ellipsify(comment.body),
                                  }}
                                ></li>
                              );
                            })}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return { posts: state.posts, user: state.auth };
};
const mapDispatchToProps = (dispatch) => {
  return {
    getPosts: (pagenumber) => dispatch(getPosts(pagenumber)),
    getComments: getComments,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Overview);
