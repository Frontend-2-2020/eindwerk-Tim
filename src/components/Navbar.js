import React, { Component } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";

export default class Navbar extends Component {
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
              <Link to="/login" className="nav-link">
                <FontAwesomeIcon icon={faUser}></FontAwesomeIcon> Login
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    );
  }
}
