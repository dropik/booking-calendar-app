import React, { useLayoutEffect, useState } from "react";
import { hot } from "react-hot-loader";
import Table from "./Table";
import Header from "./Header";
import "./App.css";
import { remToPx } from "./utils";

function App(props) {
  const [width, height] = useWindowSize();
  var roomCellWidth = remToPx(6);
  var containerWidth = remToPx(4);
  var columns = Math.ceil((width - roomCellWidth) / containerWidth);

  return(
    <div className="app">
      <Header columns={columns}/>
      <Table columns={columns} />
    </div>
  );
}

function useWindowSize() {
  const [size, setSize] = useState([0, 0]);
  useLayoutEffect(() => {
    function updateSize() {
      setSize([document.documentElement.clientWidth, document.documentElement.clientHeight]);
    }
    window.addEventListener('resize', updateSize);
    updateSize();
    return () => window.removeEventListener('resize', updateSize);
  }, []);
  return size;
}

export default hot(module)(App);
