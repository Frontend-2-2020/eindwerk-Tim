import React, { Component } from "react";
import "./Spinner.css";

export default class Spinner extends Component {
  render() {
    return (
      <div className="loaderContainer">
        Loading...
        <div className="loader" id="loader"></div>
      </div>
    );
  }
}
