import React, { Component } from "react";

export default class Pagination extends Component {
  render() {
    const { pageCount, currentPage } = this.props;
    let linkItems = [];
    for (let i = 0; i < pageCount; i++) {
      linkItems.push(
        <li className="page-item" key={i}>
          <button
            className="page-link"
            onClick={() => this.props.newPageHandler(i + 1)}
          >
            {i + 1}
          </button>
        </li>
      );
    }
    return (
      <nav aria-label="Page navigation example">
        <ul className="pagination">
          {currentPage === 1 ? (
            <li className="page-item disabled">
              <button
                className="page-link"
                onClick={() => this.props.newPageHandler(currentPage - 1)}
              >
                Previous
              </button>
            </li>
          ) : (
            <li
              className="page-item"
              onClick={() => this.props.newPageHandler(currentPage - 1)}
            >
              <button className="page-link">Previous</button>
            </li>
          )}
          {linkItems}
          {currentPage === pageCount ? (
            <li className="page-item disabled">
              <button
                className="page-link"
                onClick={() => this.props.newPageHandler(currentPage + 1)}
              >
                Next
              </button>
            </li>
          ) : (
            <li className="page-item">
              <button
                className="page-link"
                onClick={() => this.props.newPageHandler(currentPage + 1)}
              >
                Next
              </button>
            </li>
          )}
        </ul>
      </nav>
    );
  }
}
