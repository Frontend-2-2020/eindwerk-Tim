import React, { Component } from "react";
import "./Spinner.scss";

export default class Spinner extends Component {
  render() {
    return (
      <div className="loaderContainer container-fluid justify-content-center">
        <div className="preloader-2">
          <span className="line line-1"></span>
          <span className="line line-2"></span>
          <span className="line line-3"></span>
          <span className="line line-4"></span>
          <span className="line line-5"></span>
          <span className="line line-6"></span>
          <span className="line line-7"></span>
          <span className="line line-8"></span>
          <span className="line line-9"></span>
          <div>Loading</div>
        </div>
      </div>
    );
  }
}
