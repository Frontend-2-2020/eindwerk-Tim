import React, { Component } from "react";
import { connect } from "react-redux";
import Post from "./Post";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";

import "./Overview.scss";

import { getPosts } from "../../redux/actions/postsActions";
import NewPost from "./NewPost";
import Pagination from "./Pagination";
import Spinner from "../Spinner";

class Overview extends Component {
  state = { showAddPost: false, pagenumber: 1 };
  // constructor(props) {
  //   super(props);
  //   this.props.posts = [];
  // }

  componentDidUpdate(prevprops) {
    if (prevprops.user !== this.props.user) {
      this.setState({ showAddPost: false });
    }
  }

  changePostHandler = (e, post) => {
    e.preventDefault();
    // e.stopPropagation();
    console.log(post);
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
    const postsheader = this.props.posts;
    const posts = postsheader.data;
    return (
      <div className="overviewContainer container-fluid">
        <div className="container-fluid">
          <div className="postsNav">
            {/* Navigatie + toevoegen knop BEGIN */}
            <div className="row">
              <div className="col">
                <Pagination
                  currentPage={this.props.posts.current_page}
                  pageCount={this.props.posts.last_page}
                  newPageHandler={(pageNumber) =>
                    this.props.getPosts(pageNumber)
                  }
                ></Pagination>
              </div>
              <div className="searchbar col"></div>
              <div className="addIcon col">
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
          </div>
          {/* Navigatie + toevoegen knop EINDE */}
          {/* Newpost Form Begin */}
          <div className="addPost">
            {this.state.showAddPost ? (
              <NewPost
                selectedPost={this.state.selectedPost}
                hideHandler={() => this.setState({ showAddPost: false })}
                buttonText="Bevestigen"
              ></NewPost>
            ) : (
              ""
            )}
          </div>
          {/* Newpost Form Einde */}
          {/* Posts Begin */}
          {posts ? (
            <div className="container-fluid postsContainer">
              <div className="row postsHeader">
                <div className="col-md-4 col-xl-3 headerItem">User:</div>
                <div className="col-md-4 col-xl-5 headerItem">Title:</div>
                <div className="col-md-4 col-xl-4 headerItem noRightBorder">
                  Message:
                </div>
              </div>
              {posts.map((post) => (
                <Post
                  key={post.id}
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
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return { posts: state.posts, user: state.auth };
};
const mapDispatchToProps = (dispatch) => {
  return { getPosts: (pagenumber) => dispatch(getPosts(pagenumber)) };
};

export default connect(mapStateToProps, mapDispatchToProps)(Overview);
