import React, { Component } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { connect } from "react-redux";
import { logout } from "../redux/actions/authActions";

class Navbar extends Component {
  render() {
    return (
      <nav className="navbar navbar-dark bg-dark">
        <div className="container-fluid">
          <div className="navbar-header">
            <Link to="/" className="navbar-brand">
              Tim's Forum
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

const mapStateToProps = state => {
  return { user: state.auth };
};

const mapDispatchToProps = dispatch => {
  return {
    logout: () => {
      dispatch(logout());
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
