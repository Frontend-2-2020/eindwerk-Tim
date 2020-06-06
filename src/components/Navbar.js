import React, { Component } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { connect } from "react-redux";
import { logout } from "../redux/actions/authActions";
import { logo } from "../assets/logo";

import "./Navbar.scss";

class Navbar extends Component {
  render() {
    const { user } = this.props.user;
    return (
      <nav className="navbar navbar-dark bg-dark">
        <div className="container-fluid">
          <div className="navbar-header">
            <Link to="/" className="navbar-brand">
              <div className="ascii-art" dangerouslySetInnerHTML={logo}></div>
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
                <div
                  className="logout d-flex flex-row align-items-center"
                  onClick={this.props.logout}
                >
                  <span className="nav-link">
                    <img
                      src={user.avatar}
                      className="card-img-top mx-auto d-block avatar "
                      alt="..."
                    />
                    {/* <FontAwesomeIcon
                    icon={faUser}
                  ></FontAwesomeIcon>{" "} */}
                  </span>
                  <span className="nav-link">Logout</span>
                </div>
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
