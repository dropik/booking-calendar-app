import React from "react";
import { hot } from "react-hot-loader";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";

import { remToPx } from "../utils";
import { fetchLeft, fetchRight, scroll } from "../redux/mainSlice";
import globals from "../globals";

import Table from "./Table";

import "./TableContainer.css";

function TableContainer({ containerRef }) {
  const dispatch = useDispatch();

  function onScroll(event) {
    dispatch(scroll({ scrollLeft: event.target.scrollLeft }));

    let scrollLeftMax = event.target.scrollWidth - event.target.clientWidth;
    let cellWidth = remToPx(4) + 1;
    let scrollLimit = cellWidth * globals.TABLE_FETCH_BREAKPOINT;
    if (event.target.scrollLeft < scrollLimit) {
      dispatch(fetchLeft({ tiles: [] }));
      var preloadedWidth = cellWidth * globals.TABLE_PRELOAD_AMOUNT;
      event.target.scrollLeft = preloadedWidth + scrollLimit + 1;
    } else if (
      event.target.scrollLeft > scrollLeftMax - scrollLimit
    ) {
      dispatch(fetchRight({ tiles: [] }));
    }
  }

  return (
    <div
      ref={containerRef}
      className="table-container"
      onScroll={onScroll}
    >
      <Table />
    </div>
  );
}

TableContainer.propTypes = {
  containerRef: PropTypes.object.isRequired
};

export default hot(module)(TableContainer);
