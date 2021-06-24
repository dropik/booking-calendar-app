import React, { useLayoutEffect, useState } from "react";
import { hot } from "react-hot-loader";
import Table from "./Table";
import Header from "./Header";
import "./App.css";

function App(props) {
  const [width, height] = useWindowSize();
  var fontSize = parseFloat(getComputedStyle(document.documentElement).fontSize);
  var roomCellWidth = 6 * fontSize;
  var containerWidth = 4 * fontSize;
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
