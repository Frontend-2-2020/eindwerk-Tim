import React, { Component } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { connect } from "react-redux";
import { logout } from "../redux/actions/authActions";

class Navbar extends Component {
  render() {
    var inputASCII = [
      // "<pre><code>",
      "",
      "__/\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\___________________________________________________/\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\_______________________________________________________________        ",
      " _\\///////\\\\\\/////___________________________________________________\\/\\\\\\///////////________________________________________________________________       ",
      "  _______\\/\\\\\\________/\\\\\\____________________________________________\\/\\\\\\___________________________________________________________________________      ",
      "   _______\\/\\\\\\_______\\///_____/\\\\\\\\\\__/\\\\\\\\\\____/\\\\\\\\\\\\\\\\\\\\___________\\/\\\\\\\\\\\\\\\\\\\\\\_________/\\\\\\\\\\_____/\\\\/\\\\\\\\\\\\\\___/\\\\\\____/\\\\\\____/\\\\\\\\\\__/\\\\\\\\\\___     ",
      "    _______\\/\\\\\\________/\\\\\\__/\\\\\\///\\\\\\\\\\///\\\\\\_\\/\\\\\\//////____________\\/\\\\\\///////________/\\\\\\///\\\\\\__\\/\\\\\\/////\\\\\\_\\/\\\\\\___\\/\\\\\\__/\\\\\\///\\\\\\\\\\///\\\\\\_    ",
      "     _______\\/\\\\\\_______\\/\\\\\\_\\/\\\\\\_\\//\\\\\\__\\/\\\\\\_\\/\\\\\\\\\\\\\\\\\\\\___________\\/\\\\\\______________/\\\\\\__\\//\\\\\\_\\/\\\\\\___\\///__\\/\\\\\\___\\/\\\\\\_\\/\\\\\\_\\//\\\\\\__\\/\\\\\\_   ",
      "      _______\\/\\\\\\_______\\/\\\\\\_\\/\\\\\\__\\/\\\\\\__\\/\\\\\\_\\////////\\\\\\___________\\/\\\\\\_____________\\//\\\\\\__/\\\\\\__\\/\\\\\\_________\\/\\\\\\___\\/\\\\\\_\\/\\\\\\__\\/\\\\\\__\\/\\\\\\_  ",
      "       _______\\/\\\\\\_______\\/\\\\\\_\\/\\\\\\__\\/\\\\\\__\\/\\\\\\__/\\\\\\\\\\\\\\\\\\\\___________\\/\\\\\\______________\\///\\\\\\\\\\/___\\/\\\\\\_________\\//\\\\\\\\\\\\\\\\\\__\\/\\\\\\__\\/\\\\\\__\\/\\\\\\_ ",
      "        _______\\///________\\///__\\///___\\///___\\///__\\//////////____________\\///_________________\\/////_____\\///___________\\/////////___\\///___\\///___\\///__",
      "",
      // "</code></pre>",
    ].join("\n");
    var wrappedASCII = { __html: inputASCII };
    return (
      <nav className="navbar navbar-dark bg-dark">
        <div className="container-fluid">
          <div className="navbar-header">
            <Link to="/" className="navbar-brand">
              <div
                class="ascii-art"
                dangerouslySetInnerHTML={wrappedASCII}
              ></div>
            </Link>
          </div>
          <ul className="nav navbar-nav navbar-right list-group list-group-horizontal">
            {/* <li>
              <Link to="/register">
                <span className="glyphicon glyphicon-user"></span> Sign Up
              </Link>
            </li> */}
            <li>
              {this.props.user.user !== undefined ? (
                <span className="nav-link">
                  <FontAwesomeIcon
                    icon={faUser}
                    onClick={this.props.logout}
                  ></FontAwesomeIcon>
                </span>
              ) : (
                <Link to="/login" className="nav-link">
                  <span>
                    <FontAwesomeIcon icon={faUser}></FontAwesomeIcon> Login
                  </span>
                </Link>
              )}
            </li>
          </ul>
        </div>
      </nav>
    );
  }
}

const mapStateToProps = (state) => {
  return { user: state.auth };
};

const mapDispatchToProps = (dispatch) => {
  return {
    logout: () => {
      dispatch(logout());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
